import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { buildCvHtml } from "../lib/cv-html.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, "../public/cv.pdf");
const cv = JSON.parse(readFileSync(resolve(__dirname, "../lib/cv-data.json"), "utf8"));

function findBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    process.env.EDGE_PATH,
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    join(process.env.LOCALAPPDATA ?? "", "Google\\Chrome\\Application\\chrome.exe"),
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  ].filter(Boolean);

  return candidates.find((path) => existsSync(path));
}

const browser = findBrowser();
if (!browser) {
  throw new Error("Chrome or Edge is required to print the CV PDF.");
}

const tempDir = mkdtempSync(join(tmpdir(), "suvo-cv-"));
const htmlPath = join(tempDir, "cv.html");
writeFileSync(htmlPath, buildCvHtml(cv, { toolbar: false }));

const result = spawnSync(
  browser,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    "--no-first-run",
    "--no-default-browser-check",
    `--print-to-pdf=${outputPath}`,
    pathToFileURL(htmlPath).href,
  ],
  { stdio: "inherit" },
);

rmSync(tempDir, { recursive: true, force: true });

if (result.status !== 0) {
  throw new Error(`Browser print failed with status ${result.status ?? "unknown"}`);
}

console.log(`Wrote ${outputPath}`);
