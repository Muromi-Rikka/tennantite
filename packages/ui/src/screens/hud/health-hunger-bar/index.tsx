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
  * 图标边长（px，默认 18）
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
 * 布局对齐游戏内：生命左、饥饿右，同行相对；护甲 / 氧气按需渲染。
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
  size = 18,
}: HealthHungerBarProps) {
  const isShowOxygen = oxygen !== undefined && oxygen < maxOxygen;
  return (
    <div className={className} data-hud="">
      <div className="flex items-end justify-between gap-16">
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
            <div className="mt-1 flex items-end justify-between gap-16">
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
                    <div className="flex gap-1" role="img">
                      {Array.from({ length: Math.ceil(maxOxygen / 2) }, (_, index) => (
                        <span
                          className="inline-block rounded-full border border-black bg-[#3FA8C9]"
                          key={index}
                          style={{
                            height: size / 2,
                            opacity: (oxygen ?? 0) / maxOxygen > index / (maxOxygen / 2) ? 1 : 0.3,
                            width: size / 2,
                          }}
                        />
                      ))}
                    </div>
                  )
                : null}
            </div>
          )
        : null}
    </div>
  );
}

/**
 * 按 half-unit 值渲染 full / half / empty 图标序列
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
    <div className="flex gap-1" role="img">
      {icons.map((name, index) => (
        <Icon key={index} name={name} size={size} />
      ))}
    </div>
  );
}
