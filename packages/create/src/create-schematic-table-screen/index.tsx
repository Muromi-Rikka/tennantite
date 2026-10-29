import type { InventoryItem, ScreenSlot } from "@tennantite/ui";

import { ModIconButton, ModProgress, ModSprite } from "@tennantite/mods-core";
import { createSpriteMeta } from "@tennantite/textures";
import { cn, gui, PlayerInventory, ScreenItemSlot } from "@tennantite/ui";

import { CREATE_ATLAS, CREATE_ICONS, CREATE_SCHEMATIC_TABLE } from "../create-metrics";

export interface CreateSchematicTableScreenProps {
  className?: string;
  /**
   * 输入槽（空蓝图 / 蓝图笔 / 蓝图）
   */
  input?: ScreenSlot;
  /**
   * 确认按钮回调（上游 confirmButton → 开始上传蓝图）
   */
  onConfirm?: () => void;
  onInputClick?: () => void;
  onOutputClick?: () => void;
  /**
   * 输出槽（只读，照上游 mayPlace=false）
   */
  output?: ScreenSlot;
  player?: {
    hotbarItems?: (InventoryItem | null | undefined)[];
    mainItems?: (InventoryItem | null | undefined)[];
  };
  /**
   * 蓝图上传进度 0..1（进度贴图从左向右生长，照上游 lerp 宽度绘制）
   */
  progress?: number;
  title?: string;
}

/**
 * Create 蓝图桌界面（`SchematicTableScreen` 视觉复刻）：SCHEMATIC_TABLE
 * 214×85 背板、左输入槽 + 右输出槽、中下部 84×16 进度贴图（左→右填充）、
 * 确认/打开文件夹/刷新图标按钮与玩家背包。数据注入、无上传逻辑。
 */
export function CreateSchematicTableScreen({
  className,
  input,
  onConfirm,
  onInputClick,
  onOutputClick,
  output,
  player,
  progress = 0,
  title = "蓝图桌",
}: CreateSchematicTableScreenProps) {
  const table = CREATE_ATLAS.schematicTable;
  const progressRegion = CREATE_ATLAS.schematicTableProgress;
  const buttons = CREATE_SCHEMATIC_TABLE.buttons;
  const slots = CREATE_SCHEMATIC_TABLE.slots;
  return (
    <div
      className={cn("mc-create-window relative inline-block", className)}
      style={{ height: gui(CREATE_SCHEMATIC_TABLE.height), width: gui(CREATE_SCHEMATIC_TABLE.width) }}
    >
      <ModSprite
        left={CREATE_SCHEMATIC_TABLE.background.left}
        sprite={createSpriteMeta[table.atlas]}
        src={table}
        top={CREATE_SCHEMATIC_TABLE.background.top}
      />
      <div
        className="absolute text-center font-mc mc-text mc-text-shadow"
        style={{
          color: "#505050",
          left: 0,
          top: gui(CREATE_SCHEMATIC_TABLE.title.top),
          width: gui(CREATE_SCHEMATIC_TABLE.width),
        }}
      >
        {title}
      </div>
      <ScreenItemSlot
        item={input}
        label="input"
        left={slots.input.left}
        onActivate={onInputClick}
        top={slots.input.top}
      />
      <ScreenItemSlot
        item={output}
        label="output"
        left={slots.output.left}
        onActivate={onOutputClick}
        top={slots.output.top}
      />
      <ModProgress
        direction="right"
        fill={(
          <ModSprite
            sprite={createSpriteMeta[progressRegion.atlas]}
            src={progressRegion}
          />
        )}
        height={progressRegion.height}
        label="progress"
        left={CREATE_SCHEMATIC_TABLE.progress.left}
        progress={progress}
        top={CREATE_SCHEMATIC_TABLE.progress.top}
        width={progressRegion.width}
      />
      <ModIconButton
        buttonClassName="bg-transparent"
        height={18}
        icon={(
          <ModSprite
            sprite={createSpriteMeta.icons}
            src={{ height: 16, width: 16, x: CREATE_ICONS.confirm.x, y: CREATE_ICONS.confirm.y }}
          />
        )}
        label="确认"
        left={buttons.confirm.left}
        onClick={onConfirm}
        top={buttons.confirm.top}
        width={18}
      />
      <ModIconButton
        buttonClassName="bg-transparent"
        height={18}
        icon={(
          <ModSprite
            sprite={createSpriteMeta.icons}
            src={{ height: 16, width: 16, x: CREATE_ICONS.openFolder.x, y: CREATE_ICONS.openFolder.y }}
          />
        )}
        label="打开蓝图文件夹"
        left={buttons.openFolder.left}
        top={buttons.openFolder.top}
        width={18}
      />
      <ModIconButton
        buttonClassName="bg-transparent"
        height={18}
        icon={(
          <ModSprite
            sprite={createSpriteMeta.icons}
            src={{ height: 16, width: 16, x: CREATE_ICONS.refresh.x, y: CREATE_ICONS.refresh.y }}
          />
        )}
        label="刷新"
        left={buttons.refresh.left}
        top={buttons.refresh.top}
        width={18}
      />
      <PlayerInventory
        hotbarItems={player?.hotbarItems}
        hotbarY={CREATE_SCHEMATIC_TABLE.player.hotbarY}
        mainItems={player?.mainItems}
        x={CREATE_SCHEMATIC_TABLE.player.x}
        y={CREATE_SCHEMATIC_TABLE.player.y}
      />
    </div>
  );
}
