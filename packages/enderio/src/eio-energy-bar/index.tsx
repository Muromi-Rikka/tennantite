import { ModProgress } from "@tennantite/mods-core";
import { cn } from "@tennantite/ui";

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
  const isMissingCapacitor = variant === "capacitor" && capacitorInstalled === false;
  const tileCount = Math.ceil(height / 16);

  return (
    <ModProgress
      ariaValue="percent"
      className={cn("overflow-hidden", className)}
      dataAttributes={{ "data-eio-energy-bar": "" }}
      direction="up"
      fill={isMissingCapacitor
        ? (
            <EioSprite
              height={EIO_ENERGY_CAPACITOR.height}
              name="sprites/widget/energy_bar_error"
              width={EIO_ENERGY_CAPACITOR.width}
            />
          )
        : (variant === "capacitor"
            ? (
                <EioSprite
                  height={EIO_ENERGY_CAPACITOR.height}
                  name="sprites/widget/energy_bar_fill"
                  width={EIO_ENERGY_CAPACITOR.width}
                />
              )
            : Array.from({ length: tileCount }, (_, index) => {
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
              }))}
      height={height}
      label={label}
      left={left}
      max={max}
      title={isMissingCapacitor ? `${label}：缺少电容` : `${label}：${value}/${max}`}
      top={top}
      value={isMissingCapacitor ? 0 : value}
      width={width}
    />
  );
}
