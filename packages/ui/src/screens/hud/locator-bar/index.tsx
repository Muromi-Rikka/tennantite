/* eslint-disable react/no-array-index-key -- 固定槽位/列表以位置为身份 */
import type { GuiSpriteName } from "@tennantite/textures";

import { GuiSprite } from "../../../containers/gui-sprite/index";
import { cn, gui } from "../../../lib/utils";

export interface LocatorBarProps {
  /**
  * 方向箭头
  */
  arrow?: "down" | "up";
  className?: string;
  dots: LocatorDot[];
}

export interface LocatorDot {
  /**
  * 颜色（CSS 颜色；通过 mask 着色）
  */
  color?: string;
  /**
  * 图标类型
  */
  kind?: "0" | "1" | "2" | "3" | "bowtie";
  /**
  * 归一化位置 -1..1（0 为中心）
  */
  x: number;
}

/**
 * 定位条（规格 §6.1）：原版 182×5 locator_bar 背景与 9×9 点位。
 */
export function LocatorBar({ arrow, className, dots }: LocatorBarProps) {
  return (
    <div className={cn("relative h-9 w-182", className)} data-hud="">
      <GuiSprite
        className="absolute inset-x-0 top-2"
        height={5}
        name="sprites/hud/locator_bar_background.png"
        tile
        width={182}
      />
      {dots.map((dot, index) => {
        const name = (dot.kind === "bowtie"
          ? "sprites/hud/locator_bar_dot/bowtie.png"
          : `sprites/hud/locator_bar_dot/default_${dot.kind ?? "0"}.png`) as GuiSpriteName;
        return (
          // react-doctor-disable-next-line react-doctor/no-array-index-as-key —— 数据模型无稳定 id，列表顺序即身份
          <div
            className="absolute top-0 size-9"
            key={`${dot.x}-${index}`}
            style={{ left: `calc(50% + ${gui(dot.x * 91)} - ${gui(4.5)})` }}
          >
            <div
              style={{
                backgroundColor: dot.color,
                height: "100%",
                maskImage: `var(--mc-gui-sprites-hud-locator-bar-dot-${dot.kind === "bowtie" ? "bowtie" : `default-${dot.kind ?? "0"}`}-png)`,
                maskSize: "100% 100%",
                width: "100%",
              }}
            />
            <GuiSprite
              className="absolute inset-0"
              height={9}
              name={name}
              style={dot.color ? { opacity: 0 } : undefined}
              width={9}
            />
          </div>
        );
      })}
      {arrow
        ? (
            <GuiSprite
              className="absolute top-0 left-1/2 -translate-x-1/2"
              height={9}
              name={arrow === "up"
                ? "sprites/hud/locator_bar_arrow_up.png"
                : "sprites/hud/locator_bar_arrow_down.png"}
              width={9}
            />
          )
        : null}
    </div>
  );
}
