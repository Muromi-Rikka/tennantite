import type { ReactNode } from "react";

import type { PlayerInventoryProps } from "../../../containers/player-inventory/index";
import type { ScreenSlot } from "../../containers/types";
import type { Ae2InscriberAction } from "../ae2-types";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { cn, gui } from "../../../lib/utils";
import { ScreenItemSlot } from "../../containers/screen-slot";
import {
  AE2_INSCRIBER,
  AE2_PLAYER,
  ae2PlayerHotbarTop,
  ae2PlayerMainTop,
  ae2PlayerTitleTop,
  ae2SlotFrame,
} from "../ae2-layout";
import { ModProgress, ModTitle, ModToolbar } from "../mod-parts";

export interface Ae2InscriberScreenProps {
  bottomPlate?: ScreenSlot;
  className?: string;
  hotbarItems?: PlayerInventoryProps["hotbarItems"];
  input?: ScreenSlot;
  mainItems?: PlayerInventoryProps["mainItems"];
  onTakeOutput?: () => void;
  onToolbarAction?: (action: Ae2InscriberAction) => void;
  output?: ScreenSlot;
  /**
  * 压印进度 0..1
  */
  progress?: number;
  selectedIndex?: number;
  /**
  * 是否显示左侧工具栏（默认 true）
  */
  showToolbar?: boolean;
  title?: ReactNode;
  topPlate?: ScreenSlot;
}

/**
 * 压印器界面（AE2 1.21 视觉复刻）：176×178 面板，
 * 上/下压印模板与输入槽为 22×22，输出槽 26×26，右侧竖向进度条。
 */
export function Ae2InscriberScreen({
  bottomPlate,
  className,
  hotbarItems,
  input,
  mainItems,
  onTakeOutput,
  onToolbarAction,
  output,
  progress = 0,
  selectedIndex,
  showToolbar = true,
  title = "压印器",
  topPlate,
}: Ae2InscriberScreenProps) {
  const height = AE2_INSCRIBER.height;

  return (
    <div
      className={cn("relative inline-block", className)}
      style={{ paddingLeft: gui(showToolbar ? 21 : 0) }}
    >
      {showToolbar
        ? (
            <ModToolbar
              items={[
                {
                  iconClassName: "mc-tex-ae2-icon-separate-sides",
                  label: "分离面",
                  onClick: () => onToolbarAction?.("separate-sides"),
                },
                {
                  iconClassName: "mc-tex-ae2-icon-auto-export",
                  label: "自动输出",
                  onClick: () => onToolbarAction?.("auto-export"),
                },
                {
                  iconClassName: "mc-tex-ae2-icon-buffer",
                  label: "缓冲区容量",
                  onClick: () => onToolbarAction?.("buffer"),
                },
              ]}
              left={0}
              top={0}
            />
          )
        : null}
      <ScreenPanel
        backgroundClassName={AE2_INSCRIBER.backgroundClassName}
        height={height}
        width={AE2_INSCRIBER.width}
      >
        <div
          aria-hidden="true"
          className="mc-tex-ae2-inscriber-arrows pointer-events-none absolute inset-0"
        />
        <ModTitle left={8} top={6}>{title}</ModTitle>
        <ScreenItemSlot
          frame
          frameClassName={AE2_INSCRIBER.largeSlotFrameClassName}
          item={topPlate}
          label="inscriber-top"
          size={22}
          {...ae2SlotFrame(AE2_INSCRIBER.slots.top, 22)}
        />
        <ScreenItemSlot
          frame
          frameClassName={AE2_INSCRIBER.largeSlotFrameClassName}
          item={input}
          label="inscriber-input"
          size={22}
          {...ae2SlotFrame(AE2_INSCRIBER.slots.input, 22)}
        />
        <ScreenItemSlot
          frame
          frameClassName={AE2_INSCRIBER.largeSlotFrameClassName}
          item={bottomPlate}
          label="inscriber-bottom"
          size={22}
          {...ae2SlotFrame(AE2_INSCRIBER.slots.bottom, 22)}
        />
        <ScreenItemSlot
          frame
          frameClassName={AE2_INSCRIBER.slotFrameClassName}
          item={output}
          label="inscriber-output"
          onActivate={onTakeOutput}
          size={26}
          {...ae2SlotFrame(AE2_INSCRIBER.slots.output, 26)}
        />
        <ModProgress
          direction="up"
          fillClassName="mc-tex-ae2-inscriber-progress"
          height={AE2_INSCRIBER.progress.height}
          inset={1}
          label="压印进度"
          left={AE2_INSCRIBER.progress.left}
          progress={progress}
          top={AE2_INSCRIBER.progress.top}
          trackClassName="mc-tex-ae2-inscriber-progress-track"
          width={AE2_INSCRIBER.progress.width}
        />
        <ModTitle left={8} top={ae2PlayerTitleTop(height)}>物品栏</ModTitle>
        <PlayerInventory
          frameClassName={AE2_PLAYER.frameClassName}
          hotbarItems={hotbarItems}
          hotbarY={ae2PlayerHotbarTop(height)}
          mainItems={mainItems}
          selectedIndex={selectedIndex}
          x={AE2_PLAYER.frameLeft}
          y={ae2PlayerMainTop(height)}
        />
      </ScreenPanel>
    </div>
  );
}
