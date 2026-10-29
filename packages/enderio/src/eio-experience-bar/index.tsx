import { gui, GuiSprite } from "@tennantite/ui";

import { EIO_EXPERIENCE_BAR, EIO_XP_TEXT_COLOR } from "../eio-metrics";

export interface EioExperienceBarProps {
  left: number;
  level: number;
  progress: number;
  top: number;
}

/**
 * 灵魂绑定器经验条：65×5 原版 HUD 经验条 + 绿色等级数字。
 */
export function EioExperienceBar({ left, level, progress, top }: EioExperienceBarProps) {
  const ratio = Math.min(1, Math.max(0, progress));
  const fillWidth = Math.min(
    EIO_EXPERIENCE_BAR.width - 1,
    Math.max(0, Math.floor(ratio * EIO_EXPERIENCE_BAR.width) - 1),
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
          height: gui(EIO_EXPERIENCE_BAR.height),
          left: gui(left),
          position: "absolute",
          top: gui(top),
          width: gui(EIO_EXPERIENCE_BAR.width),
        }}
      >
        <GuiSprite
          height={EIO_EXPERIENCE_BAR.height}
          name="sprites/hud/experience_bar_background.png"
          width={EIO_EXPERIENCE_BAR.width}
        />
        {fillWidth > 0
          ? (
              <GuiSprite
                height={EIO_EXPERIENCE_BAR.height}
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
          left: gui(Math.floor(left + 32.5)),
          textShadow: "-1px 0 #000, 1px 0 #000, 0 -1px #000, 0 1px #000",
          top: gui(top - EIO_EXPERIENCE_BAR.height - 3),
        }}
      >
        {level}
      </span>
    </>
  );
}
