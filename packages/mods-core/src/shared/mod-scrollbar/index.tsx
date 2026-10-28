import { gui } from "@verdigris/ui";

export interface ModScrollbarProps {
  height: number;
  left: number;
  top: number;
  /**
  * 是否绘制轨道（默认 true；贴图已烘焙轨道时传 false）
  */
  track?: boolean;
  /**
  * 滚动位置 0..1（默认 0）
  */
  value?: number;
}

/**
 * 通用 mod 滚动条展示件：12 宽凹槽轨道 + 12×15 带棱滑块。
 */
export function ModScrollbar({
  height,
  left,
  top,
  track = true,
  value = 0,
}: ModScrollbarProps) {
  const ratio = Math.min(1, Math.max(0, value));
  return (
    <div
      aria-hidden="true"
      className="absolute"
      style={{ height: gui(height), left: gui(left), top: gui(top), width: gui(12) }}
    >
      {track
        ? (
            <span
              className="mc-tex-ae2-scrollbar-track absolute inset-0"
              style={{ height: gui(height) }}
            />
          )
        : null}
      <span
        className="mc-tex-ae2-scrollbar-thumb absolute"
        style={{
          height: gui(15),
          left: 0,
          top: gui(Math.round(ratio * Math.max(0, height - 15))),
          width: gui(12),
        }}
      />
    </div>
  );
}
