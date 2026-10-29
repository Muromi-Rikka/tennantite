import { ModSprite } from "@tennantite/mods-core";
import { ic2SpriteMeta } from "@tennantite/textures";
import { gui } from "@tennantite/ui";

import type { Ic2RedstoneMode } from "../ic2-types";

const REDSTONE_ORDER: Ic2RedstoneMode[] = ["normal", "inverted", "none"];

const REDSTONE_LABEL: Record<Ic2RedstoneMode, string> = {
  inverted: "红石模式：反向",
  none: "红石模式：忽略",
  normal: "红石模式：普通",
};

export interface Ic2RedstoneButtonProps {
  /**
  * 可访问名称；默认按当前模式描述（悬浮提示同文案）
  */
  label?: string;
  left: number;
  /**
  * 当前红石模式
  */
  mode?: Ic2RedstoneMode;
  /**
  * 切换回调（普通 → 反向 → 忽略循环）；省略时为纯展示
  */
  onChange?: (mode: Ic2RedstoneMode) => void;
  top: number;
}

/**
 * IC2 红石模式按钮（20×20 原版按钮 + 16×16 红石粉图标），
 * 悬浮提示用原生 title（避免与 Tooltip 触发器嵌套出 button-in-button）。
 */
export function Ic2RedstoneButton({
  label,
  left,
  mode = "normal",
  onChange,
  top,
}: Ic2RedstoneButtonProps) {
  const text = label ?? REDSTONE_LABEL[mode];
  const cycle = () => {
    if (!onChange) {
      return;
    }
    const next = REDSTONE_ORDER[(REDSTONE_ORDER.indexOf(mode) + 1) % REDSTONE_ORDER.length];
    onChange(next ?? "normal");
  };
  return (
    <button
      aria-label={text}
      className="mc-tex-ic2-btn absolute cursor-pointer border-0 p-0"
      onClick={onChange ? cycle : undefined}
      style={{ height: gui(20), left: gui(left), top: gui(top), width: gui(20) }}
      title={text}
      type="button"
    >
      <ModSprite
        left={2}
        sprite={ic2SpriteMeta.redstone}
        src={{ height: 16, width: 16, x: 0, y: 0 }}
        top={2}
      />
    </button>
  );
}
