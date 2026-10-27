import type { PixelIconName } from "@verdigris/textures";

import { GuiSprite } from "../../../containers/gui-sprite/index";
import { ItemStack } from "../../../containers/item-stack/index";
import { cn, gui } from "../../../lib/utils";
import { AttackIndicator } from "../attack-indicator/index";

export interface HotbarItem {
  count?: number;
  icon?: PixelIconName;
  src?: string;
  tooltip?: string;
}

export interface HotbarProps {
  /**
  * 攻击指示器进度 0..1
  */
  attackIndicator?: number;
  className?: string;
  /**
  * 9 个快捷栏位的数据（规格 §6.1，物品数据由使用方注入）
  */
  items?: HotbarItem[];
  /**
  * 副手物品
  */
  offhand?: HotbarItem;
  /**
  * 副手槽在左/右
  */
  offhandSide?: "left" | "right";
  /**
  * 当前选中槽位索引（0..8）
  */
  selectedIndex?: number;
}

const SLOT_COUNT = 9;
/**
 * 原版：热键栏 182×22，槽位 20×20，步进 20，首槽左上角 (1,1)
*/
const SLOT_SIZE = 20;
const SLOT_STEP = 20;
const FRAME_INSET = 1;

/**
 * MC 快捷栏（规格 §6.1）：原版 182×22 GUI px，9 个 20×20 槽位。
 * 选中框 24×23 围绕 20×20 槽位偏移 (-2,-1)，overlay 语义。
 */
export function Hotbar({
  attackIndicator,
  className,
  items = [],
  offhand,
  offhandSide = "left",
  selectedIndex,
}: HotbarProps) {
  return (
    <div
      className={cn("mc-tex-hotbar relative", className)}
      data-hud=""
      style={{ height: gui(22), width: gui(182) }}
    >
      {Array.from({ length: SLOT_COUNT }, (_, index) => {
        const item = items[index];
        return (
          <div
            className="absolute"
            data-selected={index === selectedIndex ? "" : undefined}
            key={index}
            style={{
              height: gui(SLOT_SIZE),
              left: gui(FRAME_INSET + SLOT_STEP * index),
              top: gui(FRAME_INSET),
              width: gui(SLOT_SIZE),
            }}
          >
            {item
              ? (
                  <ItemStack
                    bare
                    count={item.count}
                    icon={item.icon}
                    size={SLOT_SIZE}
                    src={item.src}
                    tooltip={item.tooltip}
                  />
                )
              : null}
          </div>
        );
      })}
      {selectedIndex === undefined
        ? null
        : (
            <div
              className="mc-tex-hotbar-selection absolute"
              style={{ left: gui(SLOT_STEP * selectedIndex - 1), top: 0 }}
            />
          )}
      {offhand
        ? (
            <div
              className="absolute top-0"
              style={{
                height: gui(24),
                left: gui(offhandSide === "left" ? -29 : 182),
                width: gui(29),
              }}
            >
              <GuiSprite
                className="absolute inset-0"
                height={24}
                name={offhandSide === "left"
                  ? "sprites/hud/hotbar_offhand_left.png"
                  : "sprites/hud/hotbar_offhand_right.png"}
                width={29}
              />
              <ItemStack
                bare
                className="absolute"
                count={offhand.count}
                icon={offhand.icon}
                size={20}
                src={offhand.src}
                style={{ left: gui(offhandSide === "left" ? 5 : 4), top: gui(2) }}
                tooltip={offhand.tooltip}
              />
            </div>
          )
        : null}
      {attackIndicator === undefined
        ? null
        : (
            <AttackIndicator
              className="absolute"
              progress={attackIndicator}
              style={{ left: gui(82), top: gui(-18) }}
              variant="hotbar"
            />
          )}
    </div>
  );
}
