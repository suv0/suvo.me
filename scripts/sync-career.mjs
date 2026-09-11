import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");
const careerDataRoot = resolve(repoRoot, "../../career-data");
const outDir = resolve(repoRoot, "lib");
const profilePath = resolve(careerDataRoot, "career-profile.yaml");

if (!existsSync(profilePath)) {
  console.error(`Career facts not found at:
  ${profilePath}

Clone the three repos in this shape (names and nesting both matter):

  <work>/
    career-data/                 git@github.com:suv0/career-data.git  (private)
    CV/                          git@github.com:suv0/personal-cv-generation.git
    pet-projects/suvo.me/        git@github.com:suv0/suvo.me.git

Then: cd career-data && npm install
`);
  process.exit(1);
}

const result = spawnSync("npm", ["run", "build", "--", "--out", outDir], {
  cwd: careerDataRoot,
  stdio: "inherit",
  shell: true,
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

console.log("Career data synced to lib/");
