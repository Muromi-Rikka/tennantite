import type { ReactNode } from "react";
import { ModIconButton, ModSprite, ModTitle } from "@tennantite/mods-core";
import { ae2SpriteMeta } from "@tennantite/textures";
import { cn, gui, ScreenPanel } from "@tennantite/ui";
import { AE2_ICONS, AE2_PRIORITY_DIALOG } from "../ae2-layout";

export interface Ae2PriorityDialogProps {
  className?: string;
  /**
  * 数值输入（受控展示；回写走 onPriorityChange）
  */
  onPriorityChange?: (value: number) => void;
  onReturn?: () => void;
  /**
  * 当前优先级
  */
  priority?: number;
  title?: ReactNode;
}

const STEPS = [1, 10, 100, 1000];

/**
 * 优先级弹窗（AE2 视觉复刻）：`priority.png` 176×107 独立对话框
 * （`GuiPriority`：数值输入框 (62,57)、四档加/减按钮两行 y=32/69、
 * 右上返回原界面标签 (154,0)；上游 drawBG 按 176×166 绘制但贴图艺术
 * 只有 107 高，面板取实测高度）。宿主终端经 `Ae2PriorityTab` 打开，
 * 弹窗本身为纯展示组件，数据注入。
 */
export function Ae2PriorityDialog({
  className,
  onPriorityChange,
  onReturn,
  priority = 0,
  title = "优先级",
}: Ae2PriorityDialogProps) {
  const { field, height, minusRow, plusRow, returnTab, steps, title: titlePos, width } = AE2_PRIORITY_DIALOG;

  return (
    <div className={cn("relative inline-block", className)}>
      <ScreenPanel backgroundClassName="bg-transparent" height={height} width={width}>
        <ModSprite
          height={height}
          left={0}
          sprite={ae2SpriteMeta.priority}
          src={{ height, width, x: 0, y: 0 }}
          top={0}
        />
        <ModTitle left={titlePos.left} top={titlePos.top}>{title}</ModTitle>
        <span
          className="absolute font-mc text-white"
          style={{
            fontSize: "calc(var(--mc-gui) * 5.4)",
            left: gui(field.left),
            lineHeight: "calc(var(--mc-gui) * 9)",
            top: gui(field.top),
          }}
        >
          {priority}
        </span>
        {STEPS.map((step, index) => {
          const position = steps[index];
          if (!position) {
            return null;
          }
          return (
            <ModIconButton
              height={20}
              key={`plus-${step}`}
              label={`优先级 +${step}`}
              left={position.left}
              onClick={onPriorityChange ? () => onPriorityChange(priority + step) : undefined}
              top={plusRow.top}
              width={position.width}
            />
          );
        })}
        {STEPS.map((step, index) => {
          const position = steps[index];
          if (!position) {
            return null;
          }
          return (
            <ModIconButton
              height={20}
              key={`minus-${step}`}
              label={`优先级 -${step}`}
              left={position.left}
              onClick={onPriorityChange ? () => onPriorityChange(priority - step) : undefined}
              top={minusRow.top}
              width={position.width}
            />
          );
        })}
        <ModIconButton
          height={returnTab.size}
          icon={<ModSprite sprite={ae2SpriteMeta.states} src={AE2_ICONS.settings} />}
          label="返回原界面"
          left={returnTab.left}
          onClick={onReturn}
          top={returnTab.top}
          width={returnTab.size}
        />
      </ScreenPanel>
    </div>
  );
}
