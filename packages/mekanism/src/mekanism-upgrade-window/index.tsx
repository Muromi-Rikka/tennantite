import type { MekanismSpriteName } from "@verdigris/textures";

import { gui } from "@verdigris/ui";
import { MekanismButton } from "../mekanism-button/index";
import { MekanismInnerScreen } from "../mekanism-inner-screen/index";
import { MekanismLabel } from "../mekanism-label/index";
import { MekanismProgress } from "../mekanism-progress/index";
import { MekanismSlot } from "../mekanism-slot/index";
import { MekanismSprite } from "../mekanism-sprite/index";
import { MekanismWindow } from "../mekanism-window/index";

export interface MekanismUpgradeWindowProps {
  className?: string;
  /**
   * 已安装升级显示名（默认 3 项）
   */
  installed?: string[];
  /**
   * 窗口左边界（GUI px）
   */
  left: number;
  onClose?: () => void;
  onSelect?: (name: string) => void;
  onTogglePin?: () => void;
  pinned?: boolean;
  /**
   * 列表行数（默认 2；窗口高 = 76 + max(18, 12 * rows)）
   */
  rows?: number;
  selected?: string;
  /**
   * 支持的升级 key（默认 7 个）
   */
  supported?: string[];
  /**
   * 窗口上边界（GUI px）
   */
  top: number;
}

const DEFAULT_SUPPORTED = ["anchor", "chemical", "energy", "filter", "muffling", "speed", "stone_generator"];
const DEFAULT_INSTALLED = ["速度升级", "能量升级", "过滤升级"];

/**
 * Mekanism 升级窗口：198×100（rows=2），列表 + 支持图标 + 安装/卸载进度 + 两个虚拟槽。
 */
export function MekanismUpgradeWindow({
  className,
  installed = DEFAULT_INSTALLED,
  left,
  onClose,
  onSelect,
  onTogglePin,
  pinned = false,
  rows = 2,
  selected,
  supported = DEFAULT_SUPPORTED,
  top,
}: MekanismUpgradeWindowProps) {
  const height = 76 + Math.max(18, 12 * rows);
  return (
    <MekanismWindow
      className={className}
      height={height}
      left={left}
      onClose={onClose}
      onTogglePin={onTogglePin}
      pinned={pinned}
      title="升级"
      top={top}
      width={198}
    >
      <MekanismSprite height={50} left={6} name="element_holder" top={18} width={108} />
      {installed.slice(0, rows).map((name, index) => (
        <button
          aria-label={`选择 ${name}`}
          className="absolute cursor-pointer border-0 bg-transparent p-0 text-left"
          key={name}
          onClick={onSelect ? () => onSelect(name) : undefined}
          style={{ height: gui(12), left: gui(8), top: gui(20 + index * 12), width: gui(104) }}
          type="button"
        >
          {selected === name
            ? <MekanismSprite height={12} name="list/selected" width={104} />
            : null}
          <MekanismLabel className="truncate" left={2} top={2}>{name}</MekanismLabel>
        </button>
      ))}
      <MekanismSprite height={50} left={102} name="scroll/list_bar" top={18} width={4} />
      <MekanismSprite height={15} left={102} name="scroll/bar" top={18} width={12} />
      <MekanismSprite height={26} left={6} name="element_holder" top={68} width={167} />
      {supported.slice(0, 7).map((key, index) => (
        <MekanismSprite
          height={12}
          key={key}
          left={8 + index * 23}
          name={`item/upgrade/${key}` as MekanismSpriteName}
          opacity={selected === key ? 1 : 0.75}
          top={75}
          width={12}
        />
      ))}
      <MekanismInnerScreen height={50} left={114} top={18} width={59}>
        <span className="truncate">{selected ?? "未选择升级"}</span>
      </MekanismInnerScreen>
      <MekanismProgress label="安装进度" left={176} progress={0} top={37} type="INSTALLING" />
      <MekanismProgress label="卸载进度" left={176} progress={0} top={58} type="UNINSTALLING" />
      <MekanismButton
        disabled
        height={12}
        label="卸载"
        left={115}
        top={54}
        variant="digital"
        width={56}
      />
      <MekanismSlot item={null} label="upgrade-installing" left={176} top={18} type="normal" />
      <MekanismSlot item={null} label="upgrade-uninstalling" left={176} top={72} type="normal" />
    </MekanismWindow>
  );
}
