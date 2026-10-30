/* eslint-disable react/no-array-index-key -- 固定槽位/列表以位置为身份 */
import type { GuiSpriteName } from "@tennantite/textures";
import type { ReactNode } from "react";

import type { ScreenSlot } from "../types";
import { GuiSprite } from "../../../containers/gui-sprite/index";
import { ItemStack } from "../../../containers/item-stack/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { Slot } from "../../../containers/slot/index";
import { gui } from "../../../lib/utils";
import { padSlots } from "../types";

export interface CreativeInventoryScreenProps {
  activeTab?: string;
  className?: string;
  items?: ScreenSlot[];
  onTabSelect?: (id: string) => void;
  tabs?: CreativeTab[];
  title?: ReactNode;
}

export interface CreativeTab {
  icon?: ScreenSlot;
  id: string;
  label: string;
}

const TOP_TABS = 7;
const BOTTOM_TABS = 7;
const TAB_WIDTH = 26;
const TAB_HEIGHT = 32;
const TAB_PITCH = 27;
const PANEL_WIDTH = 195;
const TAB_TOP = 4;
const TAB_BOTTOM = 164;

/**
 * 创造模式物品栏（规格 §6）：195×196，上下各 7 个 26×32 标签 + 9×5 物品网格。
 */
export function CreativeInventoryScreen({
  activeTab,
  className,
  items = [],
  onTabSelect,
  tabs = [],
  title,
}: CreativeInventoryScreenProps) {
  const slots = padSlots(items, 45);
  const selectedIndex = tabs.findIndex(tab => tab.id === activeTab);

  function renderTab(column: number, isTop: boolean, isSelected: boolean) {
    const index = isTop ? column : column + TOP_TABS;
    const tab = tabs[index];
    return (
      <button
        aria-label={tab?.label ?? `标签 ${index + 1}`}
        aria-pressed={isSelected}
        className="absolute cursor-pointer border-0 bg-transparent p-0"
        key={`${isTop ? "top" : "bottom"}-${column}`}
        onClick={() => tab && onTabSelect?.(tab.id)}
        style={{
          height: gui(TAB_HEIGHT),
          left: gui(tabLeft(column)),
          top: gui(isTop ? TAB_TOP : TAB_BOTTOM),
          width: gui(TAB_WIDTH),
        }}
        type="button"
      >
        <GuiSprite
          height={TAB_HEIGHT}
          name={`sprites/container/creative_inventory/tab_${isTop ? "top" : "bottom"}_${isSelected ? "selected" : "unselected"}_${column + 1}.png` as GuiSpriteName}
          width={TAB_WIDTH}
        />
        {tab?.icon
          ? (
              <ItemStack
                bare
                className="pointer-events-none absolute"
                count={tab.icon.count}
                icon={tab.icon.icon}
                size={16}
                src={tab.icon.src}
                style={{ left: gui(5), top: gui(isTop ? 9 : 7) }}
              />
            )
          : null}
      </button>
    );
  }

  return (
    <ScreenPanel className={className} height={196} title={title} width={195}>
      {Array.from({ length: TOP_TABS }, (_, column) =>
        selectedIndex === column ? null : renderTab(column, true, false))}
      {Array.from({ length: BOTTOM_TABS }, (_, column) =>
        selectedIndex === column + TOP_TABS ? null : renderTab(column, false, false))}
      <GuiSprite
        className="pointer-events-none absolute"
        height={136}
        name="container/creative_inventory/tab_items.png"
        src={{ height: 136, width: 195, x: 0, y: 0 }}
        style={{ left: 0, top: gui(32) }}
        width={195}
      />
      {selectedIndex === -1 ? null : renderTab(selectedIndex % TOP_TABS, selectedIndex < TOP_TABS, true)}
      <GuiSprite
        className="absolute"
        height={15}
        name="sprites/container/creative_inventory/scroller.png"
        style={{ left: gui(175), top: gui(50) }}
        width={12}
      />
      {slots.map((item, index) => (
        // react-doctor-disable-next-line react-doctor/no-array-index-as-key —— 位置固定槽位网格，index 即稳定身份
        <Slot
          aria-label={`creative-${index}`}
          bare
          className="absolute"
          key={index}
          size={18}
          style={{
            left: gui(8 + (index % 9) * 18),
            top: gui(49 + Math.floor(index / 9) * 18),
          }}
        >
          {item ? <ItemStack bare {...item} /> : null}
        </Slot>
      ))}
    </ScreenPanel>
  );
}

/**
 * 原版 `CreativeModeTabs.getTabX`：第 5/6 列（index 5/6）靠右对齐。
 */
function tabLeft(column: number): number {
  return column >= 5
    ? PANEL_WIDTH - TAB_PITCH * (7 - column) + 1
    : column * TAB_PITCH;
}
