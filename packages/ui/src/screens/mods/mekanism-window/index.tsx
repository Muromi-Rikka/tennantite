import type { PointerEvent, ReactNode } from "react";
import { useRef, useState } from "react";

import { cn, gui } from "../../../lib/utils";
import { MekanismTitle } from "../mekanism-parts/index";
import { MekanismSprite } from "../mekanism-sprite/index";

export interface MekanismWindowProps {
  children?: ReactNode;
  className?: string;
  /**
   * 窗口高（GUI px）
   */
  height: number;
  /**
   * 初始/受控左边界（GUI px，可相对面板为负）
   */
  left: number;
  onClose?: () => void;
  onTogglePin?: () => void;
  pinned?: boolean;
  title: ReactNode;
  /**
   * 标题右侧留白（侧配置窗口传 18）
   */
  titlePadEnd?: number;
  /**
   * 初始/受控上边界（GUI px）
   */
  top: number;
  /**
   * 窗口宽（GUI px）
   */
  width: number;
}

/**
 * Mekanism 可拖动窗口：shadow + base + 标题 + 关闭/固定按钮。
 *
 * 不使用遮罩；指针事件只在标题栏按下时生效，SSR 下无模块级浏览器访问。
 */
export function MekanismWindow({
  children,
  className,
  height,
  left,
  onClose,
  onTogglePin,
  pinned = false,
  title,
  titlePadEnd = 0,
  top,
  width,
}: MekanismWindowProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const drag = useRef<null | { offsetX: number; offsetY: number; scale: number; startX: number; startY: number }>(null);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) {
      return;
    }
    const target = event.currentTarget;
    target.setPointerCapture(event.pointerId);
    drag.current = {
      offsetX: offset.x,
      offsetY: offset.y,
      scale: guiScale(target),
      startX: event.clientX,
      startY: event.clientY,
    };
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) {
      return;
    }
    const { offsetX, offsetY, scale, startX, startY } = drag.current;
    const nextX = offsetX + (event.clientX - startX) / scale;
    const nextY = offsetY + (event.clientY - startY) / scale;
    setOffset({
      x: Math.min(width, Math.max(-width, nextX)),
      y: Math.min(height, Math.max(-height, nextY)),
    });
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) {
      return;
    }
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      aria-label={typeof title === "string" ? title : "窗口"}
      className={cn("absolute z-10", className)}
      role="dialog"
      style={{
        height: gui(height),
        left: gui(left + offset.x),
        top: gui(top + offset.y),
        width: gui(width),
      }}
    >
      <MekanismSprite
        className="absolute"
        height={height + 6}
        left={-3}
        name="shadow"
        opacity={0.75}
        top={-3}
        width={width + 6}
      />
      <MekanismSprite className="absolute" height={height} left={0} name="base" top={0} width={width} />
      <div
        className="absolute cursor-move select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        style={{ height: gui(20), left: 0, top: 0, width: gui(width) }}
      >
        <MekanismTitle titleEnd={width - titlePadEnd} titleX={30} top={5}>
          {title}
        </MekanismTitle>
      </div>
      {onClose
        ? (
            <button
              aria-label="关闭窗口"
              className="absolute cursor-pointer border-0 bg-transparent p-0"
              onClick={onClose}
              style={{ height: gui(8), left: gui(6), top: gui(6), width: gui(8) }}
              type="button"
            >
              <MekanismSprite height={8} name="button/close" width={8} />
            </button>
          )
        : null}
      {onTogglePin
        ? (
            <button
              aria-label={pinned ? "取消固定" : "固定窗口"}
              className="absolute cursor-pointer border-0 bg-transparent p-0"
              onClick={onTogglePin}
              style={{ height: gui(8), left: gui(16), top: gui(6), width: gui(16) }}
              type="button"
            >
              <MekanismSprite height={8} name={pinned ? "button/pinned" : "button/unpinned"} width={16} />
            </button>
          )
        : null}
      {children}
    </div>
  );
}

function guiScale(element: Element): number {
  const value = getComputedStyle(element).getPropertyValue("--mc-gui");
  const parsed = Number(value.replace("px", ""));
  return parsed > 0 ? parsed : 2;
}
