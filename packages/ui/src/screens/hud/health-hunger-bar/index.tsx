/* eslint-disable react/no-array-index-key -- 生命图标按固定槽位排列，位置即身份 */
import { Icon } from "../../../containers/icon/index";

export interface HealthHungerBarProps {
  /**
  * 护甲值（提供时渲染护甲行）
  */
  armor?: number;
  className?: string;
  /**
  * 生命值（半颗心为单位，满血 = maxHealth）
  */
  health: number;
  /**
  * 饥饿值（半单位）
  */
  hunger: number;
  maxArmor?: number;
  /**
  * 生命上限（默认 20，即 10 颗心）
  */
  maxHealth?: number;
  maxHunger?: number;
  maxOxygen?: number;
  /**
  * 氧气值（提供且 < 满时渲染氧气行，气泡）
  */
  oxygen?: number;
  /**
  * 图标边长（GUI px，默认 9 —— 原版心 / 饥饿 / 护甲 / 氧气）
  */
  size?: number;
}

interface RowProps {
  empty: Parameters<typeof Icon>[0]["name"];
  full: Parameters<typeof Icon>[0]["name"];
  half: Parameters<typeof Icon>[0]["name"];
  max: number;
  size: number;
  value: number;
}

/**
 * 生命 / 饥饿 / 护甲 / 氧气状态栏（规格 §6.1 HUD，overlay 语义，无聚焦，静态成立）。
 * 布局对齐原版：图标 9×9 GUI px，水平步进 8（互相重叠 1px）。
 */
export function HealthHungerBar({
  armor,
  className,
  health,
  hunger,
  maxArmor = 20,
  maxHealth = 20,
  maxHunger = 20,
  maxOxygen = 20,
  oxygen,
  size = 9,
}: HealthHungerBarProps) {
  const isShowOxygen = oxygen !== undefined && oxygen < maxOxygen;
  return (
    <div className={className} data-hud="">
      <div className="flex items-end justify-between gap-8">
        <IconRow
          empty="heart-empty"
          full="heart"
          half="heart-half"
          max={maxHealth}
          size={size}
          value={health}
        />
        <IconRow
          empty="hunger-empty"
          full="hunger"
          half="hunger-half"
          max={maxHunger}
          size={size}
          value={hunger}
        />
      </div>
      {armor !== undefined || isShowOxygen
        ? (
            <div className="mt-1 flex items-end justify-between gap-8">
              {armor === undefined
                ? (
                    <span />
                  )
                : (
                    <IconRow
                      empty="armor-empty"
                      full="armor"
                      half="armor-half"
                      max={maxArmor}
                      size={size}
                      value={armor}
                    />
                  )}
              {isShowOxygen
                ? (
                    <IconRow
                      empty="air-empty"
                      full="air"
                      half="air"
                      max={maxOxygen}
                      size={size}
                      value={oxygen ?? 0}
                    />
                  )
                : null}
            </div>
          )
        : null}
    </div>
  );
}

/**
 * 按 half-unit 值渲染 full / half / empty 图标序列（步进 8 GUI px，重叠 1px）
*/
function IconRow({ empty, full, half, max, size, value }: RowProps) {
  const units = Math.ceil(max / 2);
  const icons = Array.from({ length: units }, (_, index) => {
    const remaining = value - index * 2;
    if (remaining >= 2) {
      return full;
    }
    return remaining === 1 ? half : empty;
  });
  return (
    <div className="flex gap-0" role="img">
      {icons.map((name, index) => (
        <Icon
          className={index === icons.length - 1 ? undefined : "-mr-1"}
          key={index}
          name={name}
          size={size}
        />
      ))}
    </div>
  );
}
