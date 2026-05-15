import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
process.chdir(root);

const noCache = process.argv.includes("--no-cache");

// Build first while the existing container keeps serving (no preemptive rm).
if (noCache) {
  execSync("docker compose build --no-cache web", { stdio: "inherit" });
} else {
  execSync("docker compose build web", { stdio: "inherit" });
}

// Recreate after a successful build — downtime is only the container swap, not the whole build.
execSync("docker compose up -d web", { stdio: "inherit" });
