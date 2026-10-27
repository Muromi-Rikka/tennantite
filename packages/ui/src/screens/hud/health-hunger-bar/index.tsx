/* eslint-disable react/no-array-index-key -- HUD 图标按固定槽位排列，位置即身份 */
import type { GuiSpriteName } from "@verdigris/textures";

import { GuiSprite } from "../../../containers/gui-sprite/index";
import { cn } from "../../../lib/utils";

export type HealthEffect = "frozen" | "normal" | "poisoned" | "withered";

export interface HealthHungerBarProps {
  /**
  * 吸收伤害（半颗心为单位）
  */
  absorption?: number;
  /**
  * 氧气即将耗尽时使用 burst 精灵
  */
  airBursting?: boolean;
  /**
  * 护甲值（提供时渲染护甲行）
  */
  armor?: number;
  /**
  * 生命值闪烁（受伤无敌帧）
  */
  blinking?: boolean;
  className?: string;
  /**
  * 生命状态效果
  */
  effect?: HealthEffect;
  /**
  * 硬核模式（不同心形）
  */
  hardcore?: boolean;
  /**
  * 生命值（半颗心为单位，满血 = maxHealth）
  */
  health: number;
  /**
  * 饥饿值（半单位）
  */
  hunger: number;
  /**
  * 饥饿状态效果（鸡腿变暗）
  */
  hungerEffect?: boolean;
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
  /**
  * 骑乘载具（只渲染载具心）
  */
  vehicle?: boolean;
}

const ROW_WIDTH = 182;
const ROW_ICONS = 10;

type RowKind = "absorption" | "air" | "air-bursting" | "armor" | "food" | "health";

/**
 * 生命 / 饥饿 / 护甲 / 氧气状态栏（规格 §6.1 HUD，overlay 语义，无聚焦，静态成立）。
 * 布局对齐原版：图标 9×9 GUI px，水平步进 8（互相重叠 1px），每行 10 个。
 */
export function HealthHungerBar({
  absorption = 0,
  airBursting,
  armor,
  blinking,
  className,
  effect = "normal",
  hardcore,
  health,
  hunger,
  hungerEffect: isHungerEffect,
  maxArmor = 20,
  maxHealth = 20,
  maxHunger = 20,
  maxOxygen = 20,
  oxygen,
  size = 9,
  vehicle,
}: HealthHungerBarProps) {
  const isShowOxygen = oxygen !== undefined && oxygen < maxOxygen;
  const heartOptions = { blinking, effect, hardcore, vehicle };
  const absorbedOptions = { ...heartOptions, absorption: 1 };
  return (
    <div
      className={cn("relative", className)}
      data-hud=""
      style={{ width: `calc(var(--mc-gui) * ${ROW_WIDTH})` }}
    >
      {absorption > 0
        ? (
            <HudRow
              label={`吸收 ${absorption}`}
              side="left"
              size={size}
              sprites={buildRow(absorption, 20, "absorption", absorbedOptions)}
            />
          )
        : null}
      <div className="flex items-end justify-between">
        <HudRow
          label={`生命 ${health}/${maxHealth}`}
          side="left"
          size={size}
          sprites={buildRow(health, maxHealth, "health", heartOptions)}
        />
        <HudRow
          label={`饥饿 ${hunger}/${maxHunger}`}
          side="right"
          size={size}
          sprites={buildRow(hunger, maxHunger, "food", heartOptions, isHungerEffect)}
        />
      </div>
      {armor !== undefined || isShowOxygen
        ? (
            <div className="flex items-end justify-between">
              {armor === undefined
                ? <span />
                : (
                    <HudRow
                      label={`护甲 ${armor}/${maxArmor}`}
                      side="left"
                      size={size}
                      sprites={buildRow(armor, maxArmor, "armor")}
                    />
                  )}
              {isShowOxygen
                ? (
                    <HudRow
                      label={`氧气 ${oxygen}/${maxOxygen}`}
                      side="right"
                      size={size}
                      sprites={buildRow(
                        oxygen ?? 0,
                        maxOxygen,
                        airBursting ? "air-bursting" : "air",
                      )}
                    />
                  )
                : null}
            </div>
          )
        : null}
    </div>
  );
}

function buildRow(
  value: number,
  max: number,
  kind: RowKind,
  heartOptions?: Parameters<typeof heartSprite>[1],
  isHungerEffect?: boolean,
): GuiSpriteName[] {
  const count = Math.min(ROW_ICONS, Math.ceil(max / 2));
  return Array.from({ length: count }, (_, index) => {
    const remaining = value - index * 2;
    if (kind === "health" || kind === "absorption") {
      if (remaining >= 2)
        return heartSprite("full", heartOptions ?? {});
      return heartSprite(remaining === 1 ? "half" : "container", heartOptions ?? {});
    }
    if (kind === "food") {
      if (remaining >= 2)
        return foodSprite("full", isHungerEffect);
      return foodSprite(remaining === 1 ? "half" : "empty", isHungerEffect);
    }
    if (kind === "armor") {
      if (remaining >= 2)
        return "sprites/hud/armor_full.png";
      return remaining === 1 ? "sprites/hud/armor_half.png" : "sprites/hud/armor_empty.png";
    }
    if (kind === "air-bursting") {
      return remaining === 1 || remaining >= 2 ? "sprites/hud/air_bursting.png" : "sprites/hud/air_empty.png";
    }
    return remaining === 1 || remaining >= 2 ? "sprites/hud/air.png" : "sprites/hud/air_empty.png";
  });
}

function foodSprite(
  kind: "empty" | "full" | "half",
  isHungerEffect: boolean | undefined,
): GuiSpriteName {
  return `sprites/hud/food_${kind}${isHungerEffect ? "_hunger" : ""}.png` as GuiSpriteName;
}

function heartSprite(
  kind: "container" | "full" | "half",
  {
    absorption = 0,
    blinking,
    effect = "normal",
    hardcore,
    vehicle,
  }: Pick<
    HealthHungerBarProps,
    "absorption" | "blinking" | "effect" | "hardcore" | "vehicle"
  >,
): GuiSpriteName {
  if (vehicle) {
    return `sprites/hud/heart/vehicle_${kind}.png` as GuiSpriteName;
  }
  if (kind === "container") {
    const suffix = hardcore ? "hardcore" : "";
    return `sprites/hud/heart/container${suffix ? `_${suffix}` : ""}${blinking ? "_blinking" : ""}.png` as GuiSpriteName;
  }
  const prefix = absorption > 0 ? "absorbing" : (effect === "normal" ? "" : effect);
  const parts = [prefix, hardcore ? "hardcore" : "", kind, blinking ? "blinking" : ""].filter(
    Boolean,
  );
  return `sprites/hud/heart/${parts.join("_")}.png` as GuiSpriteName;
}

function HudRow({
  label,
  side,
  size,
  sprites,
}: {
  label: string;
  side: "left" | "right";
  size: number;
  sprites: GuiSpriteName[];
}) {
  return (
    <div
      aria-label={label}
      className={cn("flex h-9 items-center", side === "right" && "justify-end")}
      role="img"
    >
      {sprites.map((name, index) => (
        <GuiSprite
          className={index === sprites.length - 1 ? undefined : "-mr-1"}
          height={size}
          key={`${name}-${index}`}
          name={name}
          width={size}
        />
      ))}
    </div>
  );
}
