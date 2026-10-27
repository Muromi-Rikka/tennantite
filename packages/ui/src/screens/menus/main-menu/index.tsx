import type { ReactNode } from "react";

import { cn } from "../../../lib/utils";
import { Button } from "../../../primitives/button/index";

export interface MainMenuProps {
  /**
  * 菜单按钮栈（单机 / 联机 / 设置 …，规格 §6.3）
  */
  actions?: MenuAction[];
  /**
  * 自定义背景层（提供后替换默认泥土纹理层）
  */
  background?: ReactNode;
  className?: string;
  /**
  * 游戏标题（Logo 位）
  */
  title?: ReactNode;
}

export interface MenuAction {
  disabled?: boolean;
  label: string;
  onClick?: () => void;
}

const DEFAULT_ACTIONS: MenuAction[] = [
  { label: "单人游戏" },
  { label: "多人游戏" },
  { label: "设置" },
  { label: "退出游戏" },
];

/**
 * 主菜单（规格 §6.3）：泥土背景 + 标题 + 200×20 按钮栈，静态成立。
*/
export function MainMenu({
  actions = DEFAULT_ACTIONS,
  background,
  className,
  title = "VERDIGRIS",
}: MainMenuProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-full w-full flex-col items-center justify-center gap-4",
        !background && "mc-tex-dirt",
        className,
      )}
      data-menu=""
    >
      {background
        ? (
            <div aria-hidden className="absolute inset-0">
              {background}
            </div>
          )
        : <div aria-hidden className="absolute inset-0 bg-black/40" />}
      <h1 className="relative font-mc mc-text text-white mc-text-shadow">
        {title}
      </h1>
      {actions.map(action => (
        <Button
          className="relative w-200"
          disabled={action.disabled}
          key={action.label}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      ))}
      <p className="relative font-mc mc-text text-mc-text-dim">
        v0.1.0 · 非 Mojang 官方产品
      </p>
    </div>
  );
}
