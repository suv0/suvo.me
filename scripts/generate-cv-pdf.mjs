import { readFileSync, writeFileSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, "../public/cv.pdf");
const cv = JSON.parse(readFileSync(resolve(__dirname, "../lib/cv-data.json"), "utf8"));

const pageWidth = 595.28;
const pageHeight = 841.89;
const margin = 46;
const contentWidth = pageWidth - margin * 2;

function esc(value) {
  return String(value).replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
}

function widthOf(value, size) {
  return value.length * size * 0.47;
}

function wrap(value, size, maxWidth) {
  const words = String(value).split(/\s+/);
  const lines = [];
  let line = "";

  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (line && widthOf(next, size) > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }

  if (line) lines.push(line);
  return lines;
}

class Pdf {
  pages = [];
  commands = [];
  y = pageHeight - margin;

  constructor() {
    this.addPage();
  }

  addPage() {
    if (this.commands.length) this.pages.push(this.commands.join("\n"));
    this.commands = [];
    this.y = pageHeight - margin;
  }

  ensure(space) {
    if (this.y - space < margin + 28) this.addPage();
  }

  text(value, x, y, size = 10, font = "F1", color = "0.08 0.11 0.18") {
    this.commands.push(`${color} rg BT /${font} ${size} Tf ${x.toFixed(2)} ${y.toFixed(2)} Td (${esc(value)}) Tj ET`);
  }

  line(x1, y1, x2, y2, color = "0.78 0.82 0.88") {
    this.commands.push(`${color} RG 0.7 w ${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S`);
  }

  heading(value) {
    this.ensure(32);
    this.text(value.toUpperCase(), margin, this.y, 9.5, "F2", "0.03 0.41 0.58");
    this.y -= 17;
  }

  paragraph(value, size = 9.6, lineHeight = 14, indent = 0) {
    const lines = wrap(value, size, contentWidth - indent);
    this.ensure(lines.length * lineHeight + 4);
    for (const line of lines) {
      this.text(line, margin + indent, this.y, size);
      this.y -= lineHeight;
    }
    this.y -= 3;
  }

  bullet(value) {
    const lines = wrap(value, 9.2, contentWidth - 16);
    this.ensure(lines.length * 13 + 3);
    this.text("-", margin, this.y, 9.2, "F2");
    this.text(lines[0], margin + 14, this.y, 9.2);
    this.y -= 13;
    for (const line of lines.slice(1)) {
      this.text(line, margin + 14, this.y, 9.2);
      this.y -= 13;
    }
    this.y -= 2;
  }

  finishPages() {
    if (this.commands.length) this.pages.push(this.commands.join("\n"));
  }
}

const pdf = new Pdf();

pdf.text(cv.name, margin, pdf.y, 24, "F2", "0.02 0.06 0.15");
pdf.y -= 25;
pdf.text(cv.title, margin, pdf.y, 12, "F2", "0.03 0.41 0.58");
pdf.y -= 17;
pdf.text(`${cv.location} | ${cv.email} | ${cv.website}`, margin, pdf.y, 9.2, "F1", "0.28 0.33 0.41");
pdf.y -= 13;
pdf.text(`${cv.linkedin} | ${cv.github}`, margin, pdf.y, 9.2, "F1", "0.28 0.33 0.41");
pdf.y -= 12;
pdf.line(margin, pdf.y, pageWidth - margin, pdf.y);
pdf.y -= 18;

pdf.heading("Profile");
pdf.paragraph(cv.summary, 9.6, 14);

pdf.heading("Core strengths");
for (const strength of cv.strengths) pdf.bullet(strength);
pdf.y -= 4;

pdf.heading("Experience");
for (const job of cv.experience) {
  pdf.ensure(58);
  pdf.text(job.role, margin, pdf.y, 12, "F2", "0.02 0.06 0.15");
  pdf.text(job.period, pageWidth - margin - widthOf(job.period, 9.4), pdf.y, 9.4, "F2", "0.03 0.41 0.58");
  pdf.y -= 14;
  pdf.text(`${job.company} - ${job.location}`, margin, pdf.y, 9.5, "F2", "0.28 0.33 0.41");
  pdf.y -= 14;
  for (const highlight of job.highlights) pdf.bullet(highlight);
  pdf.y -= 6;
}

pdf.heading("Selected projects");
for (const project of cv.projects) {
  pdf.ensure(42);
  pdf.text(project.name, margin, pdf.y, 10.5, "F2", "0.02 0.06 0.15");
  pdf.y -= 13;
  pdf.paragraph(project.details, 9.2, 13, 0);
}

pdf.heading("Skills");
for (const group of cv.skills) {
  pdf.ensure(24);
  pdf.text(`${group.group}: `, margin, pdf.y, 9.5, "F2", "0.02 0.06 0.15");
  pdf.text(group.items.join(", "), margin + 92, pdf.y, 9.3);
  pdf.y -= 14;
}

pdf.finishPages();

function buildPdf(pages) {
  const objects = [""];
  const reserve = () => {
    objects.push("");
    return objects.length - 1;
  };
  const add = (body) => {
    objects.push(body);
    return objects.length - 1;
  };

  const catalogId = reserve();
  const pagesId = reserve();
  const fontRegularId = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const fontBoldId = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
  const pageIds = [];

  for (const stream of pages) {
    const length = Buffer.byteLength(stream, "utf8");
    const contentId = add(`<< /Length ${length} >>\nstream\n${stream}\nendstream`);
    const pageId = add(
      `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> /Contents ${contentId} 0 R >>`,
    );
    pageIds.push(pageId);
  }

  objects[pagesId] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;
  objects[catalogId] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;

  let body = "%PDF-1.4\n";
  const offsets = [0];
  for (let i = 1; i < objects.length; i++) {
    offsets[i] = Buffer.byteLength(body, "utf8");
    body += `${i} 0 obj\n${objects[i]}\nendobj\n`;
  }

  const xrefOffset = Buffer.byteLength(body, "utf8");
  body += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;
  for (let i = 1; i < objects.length; i++) {
    body += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  body += `trailer\n<< /Size ${objects.length} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  return body;
}

await mkdir(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, buildPdf(pdf.pages));
console.log(`Wrote ${outputPath}`);
