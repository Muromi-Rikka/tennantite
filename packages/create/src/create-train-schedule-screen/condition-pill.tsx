import { ModSprite } from "@tennantite/mods-core";
import { createSpriteMeta } from "@tennantite/textures";
import { gui, ScreenItemSlot } from "@tennantite/ui";

import type { CreateScheduleCondition } from "./index";
import { CREATE_SCHEDULE_CARD_COLORS, CREATE_SCHEDULE_SPRITES } from "../create-metrics";

export interface ConditionPillProps {
  /**
   * 列内非首行时为「干净」左缘（不叠加竖向连接条）
   */
  clean?: boolean;
  condition: CreateScheduleCondition;
}

/**
 * 时刻表条件胶囊：左/右缘贴图 + 中间拉伸底色 + 可选物品图标与文字。
 */
export function ConditionPill({ clean = false, condition }: ConditionPillProps) {
  const width = Math.max(32, condition.width ?? 32);
  return (
    <div className="relative" style={{ height: gui(16), width: gui(width) }}>
      <div
        className="absolute"
        style={{
          background: CREATE_SCHEDULE_CARD_COLORS.cardDark,
          bottom: 0,
          left: gui(clean ? 2 : 3),
          right: gui(2),
          top: 0,
        }}
      />
      <ModSprite
        left={clean ? 0 : -3}
        sprite={createSpriteMeta.schedule}
        src={clean ? CREATE_SCHEDULE_SPRITES.conditionLeftClean : CREATE_SCHEDULE_SPRITES.conditionLeft}
        top={0}
      />
      <ModSprite left={width - 2} sprite={createSpriteMeta.schedule} src={CREATE_SCHEDULE_SPRITES.conditionRight} top={0} />
      {condition.icon
        ? (
            <>
              <ModSprite
                left={clean ? 3 : 6}
                sprite={createSpriteMeta.schedule}
                src={CREATE_SCHEDULE_SPRITES.conditionItem}
                top={0}
              />
              <div className="absolute" style={{ left: gui(clean ? 4 : 7), top: 0 }}>
                <ScreenItemSlot frame={false} item={condition.icon} label={`condition-item-${condition.label}`} left={0} size={16} top={0} />
              </div>
            </>
          )
        : null}
      <div
        className="absolute font-mc mc-text mc-text-shadow"
        style={{ color: "#f2f2ee", left: gui(condition.icon ? 28 : 8), top: gui(4) }}
      >
        {condition.label}
      </div>
    </div>
  );
}
