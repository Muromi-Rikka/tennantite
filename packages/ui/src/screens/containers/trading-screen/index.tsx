/* eslint-disable react/no-array-index-key -- 交易列表以位置为身份，选择态按索引保存 */
"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import type { ScreenSlot } from "../types";
import { ItemStack } from "../../../containers/item-stack/index";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { Slot } from "../../../containers/slot/index";
import { cn, gui } from "../../../lib/utils";
import { ScrollArea } from "../../../primitives/scroll-area/index";
import { ScreenItemSlot } from "../screen-slot";

export interface TradeOffer {
  /**
  * 要价物品 1
  */
  inputA: ScreenSlot;
  /**
  * 要价物品 2（可选）
  */
  inputB?: ScreenSlot;
  /**
  * 出售物
  */
  output: ScreenSlot;
}

export interface TradingScreenProps {
  className?: string;
  /**
  * 底部玩家快捷栏
  */
  hotbarItems?: ScreenSlot[];
  onTradeSelect?: (index: number) => void;
  title?: ReactNode;
  trades?: TradeOffer[];
}

/**
 * 村民交易界面（规格 §6）：276×166 面板 + 98×116 交易列表 + 选中交易的价签槽。
 */
export function TradingScreen({
  className,
  hotbarItems = [],
  onTradeSelect,
  title = "交易",
  trades = [],
}: TradingScreenProps) {
  const [selected, setSelected] = useState(0);
  const active = trades[selected];

  const selectTrade = (index: number) => {
    setSelected(index);
    onTradeSelect?.(index);
  };

  return (
    <ScreenPanel className={className} height={166} title={title} width={276}>
      <ScrollArea
        className="mc-tex-panel-dark absolute overflow-y-auto"
        style={{ height: gui(116), left: gui(5), top: gui(18), width: gui(98) }}
      >
        {trades.map((trade, index) => (
          <div
            aria-label={`交易 ${index + 1}`}
            className={cn(
              "flex min-h-24 w-full cursor-pointer items-center gap-1 px-1 select-none",
              "hover:bg-white/10",
              index === selected && "bg-white/10",
            )}
            key={index}
            onClick={() => {
              selectTrade(index);
            }}
            onKeyDown={(event) => {
              if (!(event.key === "Enter" || event.key === " ")) {
                return;
              }

              event.preventDefault();
              selectTrade(index);
            }}
            role="button"
            tabIndex={0}
          >
            <TradeSlot item={trade.inputA} />
            <TradeSlot item={trade.inputB} />
            <span aria-hidden="true" className="font-mc mc-text text-mc-text-dim">
              →
            </span>
            <TradeSlot item={trade.output} />
          </div>
        ))}
      </ScrollArea>
      <ScreenItemSlot item={active?.inputA} label="trade-input-a" left={135} top={36} />
      <ScreenItemSlot item={active?.inputB} label="trade-input-b" left={161} top={36} />
      <ScreenItemSlot
        item={active?.output}
        label="trade-output"
        left={197}
        size={26}
        top={36}
      />
      <PlayerInventory
        hotbarItems={hotbarItems}
        hotbarY={141}
        x={107}
        y={83}
      />
    </ScreenPanel>
  );
}

function TradeSlot({ item }: { item?: ScreenSlot }) {
  return (
    <Slot size={18}>{item ? <ItemStack bare {...item} /> : null}</Slot>
  );
}
