import type { MekanismSpriteName } from "@verdigris/textures";

import type { MekanismDataType, MekanismSide, MekanismTransmission } from "../mekanism-types";
import { cn, gui } from "../../../lib/utils";
import { MEKANISM_DATA_COLORS } from "../mekanism-metrics";
import { MekanismImageButton, MekanismInnerScreen, MekanismLabel } from "../mekanism-parts/index";
import { MekanismSprite } from "../mekanism-sprite/index";
import { MekanismWindow } from "../mekanism-window/index";

export interface MekanismSideConfigWindowProps {
  className?: string;
  /**
   * 弹出模式
   */
  ejecting?: boolean;
  /**
   * 窗口左边界（GUI px）
   */
  left: number;
  onClose?: () => void;
  /**
   * 点击侧面循环数据类型
   */
  onSideCycle?: (side: MekanismSide) => void;
  /**
   * 切换弹出模式
   */
  onToggleEject?: () => void;
  onTogglePin?: () => void;
  onTransmissionChange?: (transmission: MekanismTransmission) => void;
  pinned?: boolean;
  /**
   * 当前六个面的配置
   */
  sides?: Partial<Record<MekanismSide, MekanismDataType>>;
  /**
   * 窗口上边界（GUI px）
   */
  top: number;
  /**
   * 当前传输类型
   */
  transmission?: MekanismTransmission;
  /**
   * 可选传输类型（默认 4 种）
   */
  transmissions?: MekanismTransmission[];
}

const TRANSMISSION_LABELS: Record<MekanismTransmission, string> = {
  chemical: "化学",
  energy: "能量",
  fluid: "流体",
  heat: "热量",
  item: "物品",
};

const TRANSMISSION_ICONS: Record<MekanismTransmission, MekanismSpriteName> = {
  chemical: "transmission/chemicals",
  energy: "transmission/energy",
  fluid: "transmission/fluids",
  heat: "transmission/heat",
  item: "transmission/items",
};

const TRANSMISSION_COLORS: Record<MekanismTransmission, string> = {
  chemical: "#ffdd4f",
  energy: "#59c15f",
  fluid: "#366bd0",
  heat: "#ffa160",
  item: "#cfcfcf",
};

const DATA_LABELS: Record<MekanismDataType, string> = {
  ENERGY: "能量",
  EXTRA: "额外",
  INPUT: "输入",
  INPUT_2: "输入",
  INPUT_OUTPUT: "双向",
  NONE: "无",
  OUTPUT: "输出",
  OUTPUT_2: "输出",
};

const SIDE_BUTTONS: [MekanismSide, { left: number; top: number }][] = [
  ["bottom", { left: 67, top: 92 }],
  ["top", { left: 67, top: 46 }],
  ["front", { left: 67, top: 69 }],
  ["back", { left: 44, top: 92 }],
  ["left", { left: 44, top: 69 }],
  ["right", { left: 90, top: 69 }],
];

/**
 * Mekanism 侧面配置窗口：156×135，6 个 22×22 面按钮 + 传输类型标签。
 */
export function MekanismSideConfigWindow({
  className,
  ejecting = false,
  left,
  onClose,
  onSideCycle,
  onToggleEject,
  onTogglePin,
  onTransmissionChange,
  pinned = false,
  sides = {},
  top,
  transmission = "energy",
  transmissions = ["energy", "fluid", "chemical", "item"],
}: MekanismSideConfigWindowProps) {
  return (
    <MekanismWindow
      className={className}
      height={135}
      left={left}
      onClose={onClose}
      onTogglePin={onTogglePin}
      pinned={pinned}
      title={`配置：${TRANSMISSION_LABELS[transmission]}`}
      titlePadEnd={18}
      top={top}
      width={156}
    >
      <MekanismInnerScreen height={12} left={38} top={25} width={80}>
        <span className="truncate">
          弹出：
          {ejecting ? "开" : "关"}
        </span>
      </MekanismInnerScreen>
      {transmissions.map((type, index) => {
        if (type === transmission) {
          return null;
        }
        const side = index < 4 ? "left" : "right";
        return (
          <button
            aria-label={`切换到${TRANSMISSION_LABELS[type]}`}
            className="absolute cursor-pointer border-0 p-0"
            key={type}
            onClick={onTransmissionChange ? () => onTransmissionChange(type) : undefined}
            style={{
              height: gui(26),
              left: gui(side === "left" ? -26 : 156),
              top: gui(2 + 28 * (index % 4)),
              width: gui(26),
            }}
            title={TRANSMISSION_LABELS[type]}
            type="button"
          >
            <MekanismSprite
              height={26}
              name={side === "left" ? "holder_left" : "holder_right"}
              tint={TRANSMISSION_COLORS[type]}
              width={26}
            />
            <MekanismSprite className="absolute" height={18} left={4} name="button" top={4} width={18} />
            <MekanismSprite
              className="absolute"
              height={18}
              left={4}
              name={TRANSMISSION_ICONS[type]}
              top={4}
              width={18}
            />
          </button>
        );
      })}
      <MekanismImageButton
        height={14}
        label="自动弹出"
        left={136}
        name="button/auto_eject"
        onClick={onToggleEject}
        top={6}
        width={14}
      />
      <MekanismImageButton
        height={14}
        label="清空所有侧面"
        left={136}
        name="button/clear_sides"
        top={95}
        width={14}
      />
      {SIDE_BUTTONS.map(([side, position]) => {
        const type = sides[side] ?? "NONE";
        return (
          <button
            aria-label={`${side} 面：${DATA_LABELS[type]}`}
            className={cn("absolute cursor-pointer border-0 p-0")}
            key={side}
            onClick={onSideCycle ? () => onSideCycle(side) : undefined}
            style={{
              height: gui(22),
              left: gui(position.left),
              top: gui(position.top),
              width: gui(22),
            }}
            title={`${side} 面：${DATA_LABELS[type]}`}
            type="button"
          >
            <MekanismSprite height={22} name="button" tint={MEKANISM_DATA_COLORS[type]} width={22} />
          </button>
        );
      })}
      <MekanismLabel left={64} top={118} variant="title">
        槽位
      </MekanismLabel>
    </MekanismWindow>
  );
}
