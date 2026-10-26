import type { ScreenSlot } from "../types";
import { Divider } from "../../../containers/divider/index";
import { ItemStack } from "../../../containers/item-stack/index";
import { Panel } from "../../../containers/panel/index";
import { Slot } from "../../../containers/slot/index";
import { TitleBar } from "../../../containers/title-bar/index";
import { cn } from "../../../lib/utils";
import { Button } from "../../../primitives/button/index";
import { ScrollArea } from "../../../primitives/scroll-area/index";

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
  * 底部玩家快捷栏（可选注入）
  */
  hotbarItems?: ScreenSlot[];
  onTradeSelect?: (index: number) => void;
  title?: React.ReactNode;
  trades?: TradeOffer[];
}

/**
 * 村民交易界面（规格 §6.2）：ScrollArea 交易列表 + 物品价签 + 确认按钮。
*/
export function TradingScreen({
  className,
  hotbarItems = [],
  onTradeSelect,
  title = "交易",
  trades = [],
}: TradingScreenProps) {
  return (
    <Panel className={cn("inline-flex flex-col gap-16 p-16", className)}>
      <TitleBar align="start" title={title} />
      <ScrollArea className="mc-tex-slot h-160 w-360 p-8">
        <div className="flex flex-col gap-8">
          {trades.map((trade, index) => (
            <div key={index}>
              <div className="flex items-center gap-8">
                <Slot size={40}>
                  {trade.inputA
                    ? (
                        <ItemStack
                          count={trade.inputA.count}
                          icon={trade.inputA.icon}
                          size={32}
                          src={trade.inputA.src}
                        />
                      )
                    : null}
                </Slot>
                {trade.inputB
                  ? (
                      <>
                        <span aria-hidden="true" className="font-readable text-mc text-mc-text-dim">
                          +
                        </span>
                        <Slot size={40}>
                          <ItemStack
                            count={trade.inputB.count}
                            icon={trade.inputB.icon}
                            size={32}
                            src={trade.inputB.src}
                          />
                        </Slot>
                      </>
                    )
                  : null}
                <span aria-hidden="true" className="font-readable text-mc text-mc-text-dim">
                  →
                </span>
                <Slot size={40}>
                  {trade.output
                    ? (
                        <ItemStack
                          count={trade.output.count}
                          icon={trade.output.icon}
                          size={32}
                          src={trade.output.src}
                        />
                      )
                    : null}
                </Slot>
                <Button
                  aria-label={`交易 ${index + 1}`}
                  onClick={() => {
                    onTradeSelect?.(index);
                  }}
                  size="sm"
                >
                  交易
                </Button>
              </div>
              {index < trades.length - 1 ? <Divider className="my-8" /> : null}
            </div>
          ))}
        </div>
      </ScrollArea>
      {hotbarItems.length > 0
        ? (
            <div className="grid grid-cols-9 gap-4">
              {hotbarItems.slice(0, 9).map((item, index) => (
                <Slot key={index} size={40}>
                  {item
                    ? (
                        <ItemStack
                          count={item.count}
                          icon={item.icon}
                          size={32}
                          src={item.src}
                        />
                      )
                    : null}
                </Slot>
              ))}
            </div>
          )
        : null}
    </Panel>
  );
}
