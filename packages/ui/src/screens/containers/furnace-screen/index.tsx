import type { ScreenSlot } from "../types";
import { ItemStack } from "../../../containers/item-stack/index";
import { Panel } from "../../../containers/panel/index";
import { Slot } from "../../../containers/slot/index";
import { TitleBar } from "../../../containers/title-bar/index";
import { cn } from "../../../lib/utils";
import { Progress } from "../../../primitives/progress/index";

export interface FurnaceScreenProps {
  /**
  * 燃烧进度 0..1（火焰）
  */
  burnProgress?: number;
  className?: string;
  /**
  * 熔炼进度 0..1（箭头）
  */
  cookProgress?: number;
  /**
  * 燃料（下格）
  */
  fuel?: ScreenSlot;
  /**
  * 待熔炼物（上格）
  */
  input?: ScreenSlot;
  /**
  * 产物槽位点击
  */
  onTakeOutput?: () => void;
  /**
  * 产物（右侧）
  */
  output?: ScreenSlot;
  title?: React.ReactNode;
}

/**
 * 熔炉界面（规格 §6.2）：输入 / 燃料 / 产物 + 双进度（火焰与箭头）。
*/
export function FurnaceScreen({
  burnProgress = 0,
  className,
  cookProgress = 0,
  fuel,
  input,
  onTakeOutput,
  output,
  title = "熔炉",
}: FurnaceScreenProps) {
  return (
    <Panel className={cn("inline-flex flex-col gap-16 p-16", className)}>
      <TitleBar align="start" title={title} />
      <div className="flex items-center gap-24">
        <div className="flex flex-col items-center gap-8">
          <ItemSlot item={input} label="furnace-input" />
          <Progress
            aria-label="燃料燃烧进度"
            className="w-24"
            value={burnProgress}
            variant="fuel"
          />
          <ItemSlot item={fuel} label="furnace-fuel" />
        </div>
        <Progress
          aria-label="熔炼进度"
          className="w-100"
          value={cookProgress}
          variant="default"
        />
        <ItemSlot item={output} label="furnace-output" onClick={onTakeOutput} size={52} />
      </div>
    </Panel>
  );
}

function ItemSlot({
  item,
  label,
  onClick,
  size = 44,
}: {
  item?: ScreenSlot;
  label: string;
  onClick?: () => void;
  size?: number;
}) {
  return (
    <Slot
      aria-label={label}
      className={cn("cursor-pointer", item ? "p-1" : undefined)}
      onClick={onClick}
      size={size}
    >
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
