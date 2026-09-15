#!/usr/bin/env node
/**
 * Stable dev server startup:
 * - stop stale Next.js processes for this app
 * - remove corrupted .next cache
 * - start with Turbopack (avoids webpack HMR chunk errors)
 */
import { spawn, execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const nextDir = path.join(projectRoot, ".next");
const ports = [3000, 3001];

function log(message) {
  console.log(`[dev] ${message}`);
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
        // process already exited
      }
    }
  } catch {
    // lsof unavailable
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
      // retry after processes release file handles
    }
    execSync("sleep 0.4");
  }

  if (fs.existsSync(nextDir)) {
    throw new Error("Failed to remove .next cache. Close other dev servers and retry.");
  }
}

function genBlog() {
  try {
    execSync("node scripts/gen-blog.mjs", { cwd: projectRoot, stdio: "inherit" });
  } catch {
    log("blog:gen failed — check content/blog/*.md for errors");
  }
}

function watchBlogContent() {
  const contentDir = path.join(projectRoot, "content", "blog");
  if (!fs.existsSync(contentDir)) return;
  let timer = null;
  fs.watch(contentDir, { persistent: false }, (_event, filename) => {
    if (!filename || !filename.endsWith(".md")) return;
    clearTimeout(timer);
    timer = setTimeout(genBlog, 300);
  });
  log(`Watching ${path.relative(projectRoot, contentDir)} for changes`);
}

for (const port of ports) {
  killPort(port);
}
await sleep(600);
cleanNextCache();
genBlog();
watchBlogContent();

log("Starting Next.js dev server (Turbopack)…");

const child = spawn("next", ["dev", "--turbo"], {
  cwd: projectRoot,
  stdio: "inherit",
  env: {
    ...process.env,
    WATCHPACK_POLLING: "true",
    CHOKIDAR_USEPOLLING: "true",
  },
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});

process.on("SIGINT", () => child.kill("SIGINT"));
process.on("SIGTERM", () => child.kill("SIGTERM"));
