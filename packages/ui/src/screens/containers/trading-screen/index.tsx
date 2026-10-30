/* eslint-disable react/no-array-index-key -- 交易列表以位置为身份，选择态按索引保存 */
"use client";

import type { ReactNode } from "react";
import { Fragment, useState } from "react";

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
  /**
   * 村民名称 + 等级（原版标题栏右侧，如 `农民 - 新手`）
   */
  title?: ReactNode;
  trades?: TradeOffer[];
}

/**
 * 村民交易界面（规格 §6）：`container/villager.png` 276×166。
 */
const EMPTY_HOTBAR_ITEMS: ScreenSlot[] = [];
const EMPTY_TRADES: TradeOffer[] = [];
export function TradingScreen({
  className,
  hotbarItems = EMPTY_HOTBAR_ITEMS,
  onTradeSelect,
  title,
  trades = EMPTY_TRADES,
}: TradingScreenProps) {
  const [selected, setSelected] = useState(0);
  const active = trades[selected];

  return (
    <ScreenPanel
      background="container/villager.png"
      className={className}
      height={166}
      width={276}
    >
      <div
        className="pointer-events-none absolute font-mc mc-text whitespace-nowrap text-[#3f3f3f]"
        style={{ left: gui(5), textAlign: "center", top: gui(5), width: gui(96) }}
      >
        交易
      </div>
      {title === undefined
        ? null
        : (
            <div
              className="pointer-events-none absolute font-mc mc-text whitespace-nowrap text-[#3f3f3f]"
              style={{ left: gui(136), textAlign: "center", top: gui(5), width: gui(102) }}
            >
              {title}
            </div>
          )}
      <div
        className="pointer-events-none absolute font-mc mc-text whitespace-nowrap text-[#3f3f3f]"
        style={{ left: gui(107), top: gui(71) }}
      >
        物品栏
      </div>
      {trades.slice(0, 7).map((trade, index) => (
        // react-doctor-disable-next-line react-doctor/no-array-index-as-key —— 位置固定槽位网格，index 即稳定身份
        <Fragment key={`row-${index}`}>
          <button
            aria-label={`交易 ${index + 1}`}
            aria-pressed={index === selected}
            className="mc-tex-btn absolute cursor-pointer p-0"
            onClick={() => {
              setSelected(index);
              onTradeSelect?.(index);
            }}
            style={{
              height: gui(20),
              left: gui(5),
              top: gui(18 + index * 20),
              width: gui(88),
            }}
            type="button"
          />
          <GuiSprite
            className="pointer-events-none absolute"
            height={9}
            name={trade.outOfStock
              ? "sprites/container/villager/trade_arrow_out_of_stock.png"
              : "sprites/container/villager/trade_arrow.png"}
            style={{ left: gui(60), top: gui(22 + index * 20) }}
            width={10}
          />
          <ScreenItemSlot
            className="pointer-events-none"
            item={trade.inputA}
            label={`trade-row-${index}-input-a`}
            left={10}
            size={16}
            top={19 + index * 20}
          />
          {trade.inputB
            ? (
                <ScreenItemSlot
                  className="pointer-events-none"
                  item={trade.inputB}
                  label={`trade-row-${index}-input-b`}
                  left={40}
                  size={16}
                  top={19 + index * 20}
                />
              )
            : null}
          <ScreenItemSlot
            className="pointer-events-none"
            item={trade.output}
            label={`trade-row-${index}-output`}
            left={73}
            size={16}
            top={19 + index * 20}
          />
        </Fragment>
      ))}
      <GuiSprite
        className="absolute"
        height={27}
        name={trades.length > 7
          ? "sprites/container/villager/scroller.png"
          : "sprites/container/villager/scroller_disabled.png"}
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
