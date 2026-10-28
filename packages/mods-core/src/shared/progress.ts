export type ProgressDirection = "down" | "left" | "right" | "up";

/**
 * 进度填充裁剪：以“填充起点”定义方向。
 *
 * - `right`：左 → 右
 * - `left`：右 → 左
 * - `down`：上 → 下
 * - `up`：下 → 上
 */
export function progressClipPath(
  direction: ProgressDirection,
  progress: number,
): string {
  const ratio = Math.min(1, Math.max(0, progress));
  const hidden = (1 - ratio) * 100;
  switch (direction) {
    case "left": {
      return `inset(0 0 0 ${hidden}%)`;
    }
    case "right": {
      return `inset(0 ${hidden}% 0 0)`;
    }
    case "up": {
      return `inset(${hidden}% 0 0 0)`;
    }
    default: {
      return `inset(0 0 ${hidden}% 0)`;
    }
  }
}
