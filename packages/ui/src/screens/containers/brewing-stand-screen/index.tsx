import type { ScreenSlot } from "../types";
import { ItemStack } from "../../../containers/item-stack/index";
import { Panel } from "../../../containers/panel/index";
import { Slot } from "../../../containers/slot/index";
import { TitleBar } from "../../../containers/title-bar/index";
import { cn } from "../../../lib/utils";
import { Progress } from "../../../primitives/progress/index";

export interface BrewingStandScreenProps {
  /**
  * 酿造燃料（烈焰粉）
  */
  blazeFuel?: ScreenSlot;
  /**
  * 下方 3 个药水瓶位
  */
  bottles?: ScreenSlot[];
  /**
  * 酿造进度 0..1
  */
  brewProgress?: number;
  className?: string;
  /**
  * 顶部原料槽
  */
  ingredient?: ScreenSlot;
  title?: React.ReactNode;
}

/**
 * 酿造台界面（规格 §6.2）：原料 + 三瓶位 + 燃料 + 酿造进度。
*/
export function BrewingStandScreen({
  blazeFuel,
  bottles = [],
  brewProgress = 0,
  className,
  ingredient,
  title = "酿造台",
}: BrewingStandScreenProps) {
  const slots = [bottles[0], bottles[1], bottles[2]];
  return (
    <Panel className={cn("inline-flex flex-col gap-16 p-16", className)}>
      <TitleBar align="start" title={title} />
      <div className="flex flex-col items-center gap-16">
        <ItemSlot item={ingredient} label="brewing-ingredient" />
        <Progress
          aria-label="酿造进度"
          className="w-160"
          value={brewProgress}
          variant="default"
        />
        <div className="flex items-end gap-16">
          {slots.map((item, index) => (
            <ItemSlot item={item} key={index} label={`brewing-bottle-${index}`} />
          ))}
        </div>
        <ItemSlot item={blazeFuel} label="brewing-fuel" size={36} />
      </div>
    </Panel>
  );
}

function ItemSlot({
  item,
  label,
  size = 44,
}: {
  item?: ScreenSlot;
  label: string;
  size?: number;
}) {
  return (
    <Slot aria-label={label} className={cn("cursor-pointer", item ? "p-1" : undefined)} size={size}>
      {item
        ? (
            <ItemStack
              count={item.count}
              icon={item.icon}
              size={size - 8}
              src={item.src}
            />
          )
        : null}
    </Slot>
  );
}
