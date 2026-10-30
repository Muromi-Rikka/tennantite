import type { EioSpriteName } from "@tennantite/textures";
import { ModIconButton } from "@tennantite/mods-core";
import { cn, GuiSprite } from "@tennantite/ui";

import { EIO_ICON_SIZE } from "../eio-metrics";
import { EioSprite } from "../eio-sprite/index";

export interface EioIconButtonProps {
  className?: string;
  /**
   * 图标精灵；省略时只渲染按钮底
   */
  icon?: EioSpriteName;
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
  return (
    <ModIconButton
      background={<GuiSprite height={EIO_ICON_SIZE} name="sprites/widget/button.png" width={EIO_ICON_SIZE} />}
      backgroundHover={<GuiSprite height={EIO_ICON_SIZE} name="sprites/widget/button_highlighted.png" width={EIO_ICON_SIZE} />}
      buttonClassName=""
      className={cn("p-0", className)}
      dataAttributes={{ "data-eio-icon-button": icon ?? "sprites/widget/button.png" }}
      height={EIO_ICON_SIZE}
      icon={icon
        ? <EioSprite height={EIO_ICON_SIZE} left={0} name={icon} top={0} width={EIO_ICON_SIZE} />
        : undefined}
      label={label}
      left={left}
      onClick={onClick}
      title={title}
      top={top}
      width={EIO_ICON_SIZE}
    />
  );
}
