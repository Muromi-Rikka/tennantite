import type { ReactNode } from "react";

import { GuiSprite } from "../../../containers/gui-sprite/index";
import { cn, gui } from "../../../lib/utils";
import { MenuBackground } from "../menu-background";

export interface StatisticRow {
  icon?: string;
  label: string;
  value: number | string;
}

export interface StatisticsGroup {
  name: string;
  rows: StatisticRow[];
}

export interface StatisticsScreenProps {
  className?: string;
  groups?: StatisticsGroup[];
  title?: ReactNode;
}

/**
 * 统计信息界面（规格 §6.3）：320×240 + 18×18 图标 + 20px 行。
 */
export function StatisticsScreen({
  className,
  groups = [],
  title = "统计信息",
}: StatisticsScreenProps) {
  return (
    <MenuBackground
      className={cn("overflow-hidden", className)}
      style={{ height: gui(240), width: gui(320) }}
    >
      <div className="absolute font-mc mc-text text-mc-text-main mc-text-shadow" style={{ left: gui(8), top: gui(8) }}>
        {title}
      </div>
      <GuiSprite
        className="absolute"
        height={18}
        name="sprites/statistics/header.png"
        style={{ left: gui(8), top: gui(38) }}
        width={18}
      />
      <div className="absolute overflow-auto" style={{ height: gui(172), left: gui(4), top: gui(60), width: gui(312) }}>
        {groups.map(group => (
          <div key={group.name}>
            <div className="font-mc mc-text text-mc-text-dim">{group.name}</div>
            {group.rows.map(row => (
              <div
                className="flex h-20 items-center gap-2 font-mc mc-text text-mc-text-main"
                key={row.label}
              >
                {row.icon
                  ? <GuiSprite height={18} name={row.icon as never} width={18} />
                  : null}
                <span className="flex-1">{row.label}</span>
                <span>{row.value}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <GuiSprite
        className="absolute"
        height={15}
        name="sprites/widget/scroller.png"
        style={{ left: gui(306), top: gui(60) }}
        width={12}
      />
    </MenuBackground>
  );
}
