/* eslint-disable react/no-array-index-key -- 交易列表以位置为身份，选择态按索引保存 */
"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import type { ScreenSlot } from "../types";
import { GuiSprite } from "../../../containers/gui-sprite/index";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { gui } from "../../../lib/utils";
import { ScreenItemSlot } from "../screen-slot";

export interface TradeOffer {
  inputA: ScreenSlot;
  inputB?: ScreenSlot;
  outOfStock?: boolean;
  output: ScreenSlot;
}

export interface TradingScreenProps {
  className?: string;
  hotbarItems?: ScreenSlot[];
  onTradeSelect?: (index: number) => void;
  title?: ReactNode;
  trades?: TradeOffer[];
}

/**
 * 村民交易界面（规格 §6）：`container/villager.png` 276×166。
 */
export function TradingScreen({
  className,
  hotbarItems = [],
  onTradeSelect,
  title,
  trades = [],
}: TradingScreenProps) {
  const [selected, setSelected] = useState(0);
  const active = trades[selected];

  return (
    <ScreenPanel
      background="container/villager.png"
      className={className}
      height={166}
      title={title}
      width={276}
    >
      {Array.from({ length: 7 }, (_, index) => (
        <GuiSprite
          className="absolute"
          height={9}
          key={`arrow-${index}`}
          name={index >= 6 || trades[index]?.outOfStock
            ? "sprites/container/villager/trade_arrow_out_of_stock.png"
            : "sprites/container/villager/trade_arrow.png"}
          style={{ left: gui(60), top: gui(21 + index * 20) }}
          width={10}
        />
      ))}
      {trades.slice(0, 7).map((trade, index) => (
        <button
          aria-label={`交易 ${index + 1}`}
          aria-pressed={index === selected}
          className="absolute cursor-pointer border-0 bg-transparent p-0"
          key={index}
          onClick={() => {
            setSelected(index);
            onTradeSelect?.(index);
          }}
          style={{
            height: gui(20),
            left: gui(5),
            top: gui(18 + index * 20),
            width: gui(98),
          }}
          type="button"
        />
      ))}
      <GuiSprite
        className="absolute"
        height={27}
        name="sprites/container/villager/scroller.png"
        style={{ left: gui(94), top: gui(18) }}
        width={6}
      />
      <GuiSprite
        className="absolute"
        height={5}
        name="sprites/container/villager/experience_bar_background.png"
        style={{ left: gui(136), top: gui(16) }}
        width={102}
      />
      <ScreenItemSlot item={active?.inputA} label="trade-input-a" left={135} top={36} />
      <ScreenItemSlot item={active?.inputB} label="trade-input-b" left={161} top={36} />
      <ScreenItemSlot
        item={active?.output}
        label="trade-output"
        left={215}
        size={26}
        top={32}
      />
      <PlayerInventory
        bare
        hotbarItems={hotbarItems}
        hotbarY={141}
        x={107}
        y={83}
      />
    </ScreenPanel>
  );
}
