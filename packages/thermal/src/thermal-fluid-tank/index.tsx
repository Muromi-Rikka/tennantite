import { ModTank } from "@tennantite/mods-core";

import type { ThermalMachineFluidLayout } from "../thermal-machine-layout";
import { ThermalSprite } from "../thermal-sprite/index";

export interface ThermalFluidTankProps {
  className?: string;
  /**
   * 无障碍名称（默认「液体」）
   */
  label?: string;
  /**
   * 当前状态；省略按 0 填充
   */
  state?: { amount: number; capacity: number; tint: string };
  /**
   * 布局表 tank 条目（frame/overlay 贴图名与几何）
   */
  tank: ThermalMachineFluidLayout;
}

/**
 * Thermal 流体储罐：`ModTank` 内缩填充 + frame/overlay 两层贴图。
 */
export function ThermalFluidTank({
  className,
  label = "液体",
  state,
  tank,
}: ThermalFluidTankProps) {
  return (
    <ModTank
      className={className}
      dataAttributes={{ "data-thermal-fluid-tank": tank.frame }}
      frame={(
        <ThermalSprite
          crop={{ height: tank.height, width: tank.width, x: 0, y: 0 }}
          name={tank.frame}
        />
      )}
      height={tank.height}
      inset={1}
      label={label}
      left={tank.left}
      max={state?.capacity ?? 1}
      overlay={(
        <ThermalSprite
          crop={{ height: tank.height, width: tank.width, x: 0, y: 0 }}
          name={tank.overlay}
        />
      )}
      tint={state?.tint}
      top={tank.top}
      value={state?.amount ?? 0}
      width={tank.width}
    />
  );
}
