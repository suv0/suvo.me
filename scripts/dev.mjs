import { spawn } from "node:child_process";
import { printNetworkBanner } from "./network-urls.mjs";

const port = process.env.PORT ?? "3002";

printNetworkBanner({ port, mode: "dev" });

const child = spawn(
  "npx",
  ["next", "dev", "--hostname", "0.0.0.0", "-p", port],
  { stdio: "inherit", shell: true, env: { ...process.env, PORT: port } },
);

child.on("exit", (code) => process.exit(code ?? 0));
