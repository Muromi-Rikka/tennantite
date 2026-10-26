"use client";

import { useState } from "react";

import {
  Dialog,
  DialogDescription,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "../../../primitives/dialog/index";
import { Button } from "../../../primitives/button/index";
import type { MenuAction } from "../main-menu/index";
import { cn } from "../../../lib/utils";

export interface PauseMenuProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** 弹窗内按钮栈（回到游戏 / 设置 …） */
  actions?: MenuAction[];
  /** 触发器文案 */
  triggerLabel?: string;
  className?: string;
}

const DEFAULT_ACTIONS: MenuAction[] = [
  { label: "回到游戏" },
  { label: "设置" },
  { label: "保存并退出到标题界面" },
];

/** 暂停菜单（规格 §6.3）：Dialog + 按钮栈，交互经水合增强。 */
export function PauseMenu({
  title = "游戏菜单",
  description,
  actions = DEFAULT_ACTIONS,
  triggerLabel = "打开暂停菜单",
  className,
}: PauseMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn(className)} data-menu="">
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger render={<Button />}>{triggerLabel}</DialogTrigger>
        <DialogPopup>
          <DialogTitle>{title}</DialogTitle>
          {description ? (
            <DialogDescription className="mt-8">{description}</DialogDescription>
          ) : null}
          <div className="mt-24 flex flex-col gap-8">
            {actions.map(action => (
              <DialogTrigger
                key={action.label}
                onClick={action.onClick}
                render={<Button className="w-280" disabled={action.disabled} />}
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
