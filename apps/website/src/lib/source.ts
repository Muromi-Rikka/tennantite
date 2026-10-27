import fs from "node:fs";
import path from "node:path";

export function readDemoSource(sourceDir: string): string {
  const file = path.join(findRepoRoot(process.cwd()), sourceDir, "demo.tsx");
  try {
    return fs.readFileSync(file, "utf8");
  }
  catch {
    return `// 未找到示例源码：${sourceDir}/demo.tsx`;
  }
}

function findRepoRoot(start: string): string {
  let dir = start;
  for (let i = 0; i < 6; i += 1) {
    if (fs.existsSync(path.join(dir, "pnpm-workspace.yaml")))
      return dir;
    const parent = path.dirname(dir);
    if (parent === dir)
      break;
    dir = parent;
  }
  return start;
}
