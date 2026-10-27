"use client";

import { useState } from "react";

import type { MenuAction } from "../main-menu/index";
import { GuiSprite } from "../../../containers/gui-sprite/index";
import { cn, gui } from "../../../lib/utils";
import { Button } from "../../../primitives/button/index";
import {
  Dialog,
  DialogPopup,
  DialogTrigger,
} from "../../../primitives/dialog/index";
import { MenuBackground } from "../menu-background/index";

export interface PauseMenuProps {
  actions?: MenuAction[];
  className?: string;
  description?: React.ReactNode;
  title?: React.ReactNode;
  triggerLabel?: string;
}

const DEFAULT_ACTIONS: MenuAction[] = [
  { label: "回到游戏" },
  { label: "成就" },
  { label: "统计" },
  { label: "反馈" },
  { label: "选项…" },
  { label: "保存并退出到标题界面" },
];

/**
 * 暂停菜单（规格 §6.3）：320×200 游戏内菜单背景 + 原版按钮坐标。
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
          <MenuBackground
            className="flex flex-col items-center"
            style={{ height: gui(200), width: gui(320) }}
            variant="inworld"
          >
            {title
              ? (
                  <div className="mt-6 font-mc mc-text text-mc-text-main mc-text-shadow">
                    {title}
                  </div>
                )
              : null}
            {description
              ? <div className="mt-2 font-mc mc-text text-mc-text-dim">{description}</div>
              : null}
            {actions.slice(0, 3).map((action, index) => (
              <Button
                className="absolute w-204"
                disabled={action.disabled}
                key={action.label}
                onClick={action.onClick}
                style={{ left: gui(58), top: gui(40 + index * 24) }}
              >
                {action.label}
              </Button>
            ))}
            <div className="absolute flex gap-4" style={{ left: gui(58), top: gui(112) }}>
              {actions.slice(3, 5).map(action => (
                <Button
                  className="w-98"
                  disabled={action.disabled}
                  key={action.label}
                  onClick={action.onClick}
                >
                  {action.label}
                </Button>
              ))}
            </div>
            {actions[5]
              ? (
                  <Button
                    className="absolute w-204"
                    onClick={actions[5].onClick}
                    style={{ left: gui(58), top: gui(152) }}
                  >
                    {actions[5].label}
                  </Button>
                )
              : null}
            <div className="absolute flex gap-4" style={{ bottom: gui(8) }}>
              <GuiSprite height={20} name="sprites/icon/language.png" width={20} />
              <GuiSprite height={20} name="sprites/pause_menu/player_reporting.png" width={20} />
              <GuiSprite height={20} name="sprites/pause_menu/bug.png" width={20} />
            </div>
          </MenuBackground>
        </DialogPopup>
      </Dialog>
    </div>
  );
}
