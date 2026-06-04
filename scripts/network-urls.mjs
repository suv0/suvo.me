import os from "node:os";

/** IPv4 URLs for this machine (localhost + LAN). Skip 0.0.0.0 — it is bind-only, not visitable. */
export function getNetworkUrls(port) {
  const portStr = String(port);
  const urls = [];
  const seen = new Set();

  const add = (url) => {
    if (!seen.has(url)) {
      seen.add(url);
      urls.push(url);
    }
  };

  add(`http://localhost:${portStr}`);
  add(`http://127.0.0.1:${portStr}`);

  for (const ifaces of Object.values(os.networkInterfaces())) {
    if (!ifaces) continue;
    for (const addr of ifaces) {
      if (addr.family !== "IPv4" || addr.internal) continue;
      add(`http://${addr.address}:${portStr}`);
    }
  }

  return urls;
}

export function printNetworkBanner({ port, mode }) {
  const urls = getNetworkUrls(port);
  const local = urls.filter((u) => u.includes("localhost") || u.includes("127.0.0.1"));
  const lan = urls.filter((u) => !local.includes(u));

  console.log("");
  console.log(`  suvo.me — ${mode} (port ${port})`);
  console.log("");
  console.log("  On this computer:");
  for (const u of local) console.log(`    ${u}`);
  if (lan.length > 0) {
    console.log("");
    console.log("  On phone / tablet (same Wi‑Fi — use one of these, not 0.0.0.0):");
    for (const u of lan) console.log(`    ${u}`);
  } else {
    console.log("");
    console.log("  No LAN IPv4 found — use localhost on this machine only.");
  }
  console.log("");
  console.log("  0.0.0.0 is only where the server listens; browsers cannot open that address.");
  console.log("");
}
