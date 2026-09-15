#!/usr/bin/env node
/** Fallback dev server using webpack (cache disabled in next.config.mjs). */
import { spawn, execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const nextDir = path.join(projectRoot, ".next");
const ports = [3000, 3001];

function log(message) {
  console.log(`[dev:webpack] ${message}`);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function killPort(port) {
  try {
    const pids = execSync(`lsof -ti :${port} 2>/dev/null || true`, {
      encoding: "utf8",
    })
      .trim()
      .split("\n")
      .filter(Boolean);

    for (const pid of pids) {
      try {
        const cmd = execSync(`ps -p ${pid} -o command= 2>/dev/null || true`, {
          encoding: "utf8",
        });
        if (/next|node/.test(cmd)) {
          process.kill(Number(pid), "SIGTERM");
          log(`Stopped stale process ${pid} on port ${port}`);
        }
      } catch {
        // ignore
      }
    }
  } catch {
    // ignore
  }
}

function cleanNextCache() {
  if (!fs.existsSync(nextDir)) return;

  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      execSync(`rm -rf ${JSON.stringify(nextDir)}`, { stdio: "ignore" });
      if (!fs.existsSync(nextDir)) {
        log("Removed .next cache");
        return;
      }
    } catch {
      // retry
    }
    execSync("sleep 0.4");
  }

  if (fs.existsSync(nextDir)) {
    throw new Error("Failed to remove .next cache. Close other dev servers and retry.");
  }
}

for (const port of ports) {
  killPort(port);
}
await sleep(600);
cleanNextCache();

log("Starting Next.js dev server (webpack)…");

const child = spawn("next", ["dev"], {
  cwd: projectRoot,
  stdio: "inherit",
  env: {
    ...process.env,
    NEXT_DEV_WEBPACK: "1",
    WATCHPACK_POLLING: "true",
    CHOKIDAR_USEPOLLING: "true",
  },
});

child.on("exit", (code) => process.exit(code ?? 0));

process.on("SIGINT", () => child.kill("SIGINT"));
process.on("SIGTERM", () => child.kill("SIGTERM"));
