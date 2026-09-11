export const CV_DOCUMENT_CSS = `
:root {
  --ink: #0c111d;
  --sub: #2d3a4f;
  --muted: #5c6b7f;
  --line: #dce3ed;
  --bg: #eef2f8;
  --accent: #0d4a6e;
  --accent-soft: #e8f2f8;
}
* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  color: var(--ink);
  background: var(--bg);
  line-height: 1.48;
  font-size: 14px;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.cv-toolbar {
  max-width: 180mm;
  margin: 14px auto 0;
  display: flex;
  justify-content: flex-end;
  gap: 14px;
  font-size: 13px;
}
.cv-toolbar a { color: var(--accent); text-decoration: none; }
.cv-toolbar a:hover { text-decoration: underline; }
.page {
  width: 100%;
  max-width: 180mm;
  margin: 12px auto 28px;
  background: #fff;
  border: 1px solid var(--line);
  border-left: 4px solid var(--accent);
  padding: 8mm 9mm 9mm;
  box-shadow: 0 12px 40px rgba(12, 17, 29, 0.06);
}
h1 {
  margin: 0 0 4px;
  font-size: 32px;
  line-height: 1.1;
  letter-spacing: -0.025em;
  font-weight: 750;
}
.headline {
  margin: 0 0 14px;
  color: var(--sub);
  font-size: 14.5px;
  font-weight: 600;
  line-height: 1.42;
  max-width: 78ch;
}
.contact {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 18px;
  font-size: 13px;
  color: var(--muted);
  margin-bottom: 4px;
  padding: 10px 12px;
  background: var(--accent-soft);
  border-radius: 6px;
  border: 1px solid var(--line);
}
.contact a { color: var(--accent); text-decoration: none; }
.contact a:hover { text-decoration: underline; }
h2 {
  margin: 20px 0 8px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--accent);
  border-bottom: 2px solid var(--line);
  padding-bottom: 5px;
}
h2:first-of-type { margin-top: 14px; }
.summary-text {
  margin: 0 0 12px;
  font-size: 14px;
  line-height: 1.55;
  max-width: 76ch;
}
.summary-text:last-of-type { margin-bottom: 0; }
.skill-group {
  margin: 12px 0 6px;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
  font-weight: 600;
}
.skill-group:first-of-type { margin-top: 0; }
.grid {
  display: grid;
  grid-template-columns: 1.72fr 1fr;
  gap: 24px;
}
.role { break-inside: avoid; }
.role-title {
  margin: 16px 0 0;
  font-size: 16px;
  font-weight: 700;
}
.role-meta {
  margin: 2px 0 8px;
  color: var(--muted);
  font-size: 12px;
}
ul { margin: 0; padding-left: 18px; }
li { margin: 7px 0; }
.pill {
  display: inline-block;
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 3px 10px;
  margin: 0 6px 6px 0;
  font-size: 11px;
  color: var(--sub);
  background: #fff;
}
.sidebar-note {
  margin: 8px 0 0;
  font-size: 13px;
  line-height: 1.45;
  color: var(--sub);
}
.links-note {
  margin: 8px 0 0;
  font-size: 11.5px;
  color: var(--sub);
  line-height: 1.45;
}
.links-note a { color: var(--accent); text-decoration: none; }
.links-note a:hover { text-decoration: underline; }
@page {
  size: A4;
  margin: 14mm;
}
@media print {
  body {
    background: #fff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .cv-toolbar { display: none !important; }
  .page {
    margin: 0 auto;
    border: 0;
    border-left: 3px solid var(--accent);
    max-width: none;
    width: 100%;
    padding: 5mm 6mm;
    box-shadow: none;
  }
  .grid {
    display: grid !important;
    grid-template-columns: 1.72fr 1fr !important;
  }
  h2 { margin: 14px 0 6px; }
  .role-title { margin-top: 12px; }
  li { margin: 5px 0; }
  a { color: inherit; text-decoration: none; }
  .contact a { color: inherit; }
}
@media screen and (max-width: 900px) {
  .grid { grid-template-columns: 1fr; }
  .page { margin: 0; border-radius: 0; }
}
`;

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function displayHost(url) {
  return String(url).replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function elapsedYears(startYear, year = new Date().getFullYear()) {
  return Math.max(1, year - startYear);
}

function projectHref(project) {
  const links = project.links ?? {};
  return links.playStore || links.github || links.appStore || links.press || null;
}

function companyHref(job, cv) {
  if (job.url) return job.url;
  if (String(job.company).includes("Dwetech") && cv.dwetechUrl) return cv.dwetechUrl;
  return undefined;
}

function linkCopy(text, cv) {
  const allchrono = cv.experience.find((job) => job.id === "allchrono")?.url;
  const replacements = [
    ["AllChrono", allchrono],
    ["Dwetech", cv.dwetechUrl],
    ["Freelancer.com", cv.freelancerProfileUrl],
  ];

  const parts = String(text).split(/(AllChrono|Dwetech|Freelancer\.com)/);
  return parts
    .map((part) => {
      const match = replacements.find(([token]) => token === part);
      if (match?.[1]) {
        return `<a href="${esc(match[1])}">${esc(part)}</a>`;
      }
      return esc(part);
    })
    .join("");
}

function headline(cv) {
  const careerYears = elapsedYears(cv.careerStartYear);
  const chaldalYears = elapsedYears(cv.chaldalStartYear);
  const stack = cv.roleStack ? ` · ${cv.roleStack}` : "";
  return `${cv.title}${stack} · ${chaldalYears}+ years at Chaldal (YC S15) · ${careerYears}+ years in software since ${cv.careerStartYear}`;
}

export function buildCvBody(cv, options = {}) {
  const showToolbar = options.toolbar !== false;
  const summaries = [cv.heroSummary, cv.about].filter(Boolean);
  const contactBits = [
    `<span><a href="mailto:${esc(cv.email)}">${esc(cv.email)}</a></span>`,
    cv.phone ? `<span>${esc(cv.phone)}</span>` : "",
    `<span><a href="${esc(cv.linkedin)}">${esc(displayHost(cv.linkedin))}</a></span>`,
    `<span><a href="${esc(cv.github)}">${esc(displayHost(cv.github))}</a></span>`,
    `<span><a href="${esc(cv.website)}">${esc(displayHost(cv.website))}</a></span>`,
    `<span>${esc(cv.location)}</span>`,
  ].filter(Boolean);

  const experienceHtml = cv.experience
    .map((job) => {
      const href = companyHref(job, cv);
      const company = href
        ? `<a href="${esc(href)}">${esc(job.company)}</a>`
        : esc(job.company);
      const highlights = job.highlights
        .map((point) => `<li>${linkCopy(point, cv)}</li>`)
        .join("");
      return `<article class="role">
        <p class="role-title">${esc(job.role)}</p>
        <p class="role-meta">${company} · ${esc(job.location)} · ${esc(job.period)}</p>
        <ul>${highlights}</ul>
      </article>`;
    })
    .join("\n");

  const skillsHtml = cv.skills
    .map((group) => {
      const pills = group.items.map((item) => `<span class="pill">${esc(item)}</span>`).join("\n");
      return `<p class="skill-group">${esc(group.group)}</p><div>${pills}</div>`;
    })
    .join("\n");

  const educationHtml = (cv.education ?? [])
    .map(
      (item) =>
        `<p class="sidebar-note">${esc(item.credential)}<br />${esc(item.institution)} · ${esc(item.period)}</p>`,
    )
    .join("");

  const languagesHtml = (cv.languages ?? [])
    .map((item) => `<p class="sidebar-note">${esc(item.language)}: ${esc(item.proficiency)}</p>`)
    .join("");

  const selectedLinks = [
    ...cv.experience
      .filter((job) => job.url)
      .map((job) => `<a href="${esc(job.url)}">${esc(job.company)}</a>`),
    ...cv.projects
      .map((project) => {
        const href = projectHref(project);
        return href ? `<a href="${esc(href)}">${esc(project.name)}</a>` : null;
      })
      .filter(Boolean),
    `<a href="${esc(cv.github)}">GitHub profile</a> (${esc(displayHost(cv.github))})`,
  ];

  const summaryHtml = summaries
    .map((paragraph) => `<p class="summary-text">${linkCopy(paragraph, cv)}</p>`)
    .join("\n");

  const toolbar = showToolbar
    ? `<nav class="cv-toolbar">
    <a href="/">suvo.me</a>
    <a href="/cv.pdf">Download PDF</a>
  </nav>`
    : "";

  return `${toolbar}
  <main class="page">
    <h1>${esc(cv.name)}</h1>
    <p class="headline">${esc(headline(cv))}</p>
    <div class="contact">${contactBits.join("\n")}</div>
    <h2>Summary</h2>
    ${summaryHtml}
    <div class="grid">
      <section>
        <h2>Experience</h2>
        ${experienceHtml}
      </section>
      <aside>
        <h2>Skills</h2>
        ${skillsHtml}
        ${educationHtml ? `<h2>Education</h2>${educationHtml}` : ""}
        ${languagesHtml ? `<h2>Languages</h2>${languagesHtml}` : ""}
        <h2>Selected work</h2>
        <p class="links-note">${selectedLinks.join("<br />")}</p>
      </aside>
    </div>
  </main>`;
}

export function buildCvHtml(cv, options = {}) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(cv.name)} | CV</title>
  <meta name="description" content="Professional CV for ${esc(cv.name)}, ${esc(cv.title)}." />
  <style>${CV_DOCUMENT_CSS}</style>
</head>
<body>
  ${buildCvBody(cv, options)}
</body>
</html>
`;
}
