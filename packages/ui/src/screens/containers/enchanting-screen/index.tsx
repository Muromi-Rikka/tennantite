import type { ScreenSlot } from "../types";
import { ItemStack } from "../../../containers/item-stack/index";
import { Panel } from "../../../containers/panel/index";
import { Slot } from "../../../containers/slot/index";
import { TitleBar } from "../../../containers/title-bar/index";
import { cn } from "../../../lib/utils";
import { Button } from "../../../primitives/button/index";

export interface EnchantingScreenProps {
  availableLevel?: number;
  className?: string;
  /**
  * 待附魔物品（左槽）
  */
  item?: ScreenSlot;
  /**
  * 青金石（右槽）
  */
  lapis?: ScreenSlot;
  onEnchantSelect?: (option: EnchantOption) => void;
  options?: EnchantOption[];
  title?: React.ReactNode;
}

export interface EnchantOption {
  /**
  * 附魔描述（可选，游戏内为隐藏提示）
  */
  label?: string;
  /**
  * 消耗的青金石数量
  */
  lapisCost: number;
  /**
  * 附魔等级（顶部选项 I / II / III）
  */
  level: 1 | 2 | 3;
  /**
  * 消耗的经验等级
  */
  xpCost: number;
}

/**
 * 附魔台界面（规格 §6.2）：物品 + 青金石 + 三档附魔选项（Button 栈）。
*/
export function EnchantingScreen({
  availableLevel = 0,
  className,
  item,
  lapis,
  onEnchantSelect,
  options = [],
  title = "附魔",
}: EnchantingScreenProps) {
  const roman = ["", "I", "II", "III"];
  return (
    <Panel className={cn("inline-flex flex-col gap-16 p-16", className)}>
      <TitleBar align="start" title={title} />
      <div className="flex items-center gap-24">
        <Slot className="cursor-pointer p-1" size={52}>
          {item
            ? (
                <ItemStack
                  count={item.count}
                  icon={item.icon}
                  size={44}
                  src={item.src}
                />
              )
            : null}
        </Slot>
        <Slot aria-label="青金石槽" className="cursor-pointer p-1" size={44}>
          {lapis
            ? (
                <ItemStack
                  count={lapis.count}
                  icon={lapis.icon}
                  size={36}
                  src={lapis.src}
                />
              )
            : null}
        </Slot>
        <div className="flex flex-1 flex-col gap-8">
          {options.map((option) => {
            const isAffordable
              = availableLevel >= option.xpCost
                && (lapis?.count ?? 0) >= option.lapisCost;
            return (
              <Button
                aria-label={`附魔选项 ${roman[option.level]}（消耗 ${option.xpCost} 级与 ${option.lapisCost} 青金石）`}
                disabled={!isAffordable}
                key={option.level}
                onClick={() => {
                  onEnchantSelect?.(option);
                }}
                size="sm"
                variant={isAffordable ? "success" : "default"}
              >
                {roman[option.level]}
                {" "}
                ·
                {option.lapisCost}
                {" "}
                青金石 ·
                {option.xpCost}
                {" "}
                级
              </Button>
            );
          })}
        </div>
      </div>
    </Panel>
  );
}
