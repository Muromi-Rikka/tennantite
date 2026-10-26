import type { ScreenSlot } from "../types";
import { Grid } from "../../../containers/grid/index";
import { ItemStack } from "../../../containers/item-stack/index";
import { Panel } from "../../../containers/panel/index";
import { Slot } from "../../../containers/slot/index";
import { TitleBar } from "../../../containers/title-bar/index";
import { cn } from "../../../lib/utils";
import { padSlots } from "../types";

export interface ChestScreenProps {
  className?: string;
  /**
  * 底部玩家快捷栏（可选注入）
  */
  hotbarItems?: ScreenSlot[];
  items?: ScreenSlot[];
  onSlotClick?: (area: "hotbar" | "main", index: number) => void;
  /**
  * 行数：单箱 3、大箱 6（规格 §6.2）
  */
  rows?: 3 | 6;
  selectedIndex?: number;
  title?: React.ReactNode;
}

/**
 * 箱子 / 潜影盒界面（规格 §6.2）。数据注入、无游戏逻辑，RSC 兼容。
*/
export function ChestScreen({
  className,
  hotbarItems = [],
  items = [],
  onSlotClick,
  rows = 3,
  selectedIndex,
  title = "箱子",
}: ChestScreenProps) {
  const count = rows * 9;
  const slots = padSlots(items, count);
  const hotbar = padSlots(hotbarItems, 9);
  return (
    <Panel className={cn("inline-flex flex-col gap-16 p-16", className)}>
      <TitleBar align="start" title={title} />
      <Grid columns={9}>
        {slots.map((item, index) => (
          <Slot
            aria-label={`main-${index}`}
            className="cursor-pointer"
            key={index}
            onClick={() => {
              onSlotClick?.("main", index);
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
        ))}
      </Grid>
      <div className="h-px bg-mc-stone-dark" />
      <Grid columns={9}>
        {hotbar.map((item, index) => (
          <Slot
            aria-label={`hotbar-${index}`}
            className="cursor-pointer"
            key={index}
            onClick={() => {
              onSlotClick?.("hotbar", index);
            }}
            selected={selectedIndex === index ? true : undefined}
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
        ))}
      </Grid>
    </Panel>
  );
}
