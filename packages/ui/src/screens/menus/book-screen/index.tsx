import type { ReactNode } from "react";

import { GuiSprite } from "../../../containers/gui-sprite/index";
import { cn, gui } from "../../../lib/utils";

export interface BookScreenProps {
  className?: string;
  onPage?: (direction: "next" | "previous") => void;
  pages?: [ReactNode, ReactNode];
}

/**
 * 书与笔界面（规格 §6.3）：`book.png` 146×180 内容区，左右页。
 */
export function BookScreen({ className, onPage, pages = [null, null] }: BookScreenProps) {
  return (
    <div
      className={cn("relative", className)}
      style={{ height: gui(180), width: gui(146) }}
    >
      <GuiSprite
        className="absolute inset-0"
        height={180}
        name="book.png"
        src={{ height: 180, width: 146, x: 20, y: 1 }}
        width={146}
      />
      <div
        className="absolute overflow-hidden font-mc mc-text text-mc-text-main"
        style={{ height: gui(128), left: gui(16), top: gui(16), width: gui(60) }}
      >
        {pages[0]}
      </div>
      <div
        className="absolute overflow-hidden font-mc mc-text text-mc-text-main"
        style={{ height: gui(128), left: gui(76), top: gui(16), width: gui(54) }}
      >
        {pages[1]}
      </div>
      <button
        aria-label="上一页"
        className="absolute cursor-pointer border-0 bg-transparent p-0"
        onClick={() => onPage?.("previous")}
        style={{ height: gui(17), left: gui(56), top: gui(158), width: gui(12) }}
        type="button"
      >
        <GuiSprite height={17} name="sprites/widget/page_backward.png" width={12} />
      </button>
      <button
        aria-label="下一页"
        className="absolute cursor-pointer border-0 bg-transparent p-0"
        onClick={() => onPage?.("next")}
        style={{ height: gui(17), left: gui(78), top: gui(158), width: gui(12) }}
        type="button"
      >
        <GuiSprite height={17} name="sprites/widget/page_forward.png" width={12} />
      </button>
    </div>
  );
}
