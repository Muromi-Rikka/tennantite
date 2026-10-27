import type { GuiSpriteName } from "@verdigris/textures";

import { GuiSprite } from "../../containers/gui-sprite/index";
import { gui } from "../../lib/utils";

export interface CroppedProgressProps {
  /**
  * 填充方向：从左/右/上/下开始
  */
  direction?: "down" | "left" | "right" | "up";
  height: number;
  label?: string;
  left: number;
  name: GuiSpriteName;
  progress: number;
  top: number;
  width: number;
}

/**
 * 在原版进度精灵上按比例裁剪（不缩放）。
 */
export function CroppedProgress({
  direction = "left",
  height,
  label,
  left,
  name,
  progress,
  top,
  width,
}: CroppedProgressProps) {
  const ratio = Math.min(1, Math.max(0, progress));
  const clip = clipFor(direction, ratio);
  return (
    <div
      aria-label={label}
      aria-valuemax={1}
      aria-valuemin={0}
      aria-valuenow={ratio}
      className="absolute"
      role={label ? "progressbar" : undefined}
      style={{ height: gui(height), left: gui(left), top: gui(top), width: gui(width) }}
    >
      <GuiSprite
        height={height}
        name={name}
        style={{ clipPath: clip, height: "100%", width: "100%" }}
        width={width}
      />
    </div>
  );
}

export function RecipeBookButton({
  left,
  onClick,
  top,
}: {
  left: number;
  onClick?: () => void;
  top: number;
}) {
  return (
    <button
      aria-label="配方书"
      className="absolute cursor-pointer border-0 bg-transparent p-0"
      onClick={onClick}
      style={{ height: gui(18), left: gui(left), top: gui(top), width: gui(20) }}
      type="button"
    >
      <GuiSprite height={18} name="sprites/recipe_book/button.png" width={20} />
    </button>
  );
}

function clipFor(direction: CroppedProgressProps["direction"], ratio: number): string {
  switch (direction) {
    case "down": { return `inset(0 0 ${(1 - ratio) * 100}% 0)`;
    }
    case "right": { return `inset(0 0 0 ${(1 - ratio) * 100}%)`;
    }
    case "up": { return `inset(${(1 - ratio) * 100}% 0 0 0)`;
    }
    default: { return `inset(0 ${(1 - ratio) * 100}% 0 0)`;
    }
  }
}
