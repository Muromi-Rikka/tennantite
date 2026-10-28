import type { MekanismSpriteName } from "@verdigris/textures";

import type {
  MekanismEditMode,
  MekanismRedstoneMode,
  MekanismSecurityMode,
  MekanismTabKind,
} from "../mekanism-types";
import { cn, gui } from "../../../lib/utils";
import { MEKANISM_TAB_POSITIONS } from "../mekanism-metrics";
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

export interface MekanismElementHolderProps {
  className?: string;
  height: number;
  left: number;
  top: number;
  width: number;
}

export interface MekanismSideHolderProps {
  className?: string;
  /**
   * 侧条高度（GUI px）
   */
  height: number;
  /**
   * 侧条左上角 x（GUI px）
   */
  left: number;
  /**
   * 左侧 / 右侧
   */
  side: "left" | "right";
  /**
   * 默认白色
   */
  tint?: string;
  /**
   * 侧条左上角 y（GUI px）
   */
  top: number;
}

const LEFT_TABS: Set<MekanismTabKind> = new Set(["boiler", "config", "energy", "heat", "matrix", "sorting", "transporter", "visuals"]);
const WIDE_TABS: Set<MekanismTabKind> = new Set(["energy", "heat", "warning"]);

export interface MekanismTabBarProps {
  active?: MekanismTabKind[];
  className?: string;
  editMode?: MekanismEditMode;
  onTabClick?: (kind: MekanismTabKind) => void;
  /**
   * 覆盖单个标签的 y（如能量立方 security=6）
   */
  positions?: Partial<Record<MekanismTabKind, number>>;
  redstone?: MekanismRedstoneMode;
  security?: MekanismSecurityMode;
  tabs: MekanismTabKind[];
  /**
   * warning 标签放哪一侧（默认右侧）
   */
  warningSide?: "left" | "right";
  /**
   * 面板宽度（右标签 x = width）
   */
  width: number;
}

/**
 * 侧边凹槽底板（九宫格 border 1）。
 */
export function MekanismElementHolder({
  className,
  height,
  left,
  top,
  width,
}: MekanismElementHolderProps) {
  return (
    <MekanismSprite
      className={className}
      height={height}
      left={left}
      name="element_holder"
      top={top}
      width={width}
    />
  );
}

/**
 * 装备栏侧条（26×height，九宫格）。
 */
export function MekanismSideHolder({
  className,
  height,
  left,
  side,
  tint = "#ffffff",
  top,
}: MekanismSideHolderProps) {
  return (
    <MekanismSprite
      className={className}
      height={height}
      left={left}
      name={side === "left" ? "holder_left" : "holder_right"}
      tint={tint}
      top={top}
      width={26}
    />
  );
}

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

/**
 * 两侧标签栏：按 `MEKANISM_TAB_POSITIONS` 排布，警告标签按 `warningSide` 只出现一次。
 */
export function MekanismTabBar({
  active = [],
  className,
  editMode = "both",
  onTabClick,
  positions,
  redstone = "disabled",
  security = "public",
  tabs,
  warningSide = "right",
  width,
}: MekanismTabBarProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0", className)}>
      {tabs.map((kind) => {
        if (kind === "warning" && warningSide === "left") {
          return null;
        }
        const side: "left" | "right" = LEFT_TABS.has(kind) ? "left" : "right";
        const y = positions?.[kind] ?? MEKANISM_TAB_POSITIONS[side][kind] ?? 6;
        const isOpen = active.includes(kind);
        return (
          <div className="pointer-events-auto" key={kind}>
            <MekanismTab
              height={WIDE_TABS.has(kind) ? 26 : (kind === "sorting" ? 35 : 18)}
              kind={kind}
              label={kind}
              left={side === "left" ? -26 : width}
              mode={tabMode(kind, security, redstone, editMode)}
              onClick={onTabClick ? () => onTabClick(kind) : undefined}
              selected={isOpen}
              side={side}
              top={y}
            />
          </div>
        );
      })}
      {warningSide === "left" && tabs.includes("warning")
        ? (
            <div className="pointer-events-auto">
              <MekanismTab
                height={26}
                kind="warning"
                label="warning"
                left={-26}
                selected={active.includes("warning")}
                side="left"
                top={positions?.warning ?? MEKANISM_TAB_POSITIONS.left.warning ?? 109}
              />
            </div>
          )
        : null}
    </div>
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

function tabMode(
  kind: MekanismTabKind,
  security: MekanismSecurityMode,
  redstone: MekanismRedstoneMode,
  editMode: MekanismEditMode,
): string | undefined {
  switch (kind) {
    case "edit": {
      return editMode;
    }
    case "redstone": {
      return redstone;
    }
    case "security": {
      return security;
    }
    default: {
      return undefined;
    }
  }
}
