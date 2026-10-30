#!/usr/bin/env node
// 将 packages/* 全部 package.json 的 version 统一为其中的最大 semver。
// 由 `pnpm run version:all`（changeset version 之后）调用。
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

function gt(a, b) {
  const [x, y] = [a, b].map(v => v.split(".").map(Number));
  return x[0] === y[0] ? (x[1] === y[1] ? x[2] > y[2] : x[1] > y[1]) : x[0] > y[0];
}

const versions = new Map();
for (const d of readdirSync("packages")) {
  if (d.startsWith("."))
    continue;

  const content = readFileSync(path.join("packages", d, "package.json"), "utf8");
  versions.set(d, JSON.parse(content).version);
}
let latest = null;
for (const v of versions.values()) {
  if (latest === null || gt(v, latest))
    latest = v;
}

for (const [d, v] of versions) {
  if (v === latest) {
    continue;
  }

  const p = path.join("packages", d, "package.json");
  const pkg = JSON.parse(readFileSync(p, "utf8"));
  pkg.version = latest;
  writeFileSync(p, `${JSON.stringify(pkg, null, 2)}\n`);
  console.log(`synced ${d}: ${v} -> ${latest}`);
}
