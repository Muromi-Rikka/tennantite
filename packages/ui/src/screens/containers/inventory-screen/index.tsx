import type { ReactNode } from "react";
import type { ScreenSlot } from "../types";
import { Grid } from "../../../containers/grid/index";
import { ItemStack } from "../../../containers/item-stack/index";
import { Panel } from "../../../containers/panel/index";
import { Slot } from "../../../containers/slot/index";
import { TitleBar } from "../../../containers/title-bar/index";
import { cn } from "../../../lib/utils";

export interface InventoryScreenProps {
  /**
  * 盔甲 4 格
  */
  armorItems?: ScreenSlot[];
  className?: string;
  /**
  * 合成 2×2
  */
  craftItems?: ScreenSlot[];
  /**
  * 合成产物
  */
  craftResult?: ScreenSlot;
  /**
  * 快捷栏 9 格
  */
  hotbarItems?: ScreenSlot[];
  /**
  * 主背包 27 格（3×9）
  */
  mainItems?: ScreenSlot[];
  onSlotClick?: (area: "armor" | "craft" | "craft-result" | "hotbar" | "main", index: number) => void;
  selectedIndex?: number;
  title?: ReactNode;
}

/**
 * 物品栏界面（规格 §6.2）：Dialog/Panel + Slot/Grid + ItemStack 编排，
 * 数据注入、无游戏逻辑。RSC 兼容（纯展示 + 可选回调）。
 */
export function InventoryScreen({
  armorItems = [],
  className,
  craftItems = [],
  craftResult = null,
  hotbarItems = [],
  mainItems = [],
  onSlotClick,
  selectedIndex,
  title = "物品栏",
}: InventoryScreenProps) {
  return (
    <Panel className={cn("inline-flex flex-col gap-16 p-16", className)}>
      <TitleBar align="start" title={title} />
      <div className="flex gap-16">
        <div className="grid grid-cols-1 gap-4">
          {Array.from({ length: 4 }, (_, index) => {
            const item = armorItems[index];
            return (
              <Slot
                aria-label={`armor-${index}`}
                className="cursor-pointer"
                key={index}
                onClick={() => {
                  onSlotClick?.("armor", index);
                }}
                size={44}
              >
                {item
                  ? (
                      <ItemStack
                        count={item.count}
                        icon={item.icon}
                        size={36}
                        src={item.src}
                      />
                    )
                  : null}
              </Slot>
            );
          })}
        </div>
        <div className="flex flex-1 flex-col items-end gap-16">
          <div className="flex items-center gap-16">
            <SlotGroup
              area="craft"
              columns={2}
              count={4}
              items={craftItems}
              onSlotClick={onSlotClick}
            />
            <span aria-hidden="true" className="font-readable text-mc text-mc-text-dim">
              →
            </span>
            <Slot
              aria-label="craft-result-0"
              className="cursor-pointer"
              onClick={() => {
                onSlotClick?.("craft-result", 0);
              }}
              size={52}
            >
              {craftResult
                ? (
                    <ItemStack
                      count={craftResult.count}
                      icon={craftResult.icon}
                      size={44}
                      src={craftResult.src}
                    />
                  )
                : null}
            </Slot>
          </div>
          <SlotGroup
            area="main"
            columns={9}
            count={27}
            items={mainItems}
            onSlotClick={onSlotClick}
            selectedIndex={selectedIndex}
          />
          <SlotGroup
            area="hotbar"
            columns={9}
            count={9}
            items={hotbarItems}
            onSlotClick={onSlotClick}
            selectedIndex={selectedIndex}
          />
        </div>
      </div>
    </Panel>
  );
}

function SlotGroup({
  area,
  columns,
  count,
  items,
  onSlotClick,
  selectedIndex,
}: {
  area: "armor" | "craft" | "hotbar" | "main";
  columns: number;
  count: number;
  items: ScreenSlot[];
  onSlotClick?: InventoryScreenProps["onSlotClick"];
  selectedIndex?: number;
}) {
  return (
    <Grid columns={columns}>
      {Array.from({ length: count }, (_, index) => {
        const item = items[index];
        const selected
          = area === "hotbar" && selectedIndex === index
            ? true
            : undefined;
        return (
          <Slot
            aria-label={`${area}-${index}`}
            className={cn("cursor-pointer", item ? "p-1" : undefined)}
            key={index}
            onClick={() => {
              onSlotClick?.(area, index);
            }}
            selected={selected}
            size={44}
          >
            {item
              ? (
                  <ItemStack
                    count={item.count}
                    icon={item.icon}
                    size={36}
                    src={item.src}
                  />
                )
              : null}
          </Slot>
        );
      })}
    </Grid>
  );
}
