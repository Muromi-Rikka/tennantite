import type { ScreenSlot } from "../types";
import { ItemStack } from "../../../containers/item-stack/index";
import { Panel } from "../../../containers/panel/index";
import { Slot } from "../../../containers/slot/index";
import { TitleBar } from "../../../containers/title-bar/index";
import { cn } from "../../../lib/utils";
import { padSlots } from "../types";

export interface CraftingScreenProps {
  className?: string;
  /**
  * 3×3 合成格（规格 §6.2）
  */
  craftItems?: ScreenSlot[];
  craftResult?: ScreenSlot;
  /**
  * 底部玩家快捷栏（可选注入）
  */
  hotbarItems?: ScreenSlot[];
  onSlotClick?: (area: "craft" | "craft-result" | "hotbar", index: number) => void;
  selectedIndex?: number;
  title?: React.ReactNode;
}

/**
 * 工作台界面（规格 §6.2）：3×3 Grid + 产物槽 + 箭头指示。
*/
export function CraftingScreen({
  className,
  craftItems = [],
  craftResult = null,
  hotbarItems = [],
  onSlotClick,
  selectedIndex,
  title = "合成",
}: CraftingScreenProps) {
  const craft = padSlots(craftItems, 9);
  const hotbar = padSlots(hotbarItems, 9);
  return (
    <Panel className={cn("inline-flex flex-col gap-16 p-16", className)}>
      <TitleBar align="start" title={title} />
      <div className="flex items-center gap-24">
        <div className="grid grid-cols-3 gap-4">
          {craft.map((item, index) => (
            <Slot
              aria-label={`craft-${index}`}
              className="cursor-pointer"
              key={index}
              onClick={() => {
                onSlotClick?.("craft", index);
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
        </div>
        <span aria-hidden="true" className="font-readable text-mc-lg text-mc-text-dim">
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
      <div className="h-px bg-mc-stone-dark" />
      <div className="grid grid-cols-9 gap-4">
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
      </div>
    </Panel>
  );
}
