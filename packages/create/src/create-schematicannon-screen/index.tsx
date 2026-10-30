import type { InventoryItem, ScreenSlot } from "@tennantite/ui";

import { ModIconButton, ModProgress, ModSprite } from "@tennantite/mods-core";
import { createSpriteMeta } from "@tennantite/textures";
import { gui, ScreenItemSlot } from "@tennantite/ui";

import { CREATE_ATLAS, CREATE_ICONS, CREATE_SCHEMATICANNON } from "../create-metrics";
import { CreateWindow } from "../create-window/index";
import { Indicator } from "./indicator";
import { SettingsRow } from "./settings-row";

export interface CreateSchematicannonScreenProps {
  /**
   * 清单打印进度 0..1（右侧 16×14 打印贴图，左→右生长）
   */
  checklistProgress?: number;
  className?: string;
  /**
   * 燃料余量 0..1（燃料条左→右生长；creative 时整条绘制创作形贴图）
   */
  fuel?: number;
  /**
   * 创作供应（Creative Crate）燃料贴图变体
   */
  fuelCreative?: boolean;
  onConfirm?: () => void;
  onPause?: () => void;
  onPlay?: () => void;
  onReplaceModeChange?: (mode: number) => void;
  onReset?: () => void;
  onToggleSettings?: () => void;
  onToggleSkipBlockEntities?: () => void;
  onToggleSkipMissing?: () => void;
  player?: {
    hotbarItems?: (InventoryItem | null | undefined)[];
    mainItems?: (InventoryItem | null | undefined)[];
  };
  /**
   * 打印进度 0..1（114×16 贴图，左→右生长）
   */
  progress?: number;
  /**
   * 替换等级 0..3（dontReplace / solid / any / empty）
   */
  replaceMode?: number;
  /**
   * 展开放置设置行（4 枚替换等级 + 跳过缺失/方块实体）
   */
  showSettings?: boolean;
  /**
   * 跳过方块实体按钮（按下态绿色）
   */
  skipBlockEntities?: boolean;
  /**
   * 跳过缺失材料按钮（按下态绿色）
   */
  skipMissing?: boolean;
  /**
   * 顶部 5 槽：蓝图产物 / 火药 / 清单产物 / 清单书 / 蓝图
   */
  slots?: {
    blueprintOutput?: ScreenSlot;
    gunpowder?: ScreenSlot;
    listOutput?: ScreenSlot;
    listPrinter?: ScreenSlot;
    schematic?: ScreenSlot;
  };
  /**
   * 运行状态：按钮可用性 + 三枚状态指示条
   */
  state?: "paused" | "running" | "stopped";
  /**
   * 状态文字（中线 x=103、y=53 处，浅蓝）
   */
  statusText?: string;
  title?: string;
}

/**
 * Create 蓝图炮界面（`SchematicannonScreen` 视觉复刻）：上下两段背板
 * （schematics_2 atlas）+ 顶部标题板 + 5 槽位 + 打印/清单/燃料三条进度 +
 * 播放/暂停/重置与状态指示条 + 可展开的放置设置行 + 玩家背包。
 * 数据注入、无打印逻辑；上游右侧的蓝图炮 3D 物品渲染省略。
 */
export function CreateSchematicannonScreen({
  checklistProgress = 0,
  className,
  fuel = 0,
  fuelCreative = false,
  onConfirm,
  onPause,
  onPlay,
  onReplaceModeChange,
  onReset,
  onToggleSettings,
  onToggleSkipBlockEntities,
  onToggleSkipMissing,
  player,
  progress = 0,
  replaceMode = 0,
  showSettings = false,
  skipBlockEntities = false,
  skipMissing = false,
  slots,
  state = "stopped",
  statusText,
  title = "蓝图炮",
}: CreateSchematicannonScreenProps) {
  const layout = CREATE_SCHEMATICANNON;
  const top = CREATE_ATLAS.schematicannonTop;
  const bottom = CREATE_ATLAS.schematicannonBottom;
  const progressRegion = CREATE_ATLAS.schematicannonProgress;
  const checklistRegion = CREATE_ATLAS.schematicannonChecklistProgress;
  const fuelRegion = CREATE_ATLAS.schematicannonFuel;
  const fuelCreativeRegion = CREATE_ATLAS.schematicannonFuelCreative;
  const icons = CREATE_ICONS;
  const isRunning = state === "running";
  const isPaused = state === "paused";
  return (
    <CreateWindow
      background={(
        <>
          <ModSprite left={0} sprite={createSpriteMeta[top.atlas]} src={top} top={0} />
          <ModSprite left={0} sprite={createSpriteMeta[bottom.atlas]} src={bottom} top={top.height} />
          <ModSprite
            left={0}
            sprite={createSpriteMeta[CREATE_ATLAS.schematicTitle.atlas]}
            src={CREATE_ATLAS.schematicTitle}
            top={-2}
          />
        </>
      )}
      className={className}
      height={layout.height}
      player={{
        hotbarItems: player?.hotbarItems,
        hotbarY: layout.player.hotbarY,
        mainItems: player?.mainItems,
        x: layout.player.x,
        y: layout.player.y,
      }}
      title={title}
      titleAlign="center"
      titleClassName="mc-text-shadow"
      titleColor="#505050"
      titleLeft={0}
      titleTop={layout.title.top}
      titleWidth={layout.width}
      width={layout.width}
    >
      {slots
        ? (
            <>
              <ScreenItemSlot
                item={slots.schematic}
                label="schematic"
                left={layout.slots.schematic.left}
                top={layout.slots.schematic.top}
              />
              <ScreenItemSlot
                item={slots.blueprintOutput}
                label="blueprint-output"
                left={layout.slots.blueprintOutput.left}
                top={layout.slots.blueprintOutput.top}
              />
              <ScreenItemSlot
                item={slots.listPrinter}
                label="list-printer"
                left={layout.slots.listPrinter.left}
                top={layout.slots.listPrinter.top}
              />
              <ScreenItemSlot
                item={slots.listOutput}
                label="list-output"
                left={layout.slots.listOutput.left}
                top={layout.slots.listOutput.top}
              />
              <ScreenItemSlot
                item={slots.gunpowder}
                label="gunpowder"
                left={layout.slots.gunpowder.left}
                top={layout.slots.gunpowder.top}
              />
            </>
          )
        : null}
      {slots?.schematic
        ? (
            <ModSprite
              left={layout.highlight.left}
              sprite={createSpriteMeta[CREATE_ATLAS.schematicannonHighlight.atlas]}
              src={CREATE_ATLAS.schematicannonHighlight}
              top={layout.highlight.top}
            />
          )
        : null}
      <ModProgress
        direction="right"
        fill={<ModSprite sprite={createSpriteMeta[progressRegion.atlas]} src={progressRegion} />}
        height={progressRegion.height}
        label="progress"
        left={layout.progress.left}
        progress={progress}
        top={layout.progress.top}
        width={progressRegion.width}
      />
      <ModProgress
        direction="right"
        fill={<ModSprite sprite={createSpriteMeta[checklistRegion.atlas]} src={checklistRegion} />}
        height={checklistRegion.height}
        label="checklist-progress"
        left={layout.checklistProgress.left}
        progress={checklistProgress}
        top={layout.checklistProgress.top}
        width={checklistRegion.width}
      />
      {fuelCreative
        ? (
            <ModSprite
              left={layout.fuel.left}
              sprite={createSpriteMeta[fuelCreativeRegion.atlas]}
              src={fuelCreativeRegion}
              top={layout.fuel.top}
            />
          )
        : (
            <ModProgress
              direction="right"
              fill={<ModSprite sprite={createSpriteMeta[fuelRegion.atlas]} src={fuelRegion} />}
              height={fuelRegion.height}
              label="fuel"
              left={layout.fuel.left}
              progress={fuel}
              top={layout.fuel.top}
              width={fuelRegion.width}
            />
          )}
      {statusText
        ? (
            <div
              className="absolute text-center font-mc mc-text"
              style={{
                color: "#ddeeff",
                left: 0,
                top: gui(layout.status.top),
                width: gui(layout.status.centerX * 2),
              }}
            >
              {statusText}
            </div>
          )
        : null}
      <Indicator
        left={layout.indicators.play.left}
        state={isRunning ? "green" : "off"}
        top={layout.indicators.play.top}
      />
      <Indicator
        left={layout.indicators.pause.left}
        state={isPaused ? "yellow" : "off"}
        top={layout.indicators.pause.top}
      />
      <Indicator
        left={layout.indicators.reset.left}
        state={state === "stopped" ? "red" : "off"}
        top={layout.indicators.reset.top}
      />
      <ModIconButton
        buttonClassName="bg-transparent"
        disabled={isRunning || isPaused}
        height={18}
        icon={<ModSprite sprite={createSpriteMeta.icons} src={{ height: 16, width: 16, x: icons.play.x, y: icons.play.y }} />}
        label="播放"
        left={layout.buttons.play.left}
        onClick={onPlay}
        top={layout.buttons.play.top}
        width={18}
      />
      <ModIconButton
        buttonClassName="bg-transparent"
        disabled={!isRunning}
        height={18}
        icon={<ModSprite sprite={createSpriteMeta.icons} src={{ height: 16, width: 16, x: icons.pause.x, y: icons.pause.y }} />}
        label="暂停"
        left={layout.buttons.pause.left}
        onClick={onPause}
        top={layout.buttons.pause.top}
        width={18}
      />
      <ModIconButton
        buttonClassName="bg-transparent"
        disabled={state === "stopped"}
        height={18}
        icon={<ModSprite sprite={createSpriteMeta.icons} src={{ height: 16, width: 16, x: icons.stop.x, y: icons.stop.y }} />}
        label="停止"
        left={layout.buttons.reset.left}
        onClick={onReset}
        top={layout.buttons.reset.top}
        width={18}
      />
      <ModIconButton
        buttonClassName="bg-transparent"
        height={18}
        icon={(
          <ModSprite
            sprite={createSpriteMeta.icons}
            src={{ height: 16, width: 16, x: icons.placementSettings.x, y: icons.placementSettings.y }}
          />
        )}
        label="放置设置"
        left={layout.buttons.settings.left}
        onClick={onToggleSettings}
        pressed={showSettings}
        top={layout.buttons.settings.top}
        width={18}
      />
      <ModIconButton
        buttonClassName="bg-transparent"
        height={18}
        icon={<ModSprite sprite={createSpriteMeta.icons} src={{ height: 16, width: 16, x: icons.confirm.x, y: icons.confirm.y }} />}
        label="确认"
        left={layout.buttons.confirm.left}
        onClick={onConfirm}
        top={layout.buttons.confirm.top}
        width={18}
      />
      {showSettings
        ? (
            <SettingsRow
              onReplaceModeChange={onReplaceModeChange}
              onToggleSkipBlockEntities={onToggleSkipBlockEntities}
              onToggleSkipMissing={onToggleSkipMissing}
              replaceMode={replaceMode}
              skipBlockEntities={skipBlockEntities}
              skipMissing={skipMissing}
            />
          )
        : null}
    </CreateWindow>
  );
}
