import type { ReactNode } from "react";

import { GuiSprite } from "../../../containers/gui-sprite/index";
import { cn, gui } from "../../../lib/utils";
import { Button } from "../../../primitives/button/index";

export interface MainMenuProps {
  actions?: MenuAction[];
  background?: ReactNode;
  className?: string;
  onAccessibility?: () => void;
  onLanguage?: () => void;
  showRealms?: boolean;
  splash?: ReactNode;
  title?: ReactNode;
  titleAs?: "h1" | "h2" | "p";
}

export interface MenuAction {
  disabled?: boolean;
  label: string;
  onClick?: () => void;
  variant?: "default" | "realms";
}

const DEFAULT_ACTIONS: MenuAction[] = [
  { label: "单人游戏" },
  { label: "多人游戏" },
  { label: "Minecraft Realms", variant: "realms" },
  { label: "选项…" },
  { label: "退出游戏" },
];

/**
 * 主菜单（规格 §6.3）：400×240 全景背景 + 原版 logo/edition + 200×20 按钮栈。
 */
export function MainMenu({
  actions = DEFAULT_ACTIONS,
  background,
  className,
  onAccessibility,
  onLanguage,
  showRealms = true,
  splash,
  title = "TENNANTITE",
  titleAs = "h1",
}: MainMenuProps) {
  const TitleTag = titleAs;
  const isCustomTitle = title !== "TENNANTITE";
  const topActions = actions.slice(0, 3);
  const bottomActions = actions.slice(3, 5);
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      data-menu=""
      style={{ height: gui(240), width: gui(400) }}
    >
      {background
        ? <div className="absolute inset-0">{background}</div>
        : (
            <GuiSprite
              className="absolute inset-0"
              height={240}
              name="title/background/panorama_0.png"
              width={400}
            />
          )}
      {isCustomTitle
        ? <div className="absolute inset-x-0 top-8 text-center font-mc mc-text text-white mc-text-shadow">{title}</div>
        : (
            <>
              <GuiSprite
                className="absolute"
                height={44}
                name="title/minecraft.png"
                src={{ height: 176, width: 1024, x: 0, y: 0 }}
                style={{ left: gui(72), top: gui(30) }}
                width={256}
              />
              <GuiSprite
                className="absolute"
                height={14}
                name="title/edition.png"
                src={{ height: 56, width: 512, x: 0, y: 0 }}
                style={{ left: gui(136), top: gui(67) }}
                width={128}
              />
              <TitleTag className="sr-only">{title}</TitleTag>
            </>
          )}
      {splash
        ? (
            <div
              className="absolute rotate-[-20deg] font-mc mc-text text-mc-yellow mc-text-shadow"
              style={{ left: gui(280), top: gui(70) }}
            >
              {splash}
            </div>
          )
        : null}
      {topActions.map((action, index) => (
        <Button
          className="absolute w-200"
          disabled={action.disabled}
          key={action.label}
          onClick={action.onClick}
          style={{ left: gui(100), top: gui(108 + index * 24) }}
          variant={action.variant ?? "default"}
        >
          {action.label}
        </Button>
      ))}
      {bottomActions[0]
        ? (
            <Button
              className="absolute w-98"
              disabled={bottomActions[0].disabled}
              onClick={bottomActions[0].onClick}
              style={{ left: gui(100), top: gui(192) }}
            >
              {bottomActions[0].label}
            </Button>
          )
        : null}
      {showRealms || bottomActions[1]
        ? (
            <Button
              className="absolute w-98"
              onClick={bottomActions[1]?.onClick}
              style={{ left: gui(202), top: gui(192) }}
            >
              {bottomActions[1]?.label ?? "Realms"}
            </Button>
          )
        : null}
      <Button
        aria-label="语言"
        className="absolute w-20"
        onClick={onLanguage}
        style={{ left: gui(76), top: gui(192) }}
      >
        <GuiSprite height={15} name="sprites/icon/language.png" width={15} />
      </Button>
      <Button
        aria-label="无障碍"
        className="absolute w-20"
        onClick={onAccessibility}
        style={{ left: gui(304), top: gui(192) }}
      >
        <GuiSprite height={15} name="sprites/icon/accessibility.png" width={15} />
      </Button>
    </div>
  );
}
