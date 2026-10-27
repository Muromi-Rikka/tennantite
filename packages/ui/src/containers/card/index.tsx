import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../lib/utils";
import { Panel } from "../panel/index";
import { TitleBar } from "../title-bar/index";

export interface CardProps extends Omit<ComponentProps<typeof Panel>, "title"> {
  align?: "center" | "end" | "start";
  /**
  * 标题（渲染 TitleBar）
  */
  title?: ReactNode;
}

/**
 * MC 卡片（规格 §5 #5）：Panel + TitleBar + 内容区块。
*/
export function Card({
  align,
  children,
  className,
  title,
  ...properties
}: CardProps) {
  return (
    <Panel className={cn("flex flex-col gap-4 p-6", className)} {...properties}>
      {title === undefined ? null : <TitleBar align={align} title={title} />}
      {children}
    </Panel>
  );
}
