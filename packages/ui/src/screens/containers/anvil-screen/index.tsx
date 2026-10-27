import type { ReactNode } from "react";

import type { ScreenSlot } from "../types";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { gui } from "../../../lib/utils";
import { Input } from "../../../primitives/input/index";
import { ScreenItemSlot } from "../screen-slot";

export interface AnvilScreenProps {
  className?: string;
  defaultValue?: string;
  /**
  * 目标物品（左槽 (26,46)）
  */
  item?: ScreenSlot;
  /**
  * 经验费用
  */
  levelCost?: number;
  /**
  * 材料 / 附魔书（右槽 (75,46)）
  */
  material?: ScreenSlot;
  onNameChange?: (name: string) => void;
  onTakeResult?: () => void;
  /**
  * 产物（可选注入：改名 / 合并结果由使用方计算，规格 §8.2）
  */
  result?: ScreenSlot;
  title?: ReactNode;
  /**
  * 名称输入（受控可选）
  */
  value?: string;
}

/**
 * 铁砧界面（规格 §6）：110×16 名称输入 + 物品/材料/产物槽 + 等级费用。
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
    <ScreenPanel className={className} height={166} title={title} width={176}>
      <Input
        aria-label="物品名称"
        className="absolute h-16 w-110"
        defaultValue={defaultValue}
        onChange={(event) => {
          onNameChange?.(event.target.value);
        }}
        placeholder="输入新名称…"
        style={{ left: gui(27), top: gui(23) }}
        value={value}
      />
      <ScreenItemSlot item={item} label="anvil-item" left={26} top={46} />
      <span
        aria-hidden="true"
        className="absolute font-mc mc-text text-mc-text-dim"
        style={{ left: gui(48), top: gui(47) }}
      >
        +
      </span>
      <ScreenItemSlot item={material} label="anvil-material" left={75} top={46} />
      <span
        aria-hidden="true"
        className="absolute font-mc mc-text text-mc-text-dim"
        style={{ left: gui(97), top: gui(47) }}
      >
        →
      </span>
      <ScreenItemSlot
        item={result}
        label="anvil-result"
        left={133}
        onActivate={onTakeResult}
        top={46}
      />
      <span
        className="absolute font-mc mc-text text-mc-accent-green mc-text-shadow"
        style={{ left: gui(136), top: gui(68) }}
      >
        {levelCost}
        {" 级"}
      </span>
      <PlayerInventory />
    </ScreenPanel>
  );
}
