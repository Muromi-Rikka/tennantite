import type { InventoryItem, ScreenSlot } from "@tennantite/ui";

import { ModIconButton, ModScissorList, ModSprite } from "@tennantite/mods-core";
import { createSpriteMeta } from "@tennantite/textures";
import { gui } from "@tennantite/ui";

import {
  CREATE_ATLAS,
  CREATE_ICONS,
  CREATE_SCHEDULE_CARD_COLORS,
  CREATE_SCHEDULE_SPRITES,
  CREATE_TRAIN_SCHEDULE,
} from "../create-metrics";
import { CreateWindow } from "../create-window/index";
import { entryHeight } from "./entry-height";
import { ScheduleCard } from "./schedule-card";
import { ScheduleEditor } from "./schedule-editor";

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
  return (
    <CreateWindow
      background={<ModSprite left={0} sprite={createMeta[CREATE_ATLAS.schedule.atlas]} src={CREATE_ATLAS.schedule} top={0} />}
      className={className}
      height={layout.height}
      player={false}
      title={title}
      titleAlign="center"
      titleClassName="mc-text-shadow"
      titleColor="#505050"
      titleLeft={0}
      titleTop={layout.title.top}
      titleWidth={layout.width - 8}
      width={layout.width}
    >
      <ModScissorList
        height={SCISSOR.height}
        left={SCISSOR.left}
        scroll={scroll}
        top={SCISSOR.top}
        width={SCISSOR.width}
      >
        {/* 竖向路线条（静止，不随卡片滚动） */}
        <div
          className="absolute"
          style={{
            background: CREATE_SCHEDULE_CARD_COLORS.stripDark,
            height: gui(SCISSOR.height),
            left: gui(layout.strip.left),
            top: gui(SCISSOR.top + scroll),
            width: gui(3),
          }}
        />
        {pointerTop === undefined
          ? null
          : (
              <ModSprite
                left={layout.pointerLeft}
                sprite={createMeta.schedule}
                src={CREATE_SCHEDULE_SPRITES.pointer}
                top={pointerTop + scroll}
              />
            )}
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
      </ModScissorList>
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
      {editor ? <ScheduleEditor editor={editor} player={player} /> : null}
    </CreateWindow>
  );
}
