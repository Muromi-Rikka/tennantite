"use client";

import type { ComponentProps, CSSProperties } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { cn } from "../../lib/utils";

/**
 * 布局前同步测量，避免首帧从初始档位跳档；服务端仍走 useEffect（空操作），
 * 满足规格 §1.1（渲染期不访问浏览器 API）。
 */
const useIsomorphicLayoutEffect
  = typeof document === "undefined" ? useEffect : useLayoutEffect;

export interface ScaledBoxProps extends ComponentProps<"div"> {
  /**
   * integer 模式下内容在容器内的水平对齐（默认居中）
   */
  align?: "center" | "end" | "start";
  /**
   * 内容固有高度（GUI px）：省略时按内容实测（fit 模式无 `width` 时必测）
   */
  height?: number;
  /**
   * 缩放上限：integer 模式向下取整（fit 模式可为小数），默认 2
   */
  maxScale?: number;
  /**
   * 缩放模式（默认 integer）：
   * - `integer`：按容器宽度取最大整数倍写入 `--mc-scale`，内容整体重排
   *   —— 等价游戏内 "GUI Scale: Auto"，像素最锐利；
   * - `fit`：在自身盒内 transform 等比缩放并居中（内容按 `--mc-scale: 1`
   *   渲染），需通过 className 给出显式高度。
   */
  mode?: "fit" | "integer";
  /**
   * 内容固有宽度（GUI px）：省略时按内容实测尺寸计算档位
   */
  width?: number;
}

/**
 * 自适应缩放容器（规格 §6.4）：固定几何内容面向不同容器宽度的整体等比缩放。
 *
 * - integer 模式改写子树 `--mc-scale`：间距、边框、阴影、纹理与字号全部经
 *   `--mc-gui` 派生，随档位整体重排 —— 无 transform、无裁切、布局盒即视觉盒；
 * - fit 模式用于营销预览等"填满定高容器"的场景，transform 连续缩放，
 *   内容按 `--mc-scale: 1` 渲染。
 *
 * `width`/`height` 省略时按内容实测尺寸计算（依赖浏览器布局，SSR 期保持档位 1）。
 *
 * 边界：Dialog / Select / Tooltip 弹层经 portal 挂在 body 上，不随子树
 * `--mc-scale` 缩放 —— 局部缩放场景应保证弹层不展开（如 inert 预览）；
 * 应用级整体缩放请在 `:root` 上覆盖 `--mc-scale`。手动覆盖档位时必须与
 * `mc-scale-scope` 类（tokens 包提供）同元素使用：CSS 自定义属性的派生
 * 链在声明元素上解析固化后继承，仅覆盖 `--mc-scale` 不会重解析派生值。
 */
export function ScaledBox({
  align = "center",
  children,
  className,
  height,
  maxScale = 2,
  mode = "integer",
  style,
  width,
  ...rest
}: ScaledBoxProps) {
  const frameReference = useRef<HTMLDivElement>(null);
  const contentReference = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const scaleReference = useRef(1);

  const cap = mode === "fit"
    ? Math.max(maxScale, 0)
    : Math.max(1, Math.floor(maxScale));

  useIsomorphicLayoutEffect(() => {
    const frame = frameReference.current;
    if (!frame || typeof ResizeObserver === "undefined") {
      return;
    }
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) {
        return;
      }
      const content = contentReference.current;
      if (width === undefined) {
        // 实测路径：固有尺寸未知，按当前档位换算（无布局信息时保持档位）
        if (!content || content.offsetWidth <= 0) {
          return;
        }
        const naturalWidth = mode === "fit"
          ? content.offsetWidth
          : content.offsetWidth / (scaleReference.current || 1);
        const next = computeBoxScale(
          entry.contentRect.width,
          entry.contentRect.height,
          cap,
          mode === "fit",
          mode === "fit" ? content.offsetHeight : naturalWidth,
          naturalWidth,
        );
        scaleReference.current = next;
        setScale(next);
        return;
      }
      const next = computeBoxScale(
        entry.contentRect.width,
        entry.contentRect.height,
        cap,
        mode === "fit",
        height ?? width,
        width,
      );
      scaleReference.current = next;
      setScale(next);
    });
    observer.observe(frame);
    return () => {
      observer.disconnect();
    };
  }, [cap, height, mode, width]);

  if (mode === "fit") {
    return (
      <div
        className={cn("relative w-full overflow-hidden", className)}
        ref={frameReference}
        style={style}
        {...rest}
      >
        <div
          className="absolute top-1/2 left-1/2"
          style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
        >
          <div
            className="mc-scale-scope"
            ref={contentReference}
            style={{
              "--mc-scale": "1",
              ...(height !== undefined && { height }),
              ...(width !== undefined && { width }),
            } as CSSProperties}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("w-full", className)}
      ref={frameReference}
      style={style}
      {...rest}
    >
      <div
        className={cn(
          "w-fit mc-scale-scope",
          align === "start" ? "mr-auto" : (align === "end" ? "ml-auto" : "mx-auto"),
        )}
        ref={contentReference}
        style={{ "--mc-scale": String(scale) } as CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * 档位计算：integer 取不超过 cap 的最大整数档（下限 1，`+1e-4` 抵消
 * 容器宽度的浮点误差）；fit 取容器盒与内容固有比的最小值（可为小数）。
 */
function computeBoxScale(
  boxWidth: number,
  boxHeight: number,
  cap: number,
  isFit: boolean,
  naturalHeight: number,
  width: number,
): number {
  return isFit
    ? Math.min(cap, boxWidth / width, boxHeight / naturalHeight)
    : Math.min(cap, Math.max(1, Math.floor(boxWidth / width + 1e-4)));
}
