import type { EioSpriteName } from "@tennantite/textures";
import { cn, gui, GuiSprite } from "@tennantite/ui";
import { useState } from "react";

import { EIO_ICON_SIZE } from "../eio-metrics";
import { EioSprite } from "../eio-sprite/index";

export interface EioIconButtonProps {
  className?: string;
  icon: EioSpriteName;
  label: string;
  left: number;
  onClick?: () => void;
  title?: string;
  top: number;
}

/**
 * Ender IO 图标按钮：原版 16×16 按钮底（悬停 / 聚焦高亮）+ 上游 16×16 图标。
 */
export function EioIconButton({
  className,
  icon,
  label,
  left,
  onClick,
  title = label,
  top,
}: EioIconButtonProps) {
  const [highlighted, setHighlighted] = useState(false);

  return (
    <button
      aria-label={label}
      className={cn("absolute p-0", className)}
      data-eio-icon-button={icon}
      onBlur={() => { setHighlighted(false); }}
      onClick={onClick}
      onFocus={() => { setHighlighted(true); }}
      onMouseEnter={() => { setHighlighted(true); }}
      onMouseLeave={() => { setHighlighted(false); }}
      style={{
        background: "transparent",
        border: 0,
        height: gui(EIO_ICON_SIZE),
        left: gui(left),
        padding: 0,
        top: gui(top),
        width: gui(EIO_ICON_SIZE),
      }}
      title={title}
      type="button"
    >
      <GuiSprite
        className="absolute top-0 left-0"
        height={EIO_ICON_SIZE}
        name={highlighted ? "sprites/widget/button_highlighted.png" : "sprites/widget/button.png"}
        width={EIO_ICON_SIZE}
      />
      <EioSprite
        height={EIO_ICON_SIZE}
        left={0}
        name={icon}
        top={0}
        width={EIO_ICON_SIZE}
      />
    </button>
  );
}
