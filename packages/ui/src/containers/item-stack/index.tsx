import type { CSSProperties, ReactNode } from "react";

import { Badge } from "../../primitives/badge/index";
import { Tooltip, TooltipPopup, TooltipTrigger } from "../../primitives/tooltip/index";
import { Icon } from "../icon/index";
import { Slot } from "../slot/index";

export interface ItemStackProps {
  /**
  * 不绘制槽位纹理（由父容器提供）
  */
  bare?: boolean;
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
  * 选中态（1 GUI px 白色内框）
  */
  selected?: boolean;
  /**
  * 槽位边长（GUI px，默认 18 —— 原版槽位）
  */
  size?: number;
  /**
  * 自定义图标 URL
  */
  src?: string;
  /**
  * 槽位样式（绝对定位等）
  */
  style?: CSSProperties;
  /**
  * 悬浮提示内容（提供时以 Tooltip 包裹，交互经水合增强）
  */
  tooltip?: ReactNode;
}

/**
 * MC 物品堆（规格 §5 #3）：图标 + 计数徽标的最小复用单元。
 * 图标固定 16 GUI px（原版物品图标），无 tooltip 时为纯展示组合，RSC 兼容。
 */
export function ItemStack({
  bare = false,
  className,
  count,
  icon,
  selected = false,
  size = 18,
  src,
  style,
  tooltip,
}: ItemStackProps) {
  const content = (
    <Slot bare={bare} className={className} selected={selected} size={size} style={style}>
      <Icon name={icon} size={16} src={src} />
      {count !== undefined && count > 1
        ? (
            <Badge className="absolute right-1 bottom-0">{count}</Badge>
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
