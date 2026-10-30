import type { InventoryItem } from "@tennantite/ui";

import { ModIconButton, ModSprite } from "@tennantite/mods-core";
import { createSpriteMeta } from "@tennantite/textures";
import { cn, gui, PlayerInventory } from "@tennantite/ui";

import { CREATE_ATLAS, CREATE_ICONS, CREATE_PACKAGE_FILTER } from "../create-metrics";

export interface CreatePackageFilterScreenProps {
  /**
   * 包裹地址（上游 AddressEditBox，白字无框）
   */
  address?: string;
  className?: string;
  onAddressChange?: (address: string) => void;
  onConfirm?: () => void;
  onReset?: () => void;
  player?: {
    hotbarItems?: (InventoryItem | null | undefined)[];
    mainItems?: (InventoryItem | null | undefined)[];
  };
  title?: string;
}

/**
 * Create 包裹过滤器界面（`PackageFilterScreen` 视觉复刻）：filters_2 背板 +
 * 地址输入框 + 右下重置/确认按钮 + 玩家背包。上游无幽灵槽与黑白名单按钮
 * （`PackageFilterMenu.addFilterSlots` 为空）；(16,23) 处的上游手持包裹 3D
 * 物品渲染无贴图同步，省略。数据注入、无过滤逻辑。
 */
export function CreatePackageFilterScreen({
  address = "",
  className,
  onAddressChange,
  onConfirm,
  onReset,
  player,
  title = "包裹过滤器",
}: CreatePackageFilterScreenProps) {
  const layout = CREATE_PACKAGE_FILTER;
  const background = CREATE_ATLAS.packageFilter;
  const icons = CREATE_ICONS;
  return (
    <div
      className={cn("mc-create-window relative inline-block", className)}
      style={{ height: gui(layout.height), width: gui(layout.width) }}
    >
      <ModSprite left={0} sprite={createSpriteMeta[background.atlas]} src={background} top={0} />
      <div
        className="absolute text-center font-mc mc-text"
        style={{ color: "#3d3c48", left: 0, top: gui(layout.title.top), width: gui(layout.width) }}
      >
        {title}
      </div>
      <input
        aria-label="地址"
        className="absolute bg-transparent font-mc mc-text outline-none"
        defaultValue={address}
        onChange={onAddressChange ? event => onAddressChange(event.currentTarget.value) : undefined}
        style={{
          color: "#ffffff",
          height: gui(9),
          left: gui(layout.address.left),
          outline: "none",
          top: gui(layout.address.top),
          width: gui(layout.address.width),
        }}
        type="text"
      />
      <ModIconButton
        buttonClassName="bg-transparent"
        height={18}
        icon={<ModSprite sprite={createSpriteMeta.icons} src={{ height: 16, width: 16, x: icons.trash.x, y: icons.trash.y }} />}
        label="清空"
        left={layout.buttons.reset.left}
        onClick={onReset}
        top={layout.buttons.reset.top}
        width={18}
      />
      <ModIconButton
        buttonClassName="bg-transparent"
        height={18}
        icon={<ModSprite sprite={createSpriteMeta.icons} src={{ height: 16, width: 16, x: icons.confirm.x, y: icons.confirm.y }} />}
        label="确认"
        left={layout.buttons.confirm.left}
        onClick={onConfirm}
        top={layout.buttons.confirm.top}
        width={18}
      />
      <PlayerInventory
        hotbarItems={player?.hotbarItems}
        hotbarY={layout.player.hotbarY}
        mainItems={player?.mainItems}
        x={layout.player.x}
        y={layout.player.y}
      />
    </div>
  );
}
