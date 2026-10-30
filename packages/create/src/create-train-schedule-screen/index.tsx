import type { InventoryItem, ScreenSlot } from "@tennantite/ui";

import { ModIconButton, ModSprite } from "@tennantite/mods-core";
import { createSpriteMeta } from "@tennantite/textures";
import { cn, gui, PlayerInventory, ScreenItemSlot } from "@tennantite/ui";

import {
  CREATE_ATLAS,
  CREATE_ICONS,
  CREATE_SCHEDULE_CARD_COLORS,
  CREATE_SCHEDULE_SPRITES,
  CREATE_TRAIN_SCHEDULE,
} from "../create-metrics";

const createMeta = createSpriteMeta;

/**
 * 时刻表卡片条件：一列内为"且"关系（纵向堆叠），列间为"或"关系（横向排列）。
 */
export interface CreateScheduleCondition {
  /**
   * 物品图标（结构空洞物品，如时钟）
   */
  icon?: ScreenSlot;
  /**
   * 条件摘要文字
   */
  label: string;
  /**
   * 条件胶囊宽（上游按文字宽度动态测量，此处由数据注入；下限 32）
   */
  width?: number;
}

export interface CreateScheduleEntry {
  /**
   * 指令条件列（列间"或"）。仅 supportsConditions 时渲染。
   */
  conditions?: CreateScheduleCondition[][];
  icon?: ScreenSlot;
  id: string;
  /**
   * 指令摘要文字（如目的地名）
   */
  label: string;
  supportsConditions?: boolean;
  /**
   * 指令胶囊宽（上游按文字宽度动态测量，下限 100、上限 150）
   */
  width?: number;
}

export interface CreateTrainScheduleScreenProps {
  className?: string;
  /**
   * 循环模式（左下刷新按钮按下态）
   */
  cyclic?: boolean;
  /**
   * 编辑浮层（上游点选卡片进入；schedule_2 编辑板 + 玩家背包）
   */
  editor?: {
    allowDelete?: boolean;
    kind: "condition" | "instruction";
    onConfirm?: () => void;
    onDelete?: () => void;
    /**
     * 目标槽物品（指令/条件需要物品时 1..2 格）
     */
    slots?: ScreenSlot[];
    /**
     * 选择条文字（指令/条件类型）
     */
    typeLabel: string;
  };
  entries: CreateScheduleEntry[];
  onCyclicChange?: () => void;
  onResetProgress?: () => void;
  onSkip?: () => void;
  player?: {
    hotbarItems?: (InventoryItem | null | undefined)[];
    mainItems?: (InventoryItem | null | undefined)[];
  };
  /**
   * 已保存进度（指针停在对应卡片处）
   */
  savedProgress?: number;
  /**
   * 纵向滚动偏移（GUI px，纯展示）
   */
  scroll?: number;
  title?: string;
}

const CARD = CREATE_TRAIN_SCHEDULE.card;
const SCISSOR = CREATE_TRAIN_SCHEDULE.scissor;

/**
 * Create 列车时刻表界面（`ScheduleScreen` 视觉复刻）：SCHEDULE 整版背板 +
 * 竖向路线条与卡片列（指令题头胶囊 + "且/或"条件列 + 移除/复制/上下移按钮）+
 * 左下循环/进度重置/跳过与确认按钮 + 进度指针 + 编辑浮层（schedule_2 编辑板、
 * 目标槽、选择条与玩家背包）。数据注入、无时刻表编辑逻辑；滚动为纯展示偏移；
 * 上游右侧的手持时刻表 3D 物品渲染省略。
 */
export function CreateTrainScheduleScreen({
  className,
  cyclic = false,
  editor,
  entries,
  onCyclicChange,
  onResetProgress,
  onSkip,
  player,
  savedProgress = 0,
  scroll = 0,
  title = "列车时刻表",
}: CreateTrainScheduleScreenProps) {
  const layout = CREATE_TRAIN_SCHEDULE;
  const icons = CREATE_ICONS;
  // 卡片纵向排布（间隔 10px 虚线条），计算指针停靠窗口坐标（含滚动、clamp 18..170）
  let pointerTop: number | undefined;
  let yOffset = CARD.top;
  for (const [index, entry] of entries.entries()) {
    if (index === savedProgress && entries.length > 0) {
      pointerTop = Math.min(Math.max(yOffset + 4 - scroll, 18), 170);
    }
    yOffset += entryHeight(entry);
    if (index + 1 < entries.length) {
      yOffset += 10;
    }
  }
  const newCardTop = yOffset + (entries.length > 0 ? 9 : 0);
  const isShowEditor = editor !== undefined;
  return (
    <div
      className={cn("mc-create-window relative inline-block", className)}
      style={{ height: gui(layout.height), width: gui(layout.width) }}
    >
      <ModSprite left={0} sprite={createMeta[CREATE_ATLAS.schedule.atlas]} src={CREATE_ATLAS.schedule} top={0} />
      <div
        className="absolute text-center font-mc mc-text mc-text-shadow"
        style={{ color: "#505050", left: 0, top: gui(layout.title.top), width: gui(layout.width - 8) }}
      >
        {title}
      </div>
      <div
        className="absolute overflow-hidden"
        style={{ height: gui(SCISSOR.height), left: gui(SCISSOR.left), top: gui(SCISSOR.top), width: gui(SCISSOR.width) }}
      >
        {/* 竖向路线条（静止，不随卡片滚动） */}
        <div
          className="absolute"
          style={{
            background: CREATE_SCHEDULE_CARD_COLORS.stripDark,
            height: gui(SCISSOR.height),
            left: gui(layout.strip.left - SCISSOR.left),
            top: 0,
            width: gui(3),
          }}
        />
        {pointerTop === undefined
          ? null
          : (
              <ModSprite
                left={layout.pointerLeft - SCISSOR.left}
                sprite={createMeta.schedule}
                src={CREATE_SCHEDULE_SPRITES.pointer}
                top={pointerTop - SCISSOR.top}
              />
            )}
        {/* 滚动内容：子元素使用窗口坐标 − 16（视口原点补偿） */}
        <div className="absolute" style={{ left: gui(-SCISSOR.left), top: gui(-SCISSOR.top - scroll) }}>
          {entries.map((entry, index) => {
            let cardTop = CARD.top;
            for (const prev of entries.slice(0, index)) {
              cardTop += entryHeight(prev) + 10;
            }
            return (
              <ScheduleCard
                entry={entry}
                index={index}
                key={entry.id}
                left={CARD.left}
                top={cardTop}
                total={entries.length}
              />
            );
          })}
          <ModSprite
            left={layout.strip.left - 4}
            sprite={createMeta.schedule}
            src={CREATE_SCHEDULE_SPRITES.stripEnd}
            top={newCardTop}
          />
          <ModSprite
            left={CARD.left + 18}
            sprite={createMeta.schedule}
            src={CREATE_SCHEDULE_SPRITES.cardNew}
            top={newCardTop}
          />
        </div>
      </div>
      <ModIconButton
        buttonClassName="bg-transparent"
        height={18}
        icon={<ModSprite sprite={createMeta.icons} src={{ height: 16, width: 16, x: icons.confirm.x, y: icons.confirm.y }} />}
        label="确认"
        left={layout.buttons.confirm.left}
        top={layout.buttons.confirm.top}
        width={18}
      />
      <ModIconButton
        buttonClassName="bg-transparent"
        height={18}
        icon={<ModSprite sprite={createMeta.icons} src={{ height: 16, width: 16, x: icons.refresh.x, y: icons.refresh.y }} />}
        label="循环"
        left={layout.buttons.cyclic.left}
        onClick={onCyclicChange}
        pressed={cyclic}
        top={layout.buttons.cyclic.top}
        width={18}
      />
      <ModIconButton
        buttonClassName="bg-transparent"
        height={18}
        icon={<ModSprite sprite={createMeta.icons} src={{ height: 16, width: 16, x: icons.priorityVeryHigh.x, y: icons.priorityVeryHigh.y }} />}
        label="进度重置"
        left={layout.buttons.reset.left}
        onClick={onResetProgress}
        top={layout.buttons.reset.top}
        width={18}
      />
      <ModIconButton
        buttonClassName="bg-transparent"
        height={18}
        icon={<ModSprite sprite={createMeta.icons} src={{ height: 16, width: 16, x: icons.priorityLow.x, y: icons.priorityLow.y }} />}
        label="跳过当前"
        left={layout.buttons.skip.left}
        onClick={onSkip}
        top={layout.buttons.skip.top}
        width={18}
      />
      {isShowEditor && editor
        ? (
            <>
              <div
                aria-hidden="true"
                className="absolute"
                style={{ background: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5))", bottom: 0, left: 0, right: 0, top: 0, zIndex: 200 }}
              />
              <div
                className="absolute"
                style={{ left: gui(layout.editor.panel.left), top: gui(layout.editor.panel.top), zIndex: 201 }}
              >
                <ModSprite
                  left={0}
                  sprite={createMeta[CREATE_ATLAS.scheduleEditor.atlas]}
                  src={CREATE_ATLAS.scheduleEditor}
                  top={0}
                />
              </div>
              <div
                className="absolute text-center font-mc mc-text mc-text-shadow"
                style={{ color: "#505050", left: 0, top: gui(layout.editor.title.top), width: gui(layout.width - 8), zIndex: 202 }}
              >
                {editor.kind === "condition" ? "编辑条件" : "编辑指令"}
              </div>
              {editor.slots?.length
                ? Array.from(editor.slots, (slot, index) => (
                    <div
                      className="absolute"
                      key={`editor-slot-${index}`}
                      style={{
                        left: gui(layout.editor.slots.left + index * layout.editor.slots.step),
                        top: gui(layout.editor.slots.top),
                        zIndex: 202,
                      }}
                    >
                      <ModSprite
                        left={0}
                        sprite={createMeta[CREATE_ATLAS.scheduleEditorAdditionalSlot.atlas]}
                        src={CREATE_ATLAS.scheduleEditorAdditionalSlot}
                        top={0}
                      />
                      {slot
                        ? (
                            <div
                              className="absolute"
                              style={{ left: gui(1), top: gui(1), zIndex: 203 }}
                            >
                              <ScreenItemSlot frame={false} item={slot} label={`editor-slot-${index}`} left={0} size={16} top={0} />
                            </div>
                          )
                        : null}
                    </div>
                  ))
                : (
                    <div
                      className="absolute"
                      style={{ left: gui(layout.editor.slots.left), top: gui(layout.editor.slots.top), zIndex: 202 }}
                    >
                      <ModSprite
                        left={0}
                        sprite={createMeta[CREATE_ATLAS.scheduleEditorInactiveSlot.atlas]}
                        src={CREATE_ATLAS.scheduleEditorInactiveSlot}
                        top={0}
                      />
                    </div>
                  )}
              <div
                className="absolute text-center font-mc mc-text mc-text-shadow"
                style={{
                  color: "#4a2d31",
                  height: gui(16),
                  left: gui(layout.editor.select.left),
                  lineHeight: gui(16),
                  top: gui(layout.editor.select.top),
                  width: gui(layout.editor.select.width),
                  zIndex: 202,
                }}
              >
                {editor.typeLabel}
              </div>
              {editor.allowDelete
                ? (
                    <div className="absolute" style={{ left: gui(layout.editor.delete.left), top: gui(layout.editor.delete.top), zIndex: 202 }}>
                      <ModIconButton
                        buttonClassName="bg-transparent"
                        height={18}
                        icon={<ModSprite sprite={createMeta.icons} src={{ height: 16, width: 16, x: icons.trash.x, y: icons.trash.y }} />}
                        label="删除"
                        onClick={editor.onDelete}
                        width={18}
                      />
                    </div>
                  )
                : null}
              <div className="absolute" style={{ left: gui(layout.editor.confirm.left), top: gui(layout.editor.confirm.top), zIndex: 202 }}>
                <ModIconButton
                  buttonClassName="bg-transparent"
                  height={18}
                  icon={<ModSprite sprite={createMeta.icons} src={{ height: 16, width: 16, x: icons.confirm.x, y: icons.confirm.y }} />}
                  label="确认编辑"
                  onClick={editor.onConfirm}
                  width={18}
                />
              </div>
              <div
                className="absolute"
                style={{ left: gui(layout.editor.player.left + 8), top: gui(layout.editor.player.top + 18), zIndex: 202 }}
              >
                <PlayerInventory
                  hotbarItems={player?.hotbarItems}
                  hotbarY={58}
                  mainItems={player?.mainItems}
                  y={0}
                />
              </div>
            </>
          )
        : null}
    </div>
  );
}

function ConditionPill({ clean = false, condition }: { clean?: boolean; condition: CreateScheduleCondition }) {
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
        sprite={createMeta.schedule}
        src={clean ? CREATE_SCHEDULE_SPRITES.conditionLeftClean : CREATE_SCHEDULE_SPRITES.conditionLeft}
        top={0}
      />
      <ModSprite left={width - 2} sprite={createMeta.schedule} src={CREATE_SCHEDULE_SPRITES.conditionRight} top={0} />
      {condition.icon
        ? (
            <>
              <ModSprite
                left={clean ? 3 : 6}
                sprite={createMeta.schedule}
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

function entryHeight(entry: CreateScheduleEntry): number {
  const maxRows = (entry.conditions ?? []).reduce((max, list) => Math.max(max, list.length), 0);
  return CARD.header + (entry.supportsConditions ? 24 + maxRows * 18 : 4);
}

function ScheduleCard({
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
}: {
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
}) {
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
      <span
        aria-label={`编辑指令-${entry.id}`}
        className="absolute block cursor-pointer bg-transparent p-0"
        onClick={onEdit ? () => onEdit(entry.id) : undefined}
        onKeyDown={(event) => {
          if (!(onEdit && (event.key === "Enter" || event.key === " "))) {
            return;
          }

          event.preventDefault();
          onEdit(entry.id);
        }}
        role="button"
        style={{ height: gui(16), left: gui(26), top: gui(5), width: gui(headerWidth) }}
        tabIndex={0}
      >
        <ConditionPill condition={{ icon: entry.icon, label: entry.label, width: headerWidth }} />
      </span>
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
