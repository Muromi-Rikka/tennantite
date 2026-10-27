import type { ComponentProps } from "react";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { cn, gui } from "../../lib/utils";

export type CheckboxProps = ComponentProps<typeof BaseCheckbox.Root>;

/**
 * 白色对勾的像素坐标（10×8，1 GUI px），右侧/下方为 #868686 阴影。
 */
const CHECK_ROWS = [
  "..........",
  "..........",
  ".......ww.",
  "......ww..",
  ".w...ww...",
  ".ww.ww....",
  "..www.....",
  "...w......",
] as const;

interface CheckRun {
  fill: string;
  height: 1;
  width: number;
  x: number;
  y: number;
}

const CHECK_RUNS: CheckRun[] = CHECK_ROWS.flatMap((row, y) => {
  const runs: CheckRun[] = [];
  let x = 0;
  while (x < row.length) {
    const ch = row[x];
    let width = 1;
    while (row[x + width] === ch) {
      width += 1;
    }
    if (ch === "w") {
      runs.push(
        { fill: "#868686", height: 1, width, x: x + 1, y: y + 1 },
        { fill: "#FFFFFF", height: 1, width, x, y },
      );
    }
    x += width;
  }
  return runs;
});

/**
 * MC 复选框（规格 §4 #4）：纯 #2C2C2C 槽 + 1 GUI px 黑框，选中绘制白色对勾。
 */
export function Checkbox({ className, ...properties }: CheckboxProps) {
  return (
    <BaseCheckbox.Root
      className={cn(
        "mc-tex-checkbox flex size-20 shrink-0 cursor-pointer items-center justify-center outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...properties}
    >
      <BaseCheckbox.Indicator className="flex items-center justify-center">
        <svg
          aria-hidden="true"
          className="pixelated"
          shapeRendering="crispEdges"
          style={{ height: gui(8), width: gui(10) }}
          viewBox="0 0 10 8"
        >
          {CHECK_RUNS.map(run => (
            <rect
              fill={run.fill}
              height={run.height}
              key={`${run.x}-${run.y}-${run.fill}`}
              width={run.width}
              x={run.x}
              y={run.y}
            />
          ))}
        </svg>
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
}
