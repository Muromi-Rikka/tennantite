import { cn } from "@verdigris/ui";

import type {
  MekanismEditMode,
  MekanismRedstoneMode,
  MekanismSecurityMode,
  MekanismTabKind,
} from "../mekanism-types";
import { MEKANISM_TAB_POSITIONS } from "../mekanism-metrics";
import { MekanismTab } from "../mekanism-tab/index";

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
