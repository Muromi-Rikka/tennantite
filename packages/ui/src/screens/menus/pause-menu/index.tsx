"use client";

import { useState } from "react";

import type { MenuAction } from "../main-menu/index";
import { cn } from "../../../lib/utils";
import { Button } from "../../../primitives/button/index";
import {
  Dialog,
  DialogDescription,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "../../../primitives/dialog/index";

export interface PauseMenuProps {
  /**
  * 弹窗内按钮栈（回到游戏 / 设置 …）
  */
  actions?: MenuAction[];
  className?: string;
  description?: React.ReactNode;
  title?: React.ReactNode;
  /**
  * 触发器文案
  */
  triggerLabel?: string;
}

const DEFAULT_ACTIONS: MenuAction[] = [
  { label: "回到游戏" },
  { label: "设置" },
  { label: "保存并退出到标题界面" },
];

/**
 * 暂停菜单（规格 §6.3）：全屏遮罩 + 居中标题与 200×20 按钮栈。
*/
export function PauseMenu({
  actions = DEFAULT_ACTIONS,
  className,
  description,
  title = "游戏菜单",
  triggerLabel = "打开暂停菜单",
}: PauseMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn(className)} data-menu="">
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger render={<Button />}>{triggerLabel}</DialogTrigger>
        <DialogPopup variant="overlay">
          <DialogTitle>{title}</DialogTitle>
          {description
            ? <DialogDescription>{description}</DialogDescription>
            : null}
          <div className="flex flex-col items-center gap-4">
            {actions.map(action => (
              <DialogTrigger
                key={action.label}
                onClick={action.onClick}
                render={<Button className="w-200" disabled={action.disabled} />}
              >
                {action.label}
              </DialogTrigger>
            ))}
          </div>
        </DialogPopup>
      </Dialog>
    </div>
  );
}
