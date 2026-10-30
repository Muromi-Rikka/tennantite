import type { InventoryItem, ScreenSlot } from "@tennantite/ui";

import { ModProgress } from "@tennantite/mods-core";
import { ScreenItemSlot } from "@tennantite/ui";

import type { CreateMachineName } from "../create-machine-layout";
import { CREATE_MACHINE_LAYOUT } from "../create-machine-layout";
import { CreateWindow } from "../create-window/index";

export interface CreateMillstoneScreenProps {
  className?: string;
  /**
   * 输入槽物品
   */
  input?: ScreenSlot;
  /**
   * 机器布局键（millstone 磨石 / crusher 粉碎机共用一套坐标）
   */
  machine?: CreateMachineName;
  onInputClick?: () => void;
  onOutputClick?: () => void;
  /**
   * 输出槽物品
   */
  output?: ScreenSlot;
  /**
   * 玩家背包物品（3×9 + 快捷栏，行优先）
   */
  player?: {
    hotbarItems?: (InventoryItem | null | undefined)[];
    mainItems?: (InventoryItem | null | undefined)[];
  };
  /**
   * 研磨进度 0..1（数据注入，无游戏逻辑）
   */
  progress: number;
  title?: string;
}

/**
 * Create 磨石 / 粉碎机界面（视觉复刻）：Create 1.21.1 无上游机器 Screen，
 * 按 `CREATE_MACHINE_LAYOUT` 数据表渲染原版风格窗口——输入槽、竖向进度条
 * （`ModProgress` + `progressClipPath` 向下填充）、输出槽与玩家背包。
 */
export function CreateMillstoneScreen({
  className = "",
  input,
  machine = "millstone",
  onInputClick,
  onOutputClick,
  output,
  player,
  progress,
  title,
}: CreateMillstoneScreenProps) {
  const layout = CREATE_MACHINE_LAYOUT[machine];
  return (
    <CreateWindow
      className={className}
      height={layout.height}
      player={{ hotbarItems: player?.hotbarItems, mainItems: player?.mainItems }}
      title={title ?? layout.title}
      titleClassName="mc-text-shadow text-mc-text-main"
      titleLeft={8}
      titleTop={5}
      width={layout.width}
      windowClassName="mc-create-machine"
    >
      <ScreenItemSlot
        item={input}
        label="input"
        left={layout.input.left}
        onActivate={onInputClick}
        top={layout.input.top}
      />
      <ModProgress
        direction="down"
        fillClassName="mc-create-progress-fill"
        height={layout.progress.height}
        label="progress"
        left={layout.progress.left}
        progress={progress}
        top={layout.progress.top}
        trackClassName="mc-create-progress-track"
        width={layout.progress.width}
      />
      <ScreenItemSlot
        item={output}
        label="output"
        left={layout.output.left}
        onActivate={onOutputClick}
        top={layout.output.top}
      />
    </CreateWindow>
  );
}
