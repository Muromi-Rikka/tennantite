import type { ModDataAttributes } from "@tennantite/mods-core";
import type { IeSpriteName } from "@tennantite/textures";
import type { ReactNode } from "react";

import { cn, gui } from "@tennantite/ui";

import { IeSprite } from "../ie-sprite/index";

export interface IeSpriteButtonProps {
  /**
   * 额外根节点 class
   */
  className?: string;
  /**
   * 额外 DOM 钩子（如 `{ "data-ie-page": "left" }`），展开到按钮
   */
  dataAttributes?: ModDataAttributes;
  /**
   * 按钮高（GUI px，默认 18）
   */
  height?: number;
  /**
   * 悬停/聚焦贴图；提供时由 CSS 切换（无需状态）
   */
  hoverName?: IeSpriteName;
  /**
   * 自定义内容（槽位等）；省略时按 `name`/`nameOn` 渲染贴图
   */
  icon?: ReactNode;
  /**
   * 可访问名称
   */
  label: string;
  left: number;
  /**
   * 常态贴图
   */
  name?: IeSpriteName;
  /**
   * 按下态贴图；省略时贴图不随 `pressed` 变化
   */
  nameOn?: IeSpriteName;
  onClick?: () => void;
  /**
   * 两态按钮按下态（渲染 aria-pressed）
   */
  pressed?: boolean;
  /**
   * 悬浮提示（省略时不设置）
   */
  title?: string;
  top: number;
  /**
   * 按钮宽（GUI px，默认 18）
   */
  width?: number;
}

/**
 * IE 贴图按钮：18×18 几何由调用方给出，常态/按下态贴图与 CSS 悬停态切换。
 */
export function IeSpriteButton({
  className,
  dataAttributes,
  height = 18,
  hoverName,
  icon,
  label,
  left,
  name,
  nameOn,
  onClick,
  pressed,
  title,
  top,
  width = 18,
}: IeSpriteButtonProps) {
  const currentName = pressed && nameOn ? nameOn : name;
  const content = icon ?? (currentName ? <IeSprite name={currentName} /> : null);
  return (
    <button
      aria-label={label}
      aria-pressed={pressed}
      className={cn("group", className)}
      onClick={onClick}
      style={{
        height: gui(height),
        left: gui(left),
        position: "absolute",
        top: gui(top),
        width: gui(width),
      }}
      title={title}
      type="button"
      {...dataAttributes}
    >
      {hoverName
        ? (
            <>
              <span className="absolute inset-0 group-hover:opacity-0 group-focus:opacity-0">
                {content}
              </span>
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 group-focus:opacity-100">
                <IeSprite name={hoverName} />
              </span>
            </>
          )
        : content}
    </button>
  );
}
