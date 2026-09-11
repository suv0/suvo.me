import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");
const careerDataRoot = resolve(repoRoot, "../../career-data");
const outDir = resolve(repoRoot, "lib");

const result = spawnSync("npm", ["run", "build", "--", "--out", outDir], {
  cwd: careerDataRoot,
  stdio: "inherit",
  shell: true,
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

console.log("Career data synced to lib/");
