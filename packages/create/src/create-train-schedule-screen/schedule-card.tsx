import { ModIconButton, ModSprite } from "@tennantite/mods-core";
import { createSpriteMeta } from "@tennantite/textures";
import { gui } from "@tennantite/ui";

import type { CreateScheduleEntry } from "./index";
import { CREATE_SCHEDULE_CARD_COLORS, CREATE_SCHEDULE_SPRITES, CREATE_TRAIN_SCHEDULE } from "../create-metrics";
import { ConditionPill } from "./condition-pill";
import { entryHeight } from "./entry-height";

const CARD = CREATE_TRAIN_SCHEDULE.card;
const createMeta = createSpriteMeta;

export interface ScheduleCardProps {
  entry: CreateScheduleEntry;
  index: number;
  left: number;
  onDuplicate?: (id: string) => void;
  onEdit?: (id: string) => void;
  onMoveDown?: (id: string) => void;
  onMoveUp?: (id: string) => void;
  onRemove?: (id: string) => void;
  top: number;
  total: number;
}

/**
 * 时刻表卡片：描边/底色拉伸条 + 左缘路线条 + 指令题头胶囊 + 条件列 + 卡片按钮。
 */
export function ScheduleCard({
  entry,
  index,
  left,
  onDuplicate,
  onEdit,
  onMoveDown,
  onMoveUp,
  onRemove,
  top,
  total,
}: ScheduleCardProps) {
  const cardHeight = entryHeight(entry);
  const headerWidth = Math.min(150, Math.max(100, entry.width ?? 100));
  const columns = entry.conditions ?? [];
  return (
    <div
      className="absolute"
      style={{ height: gui(cardHeight), left: gui(left), top: gui(top), width: gui(CARD.width) }}
    >
      {/* 卡片描边与底色（上游 1px 拉伸条组合，颜色取自 schedule.png 取样） */}
      <div className="absolute" style={{ background: CREATE_SCHEDULE_CARD_COLORS.cardLight, bottom: gui(1), left: gui(1), right: 0, top: 0 }} />
      <div className="absolute" style={{ background: CREATE_SCHEDULE_CARD_COLORS.cardLight, bottom: 0, left: 0, right: gui(1), top: gui(1) }} />
      <div className="absolute" style={{ background: CREATE_SCHEDULE_CARD_COLORS.cardDark, inset: gui(1) }} />
      <div className="absolute" style={{ background: CREATE_SCHEDULE_CARD_COLORS.cardMedium, inset: gui(2) }} />
      <div
        className="absolute"
        style={{
          background: entry.supportsConditions ? CREATE_SCHEDULE_CARD_COLORS.cardLight : CREATE_SCHEDULE_CARD_COLORS.cardMedium,
          height: gui(CARD.header),
          left: gui(2),
          right: gui(2),
          top: gui(2),
        }}
      />
      {/* 左缘车路线条（1px 竖线拉伸） */}
      <div
        className="absolute"
        style={{
          background: CREATE_SCHEDULE_CARD_COLORS.stripLight,
          height: gui(cardHeight + 10),
          left: gui(8),
          top: 0,
          width: gui(3),
        }}
      />
      <ModSprite
        left={4}
        sprite={createMeta.schedule}
        src={entry.supportsConditions ? CREATE_SCHEDULE_SPRITES.stripTravel : CREATE_SCHEDULE_SPRITES.stripAction}
        top={6}
      />
      {entry.supportsConditions
        ? <ModSprite left={4} sprite={createMeta.schedule} src={CREATE_SCHEDULE_SPRITES.stripWait} top={28} />
        : null}
      <ModIconButton
        buttonClassName="bg-transparent"
        height={12}
        icon={<ModSprite sprite={createMeta.schedule} src={CREATE_SCHEDULE_SPRITES.cardRemove} />}
        iconSize={12}
        label={`移除条目-${entry.id}`}
        left={CARD.width - 14}
        onClick={onRemove ? () => onRemove(entry.id) : undefined}
        top={2}
        width={12}
      />
      <ModIconButton
        buttonClassName="bg-transparent"
        height={12}
        icon={<ModSprite sprite={createMeta.schedule} src={CREATE_SCHEDULE_SPRITES.cardDuplicate} />}
        iconSize={12}
        label={`复制条目-${entry.id}`}
        left={CARD.width - 14}
        onClick={onDuplicate ? () => onDuplicate(entry.id) : undefined}
        top={cardHeight - 14}
        width={12}
      />
      {index > 0
        ? (
            <ModIconButton
              buttonClassName="bg-transparent"
              height={12}
              icon={<ModSprite sprite={createMeta.schedule} src={CREATE_SCHEDULE_SPRITES.cardMoveUp} />}
              iconSize={12}
              label={`上移条目-${entry.id}`}
              left={CARD.width}
              onClick={onMoveUp ? () => onMoveUp(entry.id) : undefined}
              top={CARD.header - 14}
              width={12}
            />
          )
        : null}
      {index < total - 1
        ? (
            <ModIconButton
              buttonClassName="bg-transparent"
              height={12}
              icon={<ModSprite sprite={createMeta.schedule} src={CREATE_SCHEDULE_SPRITES.cardMoveDown} />}
              iconSize={12}
              label={`下移条目-${entry.id}`}
              left={CARD.width}
              onClick={onMoveDown ? () => onMoveDown(entry.id) : undefined}
              top={CARD.header}
              width={12}
            />
          )
        : null}
      <button
        aria-label={`编辑指令-${entry.id}`}
        className="absolute block cursor-pointer appearance-none border-0 bg-transparent p-0 text-left"
        onClick={onEdit ? () => onEdit(entry.id) : undefined}
        style={{ height: gui(16), left: gui(26), top: gui(5), width: gui(headerWidth) }}
        type="button"
      >
        {/* 外层已是 <button>：物品不能再带 tooltip（ItemStack 会渲染成嵌套 <button>，SSR 解析会弹栈破坏布局） */}
        <ConditionPill
          condition={{
            icon: entry.icon ? { ...entry.icon, tooltip: undefined } : undefined,
            label: entry.label,
            width: headerWidth,
          }}
        />
      </button>
      {entry.supportsConditions
        ? (
            <div className="absolute" style={{ left: gui(26), top: gui(29) }}>
              <div className="flex" style={{ gap: gui(10) }}>
                {Array.from(columns, (column, columnIndex) => {
                  const columnWidth = Math.max(...column.map(c => Math.max(32, c.width ?? 32)));
                  return (
                    <div key={`column-${columnIndex}`} style={{ width: gui(columnWidth) }}>
                      {Array.from(column, (condition, conditionIndex) => (
                        <div key={`condition-${conditionIndex}`}>
                          <ConditionPill clean={conditionIndex !== 0} condition={condition} />
                        </div>
                      ))}
                      <ModSprite
                        left={(columnWidth - 10) / 2}
                        sprite={createMeta.schedule}
                        src={CREATE_SCHEDULE_SPRITES.conditionAppend}
                        top={column.length * 18}
                      />
                    </div>
                  );
                })}
              </div>
              <ModSprite
                left={columns.reduce((acc, column) => acc + Math.max(...column.map(c => Math.max(32, c.width ?? 32))) + 10, 0) - 3}
                sprite={createMeta.schedule}
                src={CREATE_SCHEDULE_SPRITES.conditionNew}
                top={0}
              />
            </div>
          )
        : null}
    </div>
  );
}
