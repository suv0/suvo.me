import { spawn } from "node:child_process";
import { cpSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { printNetworkBanner } from "./network-urls.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const standaloneDir = join(root, ".next", "standalone");
const serverJs = join(standaloneDir, "server.js");

/** Dev uses 3002; local prod preview uses 3003 so both can run side by side. */
const port = process.env.PORT ?? "3003";

function syncStandaloneAssets() {
  const publicSrc = join(root, "public");
  const publicDest = join(standaloneDir, "public");
  const staticSrc = join(root, ".next", "static");
  const staticDest = join(standaloneDir, ".next", "static");

  if (existsSync(publicSrc)) {
    cpSync(publicSrc, publicDest, { recursive: true });
  }
  if (existsSync(staticSrc)) {
    cpSync(staticSrc, staticDest, { recursive: true });
  }
}

if (!existsSync(serverJs)) {
  console.error("");
  console.error("  Missing .next/standalone/server.js");
  console.error("  Run `npm run build` before `npm run start`.");
  console.error("");
  process.exit(1);
}

syncStandaloneAssets();

printNetworkBanner({ port, mode: "production (standalone)" });

const child = spawn(process.execPath, [serverJs], {
  stdio: "inherit",
  cwd: standaloneDir,
  env: {
    ...process.env,
    PORT: port,
    HOSTNAME: "0.0.0.0",
  },
});

child.on("exit", (code) => process.exit(code ?? 0));
