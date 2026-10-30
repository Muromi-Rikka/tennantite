#!/usr/bin/env node
// 校验 GitHub Release tag 与全部 packages/* 版本一致。用法：node scripts/verify-release-version.mjs v1.2.3
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const tag = process.argv[2];
if (!tag || !/^v\d+\.\d+\.\d+$/.test(tag)) {
  console.error(`invalid tag: ${tag ?? "(missing)"} — expected format v1.2.3`);
  process.exit(1);
}
const version = tag.slice(1);

const mismatched = [];
for (const d of readdirSync("packages")) {
  if (d.startsWith("."))
    continue;

  const pkg = JSON.parse(readFileSync(path.join("packages", d, "package.json"), "utf8"));
  if (pkg.version !== version)
    mismatched.push(`${d}: ${pkg.version}`);
}
if (mismatched.length > 0) {
  console.error(`tag ${tag} does not match package versions:\n  ${mismatched.path.join("\n  ")}`);
  process.exit(1);
}
console.log(`all packages at ${version}, matching ${tag}`);
