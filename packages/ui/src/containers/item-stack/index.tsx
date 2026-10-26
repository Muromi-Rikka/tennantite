import type { ReactNode } from "react";

import { Badge } from "../../primitives/badge/index";
import { Tooltip, TooltipPopup, TooltipTrigger } from "../../primitives/tooltip/index";
import { Icon } from "../icon/index";
import { Slot } from "../slot/index";

export interface ItemStackProps {
  className?: string;
  /**
  * 数量（>1 时显示计数徽标，规格 §5 #3）
  */
  count?: number;
  /**
  * 内置像素图标名（与 src 二选一）
  */
  icon?: Parameters<typeof Icon>[0]["name"];
  /**
  * 选中态（白色像素描边）
  */
  selected?: boolean;
  /**
  * 槽位边长（px）
  */
  size?: number;
  /**
  * 自定义图标 URL
  */
  src?: string;
  /**
  * 悬浮提示内容（提供时以 Tooltip 包裹，交互经水合增强）
  */
  tooltip?: ReactNode;
}

/**
 * MC 物品堆（规格 §5 #3）：图标 + 计数徽标的最小复用单元。
 * 无 tooltip 时为纯展示组合，RSC 兼容。
 */
export function ItemStack({
  className,
  count,
  icon,
  selected = false,
  size = 48,
  src,
  tooltip,
}: ItemStackProps) {
  const content = (
    <Slot className={className} selected={selected} size={size}>
      <Icon name={icon} size={Math.max(16, size - 16)} src={src} />
      {count !== undefined && count > 1
        ? (
            <Badge className="absolute right-2 bottom-1">{count}</Badge>
          )
        : null}
    </Slot>
  );

  if (!tooltip) {
    return content;
  }

  return (
    <Tooltip>
      <TooltipTrigger className="cursor-default">
        {content}
        <span className="sr-only">{typeof tooltip === "string" ? tooltip : ""}</span>
      </TooltipTrigger>
      <TooltipPopup>{tooltip}</TooltipPopup>
    </Tooltip>
  );
}
