#!/usr/bin/env node
// 逐包发布：registry 上版本 < 本地版本才 pnpm publish（可安全重跑）。
// 支持 --dry-run：只打印对比结果，不实际发布。
import { execFileSync, execSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

function gt(a, b) {
  const [x, y] = [a, b].map(v => v.split(".").map(Number));
  return x[0] === y[0] ? (x[1] === y[1] ? x[2] > y[2] : x[1] > y[1]) : x[0] > y[0];
}
const dryRun = process.argv.includes("--dry-run");

for (const d of readdirSync("packages")) {
  if (d.startsWith("."))
    continue;

  const pkg = JSON.parse(readFileSync(path.join("packages", d, "package.json"), "utf8"));
  const name = pkg.name;
  let published;
  try {
    published = execFileSync("pnpm", ["view", name, "version"], { encoding: "utf8", shell: process.platform === "win32" }).trim();
  }
  catch (error) {
    if (/E404/.test(String(error.stderr) + String(error.stdout))) {
      published = null; // 尚未发布过
    }
    else {
      console.error(`${name}: registry lookup failed —\n${error.message}`);
      process.exit(1);
    }
  }

  if (published && !gt(pkg.version, published)) {
    console.log(`skip ${name}@${pkg.version} (registry has ${published})`);
    continue;
  }
  console.log(`publish ${name}@${pkg.version}${published ? ` (registry has ${published})` : " (first release)"}`);
  if (dryRun)
    continue;

  try {
    execSync("pnpm publish --no-git-checks", { cwd: path.join("packages", d), stdio: "inherit" });
  }
  catch {
    process.exit(1);
  }
}
