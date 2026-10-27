export { cn } from "cn";

/**
 * GUI px → CSS 长度：`gui(18)` = 18 × var(--mc-gui)。
 *
 * 原版 GUI 坐标为整数 GUI px，默认 `--mc-scale: 2` 时 1 GUI px = 2 CSS px。
 */
export function gui(value: number): string {
  return `calc(var(--mc-gui) * ${value})`;
}
