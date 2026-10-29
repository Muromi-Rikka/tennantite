import { ModSprite } from "@tennantite/mods-core";
import { ae2SpriteMeta } from "@tennantite/textures";
import { gui } from "@tennantite/ui";
import { AE2_PRIORITY_TAB } from "../ae2-layout";

export interface Ae2PriorityTabProps {
  /**
  * 可访问名称（默认“优先级”）
  */
  label?: string;
  left: number;
  onClick?: () => void;
  top: number;
}

/**
 * AE2 优先级标签（菜单里注册为 `openPriority` 的角标）：20×20 标签悬在面板
 * 上边线外侧，鼠标悬停或键盘聚焦时换成 22×22 高亮底，图标固定在 (2, 1)。
 * 标签底与图标都裁剪自现代 AE2 `states.png`（`statesModern` 贴图）。
 */
export function Ae2PriorityTab({
  label = "优先级",
  left,
  onClick,
  top,
}: Ae2PriorityTabProps) {
  return (
    <button
      aria-label={label}
      className="group absolute cursor-pointer border-0 bg-transparent p-0"
      onClick={onClick}
      style={{
        height: gui(AE2_PRIORITY_TAB.background.height),
        left: gui(left),
        top: gui(top),
        width: gui(AE2_PRIORITY_TAB.background.width),
      }}
      title={label}
      type="button"
    >
      <ModSprite
        className="group-hover:opacity-0 group-focus-visible:opacity-0"
        left={0}
        sprite={ae2SpriteMeta.statesModern}
        src={AE2_PRIORITY_TAB.background}
        top={0}
      />
      <ModSprite
        className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
        left={0}
        sprite={ae2SpriteMeta.statesModern}
        src={AE2_PRIORITY_TAB.backgroundFocus}
        top={0}
      />
      <ModSprite
        left={AE2_PRIORITY_TAB.iconLeft}
        sprite={ae2SpriteMeta.statesModern}
        src={AE2_PRIORITY_TAB.icon}
        top={AE2_PRIORITY_TAB.iconTop}
      />
    </button>
  );
}
