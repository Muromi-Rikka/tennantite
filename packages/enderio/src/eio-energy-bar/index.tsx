import { progressClipPath } from "@tennantite/mods-core";
import { gui } from "@tennantite/ui";

import { EIO_ENERGY_CAPACITOR } from "../eio-metrics";
import { EioSprite } from "../eio-sprite/index";

export interface EioEnergyBarProps {
  capacitorInstalled?: boolean;
  className?: string;
  height: number;
  label?: string;
  left: number;
  max: number;
  top: number;
  value: number;
  variant: "capacitor" | "legacy";
  width: number;
}

/**
 * Ender IO 能量条：
 * - `capacitor`：18×52 电容款精灵，缺电容时显示警示精灵；
 * - `legacy`：`widgets.png` (0,128) 的 9×16 条纹自底向上平铺。
 */
export function EioEnergyBar({
  capacitorInstalled = true,
  className = "",
  height,
  label = "能量",
  left,
  max,
  top,
  value,
  variant,
  width,
}: EioEnergyBarProps) {
  const ratio = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0;
  const isMissingCapacitor = variant === "capacitor" && capacitorInstalled === false;
  const tileCount = Math.ceil(height / 16);

  return (
    <div
      aria-label={label}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={isMissingCapacitor ? 0 : Math.round(ratio * 100)}
      className={`absolute overflow-hidden ${className}`}
      data-eio-energy-bar=""
      role="progressbar"
      style={{
        height: gui(height),
        left: gui(left),
        top: gui(top),
        width: gui(width),
      }}
      title={isMissingCapacitor ? `${label}：缺少电容` : `${label}：${value}/${max}`}
    >
      {isMissingCapacitor
        ? (
            <EioSprite
              height={EIO_ENERGY_CAPACITOR.height}
              name="sprites/widget/energy_bar_error"
              width={EIO_ENERGY_CAPACITOR.width}
            />
          )
        : (variant === "capacitor"
            ? (
                <div
                  style={{
                    clipPath: progressClipPath("up", ratio),
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <EioSprite
                    height={EIO_ENERGY_CAPACITOR.height}
                    name="sprites/widget/energy_bar_fill"
                    width={EIO_ENERGY_CAPACITOR.width}
                  />
                </div>
              )
            : (
                <div
                  style={{
                    clipPath: progressClipPath("up", ratio),
                    height: "100%",
                    overflow: "hidden",
                    width: "100%",
                  }}
                >
                  {Array.from({ length: tileCount }, (_, index) => {
                    const tileTop = height - (index + 1) * 16;
                    return (
                      <EioSprite
                        crop={{ height: 16, width: 9, x: 0, y: 128 }}
                        height={16}
                        key={tileTop}
                        left={0}
                        name="widgets"
                        top={tileTop}
                        width={9}
                      />
                    );
                  })}
                </div>
              ))}
    </div>
  );
}
