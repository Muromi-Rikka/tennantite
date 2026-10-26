import { Button } from "../../../primitives/button/index";
import { cn } from "../../../lib/utils";

export interface MenuAction {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface MainMenuProps {
  /** 游戏标题（Logo 位） */
  title?: React.ReactNode;
  /** 菜单按钮栈（单机 / 联机 / 设置 …，规格 §6.3） */
  actions?: MenuAction[];
  className?: string;
}

const DEFAULT_ACTIONS: MenuAction[] = [
  { label: "单人游戏" },
  { label: "多人游戏" },
  { label: "设置" },
  { label: "退出游戏" },
];

/** 主菜单（规格 §6.3）：Logo + Button 栈，静态成立。 */
export function MainMenu({
  title = "VERDIGRIS",
  actions = DEFAULT_ACTIONS,
  className,
}: MainMenuProps) {
  return (
    <div
      className={cn("flex w-320 flex-col items-center gap-8", className)}
      data-menu=""
    >
      <h1 className="mc-text-shadow mb-24 font-pixel text-mc-lg text-white">
        {title}
      </h1>
      {actions.map(action => (
        <Button
          className="w-280"
          disabled={action.disabled}
          key={action.label}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      ))}
      <p className="mt-24 font-readable text-mc text-mc-text-dim">
        v0.1.0 · 非 Mojang 官方产品
      </p>
    </div>
  );
}
