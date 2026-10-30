import type { MekanismSpriteName } from "@tennantite/textures";
import type { ScreenSlot } from "@tennantite/ui";
import type { KeyboardEvent, ReactNode } from "react";
import { cn, gui } from "@tennantite/ui";
import { useState } from "react";
import type { MekanismListRow } from "../mekanism-list/index";
import type { MekanismSecurityMode } from "../mekanism-types";
import { MekanismButton } from "../mekanism-button/index";
import { MekanismElementHolder } from "../mekanism-element-holder/index";
import { MekanismImageButton } from "../mekanism-image-button/index";
import { MekanismLabel } from "../mekanism-label/index";
import { MekanismList } from "../mekanism-list/index";
import { MekanismScreen } from "../mekanism-screen/index";
import { MekanismSecurityLight } from "../mekanism-security-light/index";
import { MekanismSlot } from "../mekanism-slot/index";
import { MekanismSprite } from "../mekanism-sprite/index";
import { MekanismTextField } from "../mekanism-text-field/index";

export interface MekanismSecurityDeskScreenProps {
  /**
   * 信任玩家列表底部的展示物品槽
   */
  bottomItem?: ScreenSlot;
  className?: string;
  /**
   * 安全频率离线（无频率）
   */
  frequencyOffline?: boolean;
  /**
   * 点击移除按钮（携带当前选中信任玩家 id）
   */
  onRemoveTrusted?: (id: string) => void;
  /**
   * 点击模式按钮
   */
  onSecurityChange?: (mode: MekanismSecurityMode) => void;
  onToggleOverride?: () => void;
  /**
   * 提交信任玩家名
   */
  onTrustedSubmit?: (name: string) => void;
  /**
   * 所有者名（背包标签右侧展示）
   */
  owner?: string;
  playerName?: string;
  security?: MekanismSecurityMode;
  /**
   * 安全灯状态
   */
  securityLight?: "disabled" | "enabled" | "not_applicable";
  /**
   * 顶部落日/落月展示槽
   */
  topItem?: ScreenSlot;
  /**
   * 信任玩家列表（数据全量注入，MekanismList 渲染层截断）
   */
  trusted?: MekanismListRow[];
}

const SECURITY_LABELS: Record<MekanismSecurityMode, string> = {
  private: "私有",
  protected: "受信任",
  public: "公开",
};

const SECURITY_BUTTONS: { left: number; mode: MekanismSecurityMode; sprite: MekanismSpriteName }[] = [
  { left: 13, mode: "public", sprite: "security/button_public" },
  { left: 54, mode: "private", sprite: "security/button_private" },
  { left: 95, mode: "protected", sprite: "security/button_trusted" },
];

/**
 * 安全台：176×230，GuiSecurityDesk。信任玩家滚动列表 + 移除/添加 + 三模式按钮 +
 * 右列频率展示槽、安全灯与公开/私有图标（坐标自上游 GuiSecurityDesk@d4df9b3）。
 */
export function MekanismSecurityDeskScreen({
  bottomItem,
  className,
  frequencyOffline = false,
  onRemoveTrusted,
  onSecurityChange,
  onToggleOverride,
  onTrustedSubmit,
  owner,
  playerName = "玩家",
  security = "public",
  securityLight = "not_applicable",
  topItem,
  trusted = [],
}: MekanismSecurityDeskScreenProps) {
  const [selectedTrusted, setSelectedTrusted] = useState<string>();
  const [trustedName, setTrustedName] = useState("");

  const submitTrusted = () => {
    const name = trustedName.trim();
    if (name) {
      onTrustedSubmit?.(name);
    }
    setTrustedName("");
  };

  const handleFieldKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      submitTrusted();
    }
  };

  const frequencyLabel: ReactNode = frequencyOffline
    ? <span className="text-mc-red">安全：离线</span>
    : `安全：${SECURITY_LABELS[security]}`;

  return (
    <MekanismScreen
      className={className}
      height={230}
      inventoryLabel={{
        right: owner ? `所有者：${owner}` : undefined,
        text: playerName,
        x: 8,
        y: 136,
      }}
      playerInventory={{ hotbarY: 206, x: 8, y: 148 }}
      title="安全台"
      titleY={4}
      width={176}
    >
      <MekanismElementHolder height={37} left={141} top={13} width={26} />
      <MekanismElementHolder height={34} left={141} top={54} width={26} />
      <MekanismElementHolder height={37} left={141} top={92} width={26} />
      <MekanismSlot item={topItem} label="frequency-top" left={145} top={17} type="inner-holder" />
      <MekanismSlot item={bottomItem} label="frequency-bottom" left={145} top={96} type="inner-holder" />
      <MekanismSecurityLight left={144} mode={securityLight} top={77} />
      <MekanismSprite height={18} left={145} name="security/public" top={32} width={18} />
      <MekanismSprite height={18} left={145} name="security/private" top={111} width={18} />
      <MekanismList
        left={13}
        onRowClick={setSelectedTrusted}
        rows={trusted}
        selectedId={selectedTrusted}
        top={13}
        visibleRows={3}
        width={122}
      />
      <MekanismButton
        disabled={!selectedTrusted}
        label="移除"
        left={13}
        onClick={() => selectedTrusted !== undefined && onRemoveTrusted?.(selectedTrusted)}
        top={81}
        width={122}
      />
      <div className="absolute" onKeyDown={handleFieldKeyDown} style={{ height: gui(11), left: gui(35), top: gui(68), width: gui(99) }}>
        <MekanismTextField
          height={11}
          label="添加信任玩家"
          left={0}
          onChange={setTrustedName}
          top={0}
          width={99}
        />
      </div>
      <MekanismImageButton
        background={false}
        height={12}
        label="确认添加"
        left={121}
        name="button/checkmark"
        onClick={submitTrusted}
        top={67}
        width={12}
      />
      <MekanismLabel left={13} top={57} variant="subheading" width={122}>
        信任玩家
      </MekanismLabel>
      <MekanismLabel left={13} top={103} width={122}>
        {frequencyLabel}
      </MekanismLabel>
      <MekanismLabel className="text-right" left={1} top={70} width={33}>
        添加：
      </MekanismLabel>
      {SECURITY_BUTTONS.map((button) => {
        const isInactive = button.mode === security;
        return (
          <MekanismImageButton
            className={cn(isInactive && "opacity-50")}
            height={16}
            key={button.mode}
            label={`${SECURITY_LABELS[button.mode]}模式`}
            left={button.left}
            name={button.sprite}
            onClick={onSecurityChange ? () => onSecurityChange(button.mode) : undefined}
            top={113}
            width={40}
          />
        );
      })}
      <MekanismImageButton
        height={16}
        label="强制覆盖"
        left={146}
        name="button/exclamation"
        onClick={onToggleOverride}
        top={59}
        width={16}
      />
    </MekanismScreen>
  );
}
