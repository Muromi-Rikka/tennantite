/* eslint-disable react/no-array-index-key -- 固定槽位/列表以位置为身份 */
import type { GuiSpriteName } from "@verdigris/textures";
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
  return (
    <ScreenPanel className={className} height={196} title={title} width={195}>
      <GuiSprite
        className="absolute"
        height={136}
        name="container/creative_inventory/tab_items.png"
        style={{ left: 0, top: gui(32) }}
        width={195}
      />
      {Array.from({ length: TOP_TABS }, (_, index) => {
        const tab = tabs[index];
        const selected = tab && tab.id === activeTab;
        return (
          <button
            aria-label={tab?.label ?? `标签 ${index + 1}`}
            aria-pressed={selected}
            className="absolute cursor-pointer border-0 bg-transparent p-0"
            key={`top-${index}`}
            onClick={() => tab && onTabSelect?.(tab.id)}
            style={{ height: gui(32), left: gui(index * 27), top: gui(selected ? 0 : 4), width: gui(26) }}
            type="button"
          >
            <GuiSprite
              height={32}
              name={`sprites/container/creative_inventory/tab_top_${selected ? "selected" : "unselected"}_${index + 1}.png` as GuiSpriteName}
              width={26}
            />
          </button>
        );
      })}
      {Array.from({ length: BOTTOM_TABS }, (_, index) => {
        const tab = tabs[index + TOP_TABS];
        const selected = tab && tab.id === activeTab;
        return (
          <button
            aria-label={tab?.label ?? `标签 ${index + 8}`}
            aria-pressed={selected}
            className="absolute cursor-pointer border-0 bg-transparent p-0"
            key={`bottom-${index}`}
            onClick={() => tab && onTabSelect?.(tab.id)}
            style={{ height: gui(32), left: gui(index * 27), top: gui(164), width: gui(26) }}
            type="button"
          >
            <GuiSprite
              height={32}
              name={`sprites/container/creative_inventory/tab_bottom_${selected ? "selected" : "unselected"}_${index + 1}.png` as GuiSpriteName}
              width={26}
            />
          </button>
        );
      })}
      <GuiSprite
        className="absolute"
        height={15}
        name="sprites/container/creative_inventory/scroller.png"
        style={{ left: gui(175), top: gui(50) }}
        width={12}
      />
      {slots.map((item, index) => (
        <Slot
          aria-label={`creative-${index}`}
          bare
          className="absolute"
          key={index}
          size={18}
          style={{
            left: gui(9 + (index % 9) * 18),
            top: gui(49 + Math.floor(index / 9) * 18),
          }}
        >
          {item ? <ItemStack bare {...item} /> : null}
        </Slot>
      ))}
    </ScreenPanel>
  );
}
