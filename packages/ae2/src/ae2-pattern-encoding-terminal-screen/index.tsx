import type { PlayerInventoryProps, ScreenSlot } from "@tennantite/ui";
import type { ReactNode } from "react";
import {
  ModScrollbar,
  ModSearchField,
  ModSlotGrid,
  ModSprite,
  ModTabButton,
  ModTitle,
  ModToolbar,
} from "@tennantite/mods-core";
import { ae2SpriteMeta } from "@tennantite/textures";
import { cn, gui, padSlots, PlayerInventory, ScreenItemSlot, ScreenPanel } from "@tennantite/ui";
import { AE2_ICONS, AE2_PATTERN_SLICES, AE2_PATTERN_TERMINAL, ae2PatternTerminalHeight } from "../ae2-layout";
import { Ae2PanelBackground } from "../ae2-panel";

export interface Ae2PatternEncodingTerminalScreenProps {
  className?: string;
  /**
  * 编码区：合成格（3×3，行优先）
  */
  craftGrid?: ScreenSlot[];
  /**
  * 合成模式输出槽（合成模式中间格）
  */
  craftResult?: ScreenSlot;
  entriesLabel?: ReactNode;
  hotbarItems?: PlayerInventoryProps["hotbarItems"];
  items?: ScreenSlot[];
  mainItems?: PlayerInventoryProps["mainItems"];
  /**
  * 编码模式（默认合成）
  */
  mode?: "crafting" | "processing";
  /**
  * 编码（把合成格写入图样）
  */
  onEncode?: () => void;
  onModeChange?: (mode: "crafting" | "processing") => void;
  onSearchChange?: (value: string) => void;
  onSlotClick?: (index: number, item?: ScreenSlot) => void;
  /**
  * 处理模式输出槽（3 格）
  */
  outputs?: ScreenSlot[];
  /**
  * 空图样槽（编码区右上）
  */
  patternIn?: ScreenSlot;
  /**
  * 已编码图样槽（编码区右下）
  */
  patternOut?: ScreenSlot;
  /**
  * 终端行数（默认 4）
  */
  rows?: number;
  searchDefaultValue?: string;
  selectedIndex?: number;
  /**
  * 是否显示左侧工具栏（默认 true）
  */
  showToolbar?: boolean;
  title?: ReactNode;
}

/**
 * 样式编码终端界面（AE2 视觉复刻）：`pattern.png` / `pattern2.png` 双模式底，
 * 由 header / firstRow / row×(rows-2) / lastRow / bottom 五段切片拼接
 * （`GuiMEMonitorable.drawBG` 版式，总高 196 + 18·rows）；ME 物品网格、
 * 搜索框、滚动条与玩家背包热区叠加在切片之上。
 * 编码区槽位按 `ContainerPatternTerm` + `repositionSlot`：3×3 合成格
 * (18, ySize−157) 起、输出列 x=110（合成模式中间格 / 处理模式 3 格）、
 * 图样槽 x=147；模式页签 (173, ySize−177)。
 */
export function Ae2PatternEncodingTerminalScreen({
  className,
  craftGrid,
  craftResult,
  entriesLabel,
  hotbarItems,
  items,
  mainItems,
  mode = "crafting",
  onEncode,
  onModeChange,
  onSearchChange,
  onSlotClick,
  outputs,
  patternIn,
  patternOut,
  rows: rowsProp = 4,
  searchDefaultValue,
  selectedIndex,
  showToolbar = true,
  title = "样式编码终端",
}: Ae2PatternEncodingTerminalScreenProps) {
  const rows = Math.max(2, Math.floor(rowsProp));
  const height = ae2PatternTerminalHeight(rows);
  const slots = padSlots(items ?? [], rows * AE2_PATTERN_TERMINAL.columns);
  const isProcessing = mode === "processing";
  const sprite = isProcessing ? AE2_PATTERN_TERMINAL.spriteProcessing : AE2_PATTERN_TERMINAL.sprite;
  const {
    craftGrid: grid,
    craftResult: resultSlot,
    encodeButton,
    encodeShift,
    encodeShiftX3,
    gridLeft,
    gridTop,
    modeTab,
    outputs: outputsRow,
    panelWidth,
    patternIn: patternInSlot,
    patternOut: patternOutSlot,
    rowHeight,
    scrollbar,
    search,
    slotSize,
    substitution,
    utilityClear,
  } = AE2_PATTERN_TERMINAL;

  return (
    <div
      className={cn("relative inline-block", className)}
      style={{
        paddingLeft: gui(showToolbar ? 19 : 0),
        paddingTop: gui(6),
      }}
    >
      {showToolbar
        ? (
            <ModToolbar
              items={[
                {
                  icon: <ModSprite sprite={ae2SpriteMeta.states} src={AE2_ICONS.sortName} />,
                  label: "按名称排序",
                },
                {
                  icon: <ModSprite sprite={ae2SpriteMeta.states} src={AE2_ICONS.settings} />,
                  label: "终端设置",
                },
                {
                  icon: <ModSprite sprite={ae2SpriteMeta.states} src={AE2_ICONS.sortDirection} />,
                  label: "排序方向",
                },
              ]}
              left={0}
              top={14}
            />
          )
        : null}
      <ScreenPanel backgroundClassName="bg-transparent" height={height} width={panelWidth}>
        <Ae2PanelBackground name={sprite} rows={rows} slices={AE2_PATTERN_SLICES} />
        <ModTitle left={8} top={6}>{title}</ModTitle>
        <ModSearchField
          defaultValue={searchDefaultValue}
          left={search.left}
          onChange={onSearchChange}
          placeholder="搜索…"
          top={search.top}
          width={search.width}
        />
        {entriesLabel === undefined
          ? null
          : (
              <span
                aria-hidden="true"
                className="absolute font-mc text-mc-ae2-text"
                style={{
                  fontSize: "calc(var(--mc-gui) * 5.4)",
                  lineHeight: "calc(var(--mc-gui) * 9)",
                  right: gui(26),
                  top: gui(8),
                }}
              >
                {entriesLabel}
              </span>
            )}
        <ModSlotGrid
          cellSize={slotSize}
          columns={AE2_PATTERN_TERMINAL.columns}
          frame={false}
          items={slots}
          labelPrefix="pattern-terminal"
          left={gridLeft}
          onSlotClick={onSlotClick}
          rows={rows}
          top={gridTop}
        />
        <ModScrollbar
          height={rows * rowHeight - 2}
          left={scrollbar.left}
          top={scrollbar.top}
          track={false}
        />
        {Array.from({ length: 9 }, (_, index) => {
          const column = index % 3;
          const row = Math.floor(index / 3);
          return (
            <ScreenItemSlot
              frame={false}
              item={craftGrid?.[index]}
              key={index}
              label={`pattern-craft-${index}`}
              left={grid.left + column * grid.size}
              size={grid.size}
              top={height - grid.rowTopFromBottom + row * grid.size}
            />
          );
        })}
        {isProcessing
          ? Array.from(outputsRow.rowTopsFromBottom, (topFromBottomOffset, index) => (
              <ScreenItemSlot
                frame={false}
                item={outputs?.[index]}
                key={`pattern-output-${index}`}
                label={`pattern-output-${index}`}
                left={outputsRow.left}
                size={outputsRow.size}
                top={height - topFromBottomOffset}
              />
            ))
          : (
              <ScreenItemSlot
                frame={false}
                item={craftResult}
                label="pattern-craft-result"
                left={resultSlot.left}
                onActivate={onEncode}
                size={resultSlot.size}
                top={height - resultSlot.topFromBottom}
              />
            )}
        <ScreenItemSlot
          frame={false}
          item={patternIn}
          label="pattern-in"
          left={patternInSlot.left}
          size={patternInSlot.size}
          top={height - patternInSlot.topFromBottom}
        />
        <ScreenItemSlot
          frame={false}
          item={patternOut}
          label="pattern-out"
          left={patternOutSlot.left}
          onActivate={onEncode}
          size={patternOutSlot.size}
          top={height - patternOutSlot.topFromBottom}
        />
        <ModTabButton
          icon={<ModSprite sprite={ae2SpriteMeta.states} src={AE2_ICONS.craftStatus} />}
          label={isProcessing ? "切换到合成模式" : "切换到处理模式"}
          left={modeTab.left}
          onClick={() => onModeChange?.(isProcessing ? "crafting" : "processing")}
          top={height - modeTab.topFromBottom}
        />
        {/* 编码按钮与小号工具按钮（GuiImgButton halfSize 8×8） */}
        <ModTabButton
          icon={<ModSprite sprite={ae2SpriteMeta.states} src={AE2_ICONS.settings} />}
          label="编码图样"
          left={encodeButton.left}
          onClick={onEncode}
          top={height - encodeButton.topFromBottom}
        />
        <ModSprite
          left={substitution.left}
          sprite={ae2SpriteMeta.states}
          src={AE2_ICONS.settings}
          top={height - substitution.topFromBottom}
        />
        <ModSprite
          left={utilityClear.left}
          sprite={ae2SpriteMeta.states}
          src={AE2_ICONS.settings}
          top={height - utilityClear.topFromBottom}
        />
        {[0, 1, 2].map(index => (
          <ModSprite
            key={`mul-${index}`}
            left={encodeShiftX3.left}
            sprite={ae2SpriteMeta.states}
            src={AE2_ICONS.settings}
            top={height - encodeShiftX3.topFromBottom + index * 10}
          />
        ))}
        {[0, 1, 2].map(index => (
          <ModSprite
            key={`div-${index}`}
            left={encodeShift.left}
            sprite={ae2SpriteMeta.states}
            src={AE2_ICONS.settings}
            top={height - encodeShift.topFromBottom + index * 10}
          />
        ))}
        <ModTitle left={8} top={height - 93}>物品栏</ModTitle>
        <PlayerInventory
          bare
          hotbarItems={hotbarItems}
          hotbarY={height - 25}
          mainItems={mainItems}
          selectedIndex={selectedIndex}
          x={7}
          y={height - 83}
        />
      </ScreenPanel>
    </div>
  );
}
