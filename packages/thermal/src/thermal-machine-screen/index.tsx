import type { ScreenSlot } from "@tennantite/ui";
import type { ReactNode } from "react";
import { ModProgress } from "@tennantite/mods-core";
import { gui, padSlots, PlayerInventory, ScreenItemSlot } from "@tennantite/ui";
import type { ThermalMachineKey, ThermalMachineLayout } from "../thermal-machine-layout";
import { ThermalEnergyGauge } from "../thermal-energy-gauge/index";
import {
  THERMAL_MACHINES,

} from "../thermal-machine-layout";
import {
  THERMAL_AUGMENT_PANEL,
  THERMAL_AUGMENT_TAB,
  THERMAL_GUI,
} from "../thermal-metrics";
import { ThermalSprite } from "../thermal-sprite/index";

export interface ThermalMachineScreenProps {
  /**
   * 强化槽物品（可见数量 = 数组长度，上限 9）
   */
  augments?: ScreenSlot[];
  /**
   * 右侧强化面板展开（受控；默认收起）
   */
  augmentsOpen?: boolean;
  className?: string;
  /**
   * 能量状态（amount/capacity，驱动左侧竖向能量表）
   */
  energy?: { amount: number; capacity: number };
  input?: ScreenSlot;
  /**
   * 机器布局 key（`THERMAL_MACHINES` 数据表）
   */
  machine: ThermalMachineKey;
  /**
   * 强化面板开合回调
   */
  onAugmentsToggle?: () => void;
  onSlotClick?: (role: string, item: ScreenSlot) => void;
  output?: ScreenSlot;
  /**
   * 玩家快捷栏（背景已烘焙槽框）
   */
  playerHotbar?: ScreenSlot[];
  /**
   * 玩家背包主格子（背景已烘焙槽框）
   */
  playerItems?: ScreenSlot[];
  playerName?: ReactNode;
  /**
   * 处理进度 0..1（进度箭头，左→右）
   */
  progress?: number;
  /**
   * 处理速度 0..1（火焰，自下而上）
   */
  speed?: number;
  title?: ReactNode;
}

/**
 * Thermal 机器屏基座：按 `THERMAL_MACHINES` 数据表渲染背景、能量表、
 * 槽位、进度箭头、速度火焰与玩家背包，右侧强化面板可展开
 * （视觉复刻上游 AugmentPanel，数据注入、无游戏逻辑）。
 */
export function ThermalMachineScreen({
  augments = [],
  augmentsOpen = false,
  className,
  energy,
  input,
  machine,
  onAugmentsToggle,
  onSlotClick,
  output,
  playerHotbar = [],
  playerItems = [],
  playerName = "玩家",
  progress = 0,
  speed = 0,
  title,
}: ThermalMachineScreenProps) {
  const layout: ThermalMachineLayout = THERMAL_MACHINES[machine];
  const visibleAugments = Math.min(augments.length, THERMAL_AUGMENT_PANEL.slots.count);
  return (
    <div className={className} style={{ height: gui(THERMAL_GUI.height), position: "relative", width: gui(THERMAL_GUI.width) }}>
      <ThermalSprite crop={{ height: THERMAL_GUI.height, width: THERMAL_GUI.width, x: 0, y: 0 }} name={layout.background} />
      <span
        className="absolute font-mc mc-text text-mc-thermal-text"
        style={{ left: 0, right: 0, textAlign: "center", top: gui(6) }}
      >
        {title ?? layout.title}
      </span>
      {playerName
        ? (
            <span
              className="absolute font-mc mc-text text-mc-thermal-text"
              style={{ left: gui(8), top: gui(73) }}
            >
              {playerName}
            </span>
          )
        : null}
      {layout.energy
        ? (
            <ThermalEnergyGauge
              height={layout.energy.height}
              label="能量"
              left={layout.energy.left}
              max={energy?.capacity}
              top={layout.energy.top}
              value={energy?.amount}
              width={layout.energy.width}
            />
          )
        : null}
      <ScreenItemSlot
        item={input}
        label={layout.input.label}
        left={layout.input.left}
        onActivate={onSlotClick ? () => onSlotClick(layout.input.label, input) : undefined}
        size={layout.input.size}
        top={layout.input.top}
      />
      <ScreenItemSlot
        item={output}
        label={layout.output.label}
        left={layout.output.left}
        onActivate={onSlotClick ? () => onSlotClick(layout.output.label, output) : undefined}
        size={layout.output.size}
        top={layout.output.top}
      />
      {layout.progress
        ? (
            <>
              <ThermalSprite
                crop={layout.progress.trackCrop}
                height={layout.progress.height}
                left={layout.progress.left}
                name="elements/progress_arrow_right"
                top={layout.progress.top}
                width={layout.progress.width}
              />
              <ModProgress
                direction="right"
                fill={(
                  <ThermalSprite
                    crop={layout.progress.fillCrop}
                    height={layout.progress.height}
                    name="elements/progress_arrow_right"
                    width={layout.progress.width}
                  />
                )}
                height={layout.progress.height}
                label="处理进度"
                left={layout.progress.left}
                progress={progress}
                top={layout.progress.top}
                width={layout.progress.width}
              />
            </>
          )
        : null}
      {layout.speed
        ? (
            <>
              <ThermalSprite
                crop={layout.speed.trackCrop}
                height={layout.speed.height}
                left={layout.speed.left}
                name="elements/scale_flame"
                top={layout.speed.top}
                width={layout.speed.width}
              />
              <ModProgress
                direction="up"
                fill={(
                  <ThermalSprite
                    crop={layout.speed.fillCrop}
                    height={layout.speed.height}
                    name="elements/scale_flame"
                    width={layout.speed.width}
                  />
                )}
                height={layout.speed.height}
                label="处理速度"
                left={layout.speed.left}
                progress={speed}
                top={layout.speed.top}
                width={layout.speed.width}
              />
            </>
          )
        : null}
      <PlayerInventory bare hotbarItems={playerHotbar} mainItems={playerItems} />
      <button
        aria-expanded={augmentsOpen}
        aria-label="强化"
        className="absolute cursor-pointer border-0 bg-transparent p-0"
        onClick={onAugmentsToggle}
        style={{ height: gui(THERMAL_AUGMENT_TAB.height), left: gui(THERMAL_AUGMENT_TAB.left), top: gui(THERMAL_AUGMENT_TAB.top), width: gui(THERMAL_AUGMENT_TAB.width) }}
        type="button"
      >
        <ThermalSprite height={16} name="icons/icon_augment" width={16} />
      </button>
      {augmentsOpen
        ? (
            <div
              data-thermal-augment-panel=""
              style={{
                height: gui(THERMAL_AUGMENT_PANEL.height),
                left: gui(THERMAL_AUGMENT_TAB.left),
                position: "absolute",
                top: 0,
                width: gui(THERMAL_AUGMENT_PANEL.width),
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  borderImageOutset: "0",
                  borderImageSlice: "4 fill",
                  borderImageSource: "var(--mc-thermal-elements-panel-right)",
                  borderImageWidth: `${gui(4)} ${gui(4)} ${gui(4)} ${gui(4)}`,
                  borderStyle: "solid",
                  borderWidth: gui(4),
                  boxSizing: "border-box",
                  height: "100%",
                  imageRendering: "pixelated",
                  position: "absolute",
                  width: "100%",
                }}
              />
              <span
                className="absolute font-mc mc-text text-mc-thermal-text"
                style={{ left: gui(THERMAL_AUGMENT_PANEL.titleLeft), top: gui(THERMAL_AUGMENT_PANEL.titleTop) }}
              >
                {THERMAL_AUGMENT_PANEL.title}
              </span>
              <ThermalSprite
                height={THERMAL_AUGMENT_PANEL.icon.size}
                left={THERMAL_AUGMENT_PANEL.icon.left}
                name="icons/icon_augment"
                top={THERMAL_AUGMENT_PANEL.icon.top}
                width={THERMAL_AUGMENT_PANEL.icon.size}
              />
              <div
                aria-hidden="true"
                style={{
                  backgroundColor: THERMAL_AUGMENT_PANEL.borderColor,
                  height: gui(THERMAL_AUGMENT_PANEL.border.height),
                  left: gui(THERMAL_AUGMENT_PANEL.border.left),
                  position: "absolute",
                  top: gui(THERMAL_AUGMENT_PANEL.border.top),
                  width: gui(THERMAL_AUGMENT_PANEL.border.width),
                }}
              />
              {padSlots(augments, visibleAugments).map((item, index) => {
                const augmentLeft = THERMAL_AUGMENT_PANEL.slots.origin.left + (index % 3) * THERMAL_AUGMENT_PANEL.slots.gap;
                const augmentTop = THERMAL_AUGMENT_PANEL.slots.origin.top + Math.floor(index / 3) * THERMAL_AUGMENT_PANEL.slots.gap;
                return (
                  <ScreenItemSlot
                    frame
                    frameClassName="mc-tex-slot"
                    item={item}
                    key={`${augmentLeft}-${augmentTop}`}
                    label={`augment-${index}`}
                    left={augmentLeft}
                    onActivate={onSlotClick ? () => onSlotClick(`augment-${index}`, item) : undefined}
                    top={augmentTop}
                  />
                );
              })}
            </div>
          )
        : null}
    </div>
  );
}
