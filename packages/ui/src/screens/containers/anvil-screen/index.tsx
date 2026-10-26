import type { ScreenSlot } from "../types";
import { ItemStack } from "../../../containers/item-stack/index";
import { Panel } from "../../../containers/panel/index";
import { Slot } from "../../../containers/slot/index";
import { TitleBar } from "../../../containers/title-bar/index";
import { cn } from "../../../lib/utils";
import { Input } from "../../../primitives/input/index";

export interface AnvilScreenProps {
  className?: string;
  defaultValue?: string;
  /**
  * 目标物品（左槽）
  */
  item?: ScreenSlot;
  /**
  * 经验费用
  */
  levelCost?: number;
  /**
  * 材料 / 附魔书（右槽）
  */
  material?: ScreenSlot;
  onNameChange?: (name: string) => void;
  onTakeResult?: () => void;
  /**
  * 产物（可选注入：改名 / 合并结果由使用方计算，规格 §8.2）
  */
  result?: ScreenSlot;
  title?: React.ReactNode;
  /**
  * 名称输入（受控可选）
  */
  value?: string;
}

/**
 * 铁砧界面（规格 §6.2）：Input 改名 + 物品/材料/产物槽 + 等级费用。
*/
export function AnvilScreen({
  className,
  defaultValue,
  item,
  levelCost = 0,
  material,
  onNameChange,
  onTakeResult,
  result,
  title = "修理",
  value,
}: AnvilScreenProps) {
  return (
    <Panel className={cn("inline-flex flex-col gap-16 p-16", className)}>
      <TitleBar align="start" title={title} />
      <Input
        aria-label="物品名称"
        defaultValue={defaultValue}
        onChange={(event) => {
          onNameChange?.(event.target.value);
        }}
        placeholder="输入新名称…"
        value={value}
      />
      <div className="flex items-center gap-24">
        <Slot aria-label="anvil-item" className="cursor-pointer p-1" size={48}>
          {item
            ? (
                <ItemStack
                  count={item.count}
                  icon={item.icon}
                  size={40}
                  src={item.src}
                />
              )
            : null}
        </Slot>
        <span aria-hidden="true" className="font-readable text-mc text-mc-text-dim">
          +
        </span>
        <Slot aria-label="anvil-material" className="cursor-pointer p-1" size={48}>
          {material
            ? (
                <ItemStack
                  count={material.count}
                  icon={material.icon}
                  size={40}
                  src={material.src}
                />
              )
            : null}
        </Slot>
        <span aria-hidden="true" className="font-readable text-mc text-mc-text-dim">
          =
        </span>
        <Slot
          aria-label="anvil-result"
          className="cursor-pointer p-1"
          onClick={onTakeResult}
          size={56}
        >
          {result
            ? (
                <ItemStack
                  count={result.count}
                  icon={result.icon}
                  size={48}
                  src={result.src}
                />
              )
            : null}
        </Slot>
        <span className="font-readable text-mc text-mc-accent-green mc-text-shadow">
          {levelCost}
          {" "}
          级
        </span>
      </div>
    </Panel>
  );
}
