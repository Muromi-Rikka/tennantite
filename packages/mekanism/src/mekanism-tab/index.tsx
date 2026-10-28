import type { MekanismSpriteName } from "@tennantite/textures";

import { cn, gui } from "@tennantite/ui";

import type { MekanismTabKind } from "../mekanism-types";
import { MekanismSprite } from "../mekanism-sprite/index";

export interface MekanismTabProps {
  className?: string;
  /**
   * 背景染色
   */
  color?: string;
  /**
   * 标签高度（18 / 26 完整精灵 / 35 排序）
   */
  height?: 18 | 26 | 35;
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
   * 标签左上角 y（GUI px）
   */
  top: number;
  /**
   * 标签宽度（固定 26）
   */
  width?: 26;
}

const TAB_COLORS: Partial<Record<MekanismTabKind, string>> = {
  edit: "#366bd0",
  energy: "#59c15f",
  heat: "#ffa160",
  redstone: "#c9071f",
  security: "#ffa160",
};

/**
 * Mekanism 侧边标签：26×18（energy/heat/warning 为 26×26，sorting 为 35×18）。
 */
export function MekanismTab({
  className,
  color,
  height = 18,
  kind,
  label,
  left,
  mode,
  onClick,
  selected = false,
  side,
  top,
  width = 26,
}: MekanismTabProps) {
  const tint = color ?? TAB_COLORS[kind] ?? "#ffffff";
  const icon = tabIcon(kind, side, mode);
  const isWide = height === 26;
  const buttonTop = height === 35 ? 4 : 0;

  return (
    <button
      aria-label={label}
      aria-pressed={selected}
      className={cn("absolute", onClick ? "cursor-pointer" : "cursor-default", className)}
      disabled={!onClick}
      onClick={onClick}
      style={{ height: gui(height), left: gui(left), top: gui(top), width: gui(width) }}
      title={label}
      type="button"
    >
      {isWide
        ? <MekanismSprite height={26} name={icon} width={26} />
        : (
            <>
              <MekanismSprite
                height={height}
                name={side === "left" ? "holder_left" : "holder_right"}
                tint={tint}
                width={width}
              />
              <MekanismSprite
                className="absolute"
                height={18}
                left={4}
                name="button"
                top={buttonTop}
                width={18}
              />
              <MekanismSprite
                className="absolute"
                height={18}
                left={4}
                name={icon}
                top={buttonTop}
                width={18}
              />
            </>
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
