import type { MekanismSpriteName } from "@tennantite/textures";
import type { ReactNode } from "react";

import { cn, gui } from "@tennantite/ui";

import type { MekanismTabKind } from "../mekanism-types";
import { MEKANISM_TAB_INSET } from "../mekanism-metrics";
import { MekanismSprite } from "../mekanism-sprite/index";

export interface MekanismTabProps {
  className?: string;
  /**
   * 背景染色
   */
  color?: string;
  /**
   * 标签类型
   */
  kind: MekanismTabKind;
  /**
   * 可访问名称
   */
  label: string;
  /**
   * 标签左上角 x（GUI px）
   */
  left: number;
  /**
   * 图标变体（security / redstone / edit）
   */
  mode?: string;
  onClick?: () => void;
  /**
   * 选中态（button_focus）
   */
  selected?: boolean;
  /**
   * 左侧 / 右侧
   */
  side: "left" | "right";
  /**
   * 按钮下方文本（上游 sorting 的开 / 关）
   */
  text?: ReactNode;
  /**
   * 标签左上角 y（GUI px）
   */
  top: number;
}

const TAB_COLORS: Partial<Record<MekanismTabKind, string>> = {
  edit: "#366bd0",
  energy: "#59c15f",
  heat: "#ffa160",
  redstone: "#c9071f",
  security: "#ffa160",
};

/**
 * 整图标签（无侧条与内嵌按钮）：energy / heat / warning 为上游 26×26 单图。
 */
const TEXTURED_TABS: Partial<Record<MekanismTabKind, true>> = {
  energy: true,
  heat: true,
  warning: true,
};

/**
 * Mekanism 侧边标签：26×26 侧条 + 18×18 内嵌按钮（sorting 为 26×35）。
 *
 * 上游 `GuiInsetElement` 把按钮画在侧条边框内的 (5, 4)（左侧）/ (3, 4)（右侧），
 * 侧条本身仍是 26 高，因此上下各留 4px 边。整图标签直接铺 26×26 精灵。
 */
export function MekanismTab({
  className,
  color,
  kind,
  label,
  left,
  mode,
  onClick,
  selected = false,
  side,
  text,
  top,
}: MekanismTabProps) {
  const tint = color ?? TAB_COLORS[kind] ?? "#ffffff";
  const icon = tabIcon(kind, side, mode);
  const height = kind === "sorting" ? MEKANISM_TAB_INSET.sortingHeight : MEKANISM_TAB_INSET.height;
  const buttonLeft = side === "left" ? MEKANISM_TAB_INSET.buttonLeft : MEKANISM_TAB_INSET.buttonRight;

  return (
    <button
      aria-label={label}
      aria-pressed={selected}
      className={cn("absolute", onClick ? "cursor-pointer" : "cursor-default", className)}
      disabled={!onClick}
      onClick={onClick}
      style={{ height: gui(height), left: gui(left), top: gui(top), width: gui(MEKANISM_TAB_INSET.width) }}
      title={label}
      type="button"
    >
      {Object.hasOwn(TEXTURED_TABS, kind)
        ? <MekanismSprite height={MEKANISM_TAB_INSET.height} name={icon} width={MEKANISM_TAB_INSET.width} />
        : (
            <>
              <MekanismSprite
                height={height}
                name={side === "left" ? "holder_left" : "holder_right"}
                tint={tint}
                width={MEKANISM_TAB_INSET.width}
              />
              <MekanismSprite
                className="absolute"
                height={MEKANISM_TAB_INSET.buttonSize}
                left={buttonLeft}
                name="button"
                top={MEKANISM_TAB_INSET.buttonTop}
                width={MEKANISM_TAB_INSET.buttonSize}
              />
              <MekanismSprite
                className="absolute"
                height={MEKANISM_TAB_INSET.buttonSize}
                left={buttonLeft}
                name={icon}
                top={MEKANISM_TAB_INSET.buttonTop}
                width={MEKANISM_TAB_INSET.buttonSize}
              />
            </>
          )}
      {text === undefined
        ? null
        : (
            <span
              className="absolute text-center font-mc mc-text text-mc-mekanism-title"
              style={{ left: 0, top: gui(24), width: gui(MEKANISM_TAB_INSET.width) }}
            >
              {text}
            </span>
          )}
    </button>
  );
}

function tabIcon(kind: MekanismTabKind, side: "left" | "right", mode?: string): MekanismSpriteName {
  switch (kind) {
    case "boiler":
    case "matrix": {
      return "button/stats";
    }
    case "config": {
      return "button/configuration";
    }
    case "edit": {
      return `container_edit_mode/${mode ?? "both"}` as MekanismSpriteName;
    }
    case "energy": {
      return "tab/energy_info";
    }
    case "heat": {
      return "tab/heat_info_k";
    }
    case "redstone": {
      return `redstone_control/${mode ?? "disabled"}` as MekanismSpriteName;
    }
    case "security": {
      return `security/${mode ?? "public"}` as MekanismSpriteName;
    }
    case "sorting": {
      return "button/sorting";
    }
    case "transporter": {
      return "button/transporter_config";
    }
    case "upgrade": {
      return "button/upgrade";
    }
    case "visuals": {
      return "button/visuals";
    }
    default: {
      return `tab/warning_info_${side}` as MekanismSpriteName;
    }
  }
}
