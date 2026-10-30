import { gui, GuiSprite } from "@tennantite/ui";

import { EIO_EXPERIENCE_BAR, EIO_XP_TEXT_COLOR } from "../eio-metrics";

export interface EioExperienceBarProps {
  /**
  * 条高（GUI px，默认 5）
  */
  height?: number;
  left: number;
  level: number;
  progress: number;
  top: number;
  /**
  * 条宽（GUI px，默认原版 65）
  */
  width?: number;
}

/**
 * 灵魂绑定器经验条：65×5 原版 HUD 经验条 + 绿色等级数字。
 */
export function EioExperienceBar({ height = EIO_EXPERIENCE_BAR.height, left, level, progress, top, width = EIO_EXPERIENCE_BAR.width }: EioExperienceBarProps) {
  const bar = { height, width };
  const ratio = Math.min(1, Math.max(0, progress));
  const fillWidth = Math.min(
    bar.width - 1,
    Math.max(0, Math.floor(ratio * bar.width) - 1),
  );

  return (
    <>
      <div
        aria-label="经验"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={Math.round(ratio * 100)}
        role="progressbar"
        style={{
          height: gui(bar.height),
          left: gui(left),
          position: "absolute",
          top: gui(top),
          width: gui(bar.width),
        }}
      >
        <GuiSprite
          height={bar.height}
          name="sprites/hud/experience_bar_background.png"
          width={bar.width}
        />
        {fillWidth > 0
          ? (
              <GuiSprite
                height={bar.height}
                name="sprites/hud/experience_bar_progress.png"
                style={{ left: 0, position: "absolute", top: 0 }}
                width={fillWidth}
              />
            )
          : null}
      </div>
      <span
        className="absolute font-mc mc-text whitespace-pre"
        style={{
          color: EIO_XP_TEXT_COLOR,
          left: gui(Math.floor(left + bar.width / 2)),
          textShadow: "-1px 0 #000, 1px 0 #000, 0 -1px #000, 0 1px #000",
          top: gui(top - bar.height - 3),
        }}
      >
        {level}
      </span>
    </>
  );
}
