import type { MekanismSpriteName } from "@tennantite/textures";
import type { ScreenSlot } from "@tennantite/ui";
import { cn, gui } from "@tennantite/ui";
import { useRef, useState } from "react";
import type { MekanismListRow } from "../mekanism-list/index";
import type { MekanismDataType, MekanismRedstoneMode, MekanismSecurityMode, MekanismSide, MekanismTransmission, MekanismWindowKind } from "../mekanism-types";
import { MekanismBar } from "../mekanism-bar/index";
import { MekanismButton } from "../mekanism-button/index";
import { MekanismImageButton } from "../mekanism-image-button/index";
import { MekanismLabel } from "../mekanism-label/index";
import { MekanismList } from "../mekanism-list/index";
import { MEKANISM_SECURITY_LABELS, mekanismNextRedstone, mekanismNextSecurity, mekanismNextSide } from "../mekanism-mode-state";
import { MekanismScreen } from "../mekanism-screen/index";
import { MekanismSideConfigWindow } from "../mekanism-side-config-window/index";
import { MekanismSlot } from "../mekanism-slot/index";
import { MekanismTabBar } from "../mekanism-tab-bar/index";
import { MekanismTextField } from "../mekanism-text-field/index";
import { MekanismUpgradeWindow } from "../mekanism-upgrade-window/index";

export interface MekanismTeleporterFrequencyRow extends MekanismListRow {
  /**
   * 频率颜色（彩色频率）
   */
  color?: string;
  owner: string;
  security: MekanismSecurityMode;
}

export interface MekanismTeleporterScreenProps {
  className?: string;
  /**
   * 当前绑定频率（无则显示“无”）
   */
  currentFrequency?: MekanismTeleporterFrequencyRow;
  defaultWindows?: MekanismWindowKind[];
  /**
   * 能量槽物品
   */
  energySlot?: ScreenSlot;
  /**
   * 频率列表（数据全量注入，MekanismList 渲染层截断）
   */
  frequencies?: MekanismTeleporterFrequencyRow[];
  onDeleteFrequency?: () => void;
  onFrequencySelect?: (id: string) => void;
  onRedstoneChange?: (mode: MekanismRedstoneMode) => void;
  onSecurityChange?: (mode: MekanismSecurityMode) => void;
  /**
   * 切换频率列表页签（公开/受信任/私有）
   */
  onSecurityTabChange?: (mode: MekanismSecurityMode) => void;
  onSetFrequency?: (name: string) => void;
  playerName?: string;
  redstone?: MekanismRedstoneMode;
  /**
   * 标签栏红石/安全控制态（安全模式由标签切换）
   */
  security?: MekanismSecurityMode;
  /**
   * 频率列表页签
   */
  securityTab?: MekanismSecurityMode;
  selectedFrequencyId?: string;
  /**
   * 传送器状态
   */
  status?: MekanismTeleporterStatus;
}

export type MekanismTeleporterStatus = "needs_energy" | "no_frame" | "no_frequency" | "no_link" | "ready";

const STATUS_LABELS: Record<MekanismTeleporterStatus, string> = {
  needs_energy: "能量不足",
  no_frame: "未组成多方块结构",
  no_frequency: "无频率",
  no_link: "无有效目的地",
  ready: "就绪",
};

const SECURITY_TABS: { left: number; mode: MekanismSecurityMode; sprite: MekanismSpriteName }[] = [
  { left: 27, mode: "public", sprite: "security/button_public" },
  { left: 69, mode: "protected", sprite: "security/button_trusted" },
  { left: 111, mode: "private", sprite: "security/button_private" },
];

const DEFAULT_TABS = ["config", "transporter", "upgrade", "security", "redstone", "energy"] as const;

const EMPTY_FREQUENCIES: MekanismTeleporterFrequencyRow[] = [];

/**
 * 传送器：176×240，GuiTeleporter。状态图标 + 纵向能量条 + 频率选择器
 * （模式按钮 / 频率列表 / 设定与删除，坐标自上游 GuiTeleporter + GuiFrequencySelector@d4df9b3）。
 */
export function MekanismTeleporterScreen({
  className,
  currentFrequency,
  defaultWindows = [],
  energySlot,
  frequencies = EMPTY_FREQUENCIES,
  onDeleteFrequency,
  onFrequencySelect,
  onRedstoneChange,
  onSecurityChange,
  onSecurityTabChange,
  onSetFrequency,
  playerName = "玩家",
  redstone: initialRedstone = "disabled",
  security: initialSecurity = "public",
  securityTab = "public",
  selectedFrequencyId,
  status = "no_frequency",
}: MekanismTeleporterScreenProps) {
  const [windows, setWindows] = useState<MekanismWindowKind[]>(defaultWindows);
  const frequencyNameRef = useRef("");
  const [redstone, setRedstone] = useState<MekanismRedstoneMode>(initialRedstone);
  const [security, setSecurity] = useState<MekanismSecurityMode>(initialSecurity);
  const [sides, setSides] = useState<Partial<Record<MekanismSide, MekanismDataType>>>({});
  const [transmission, setTransmission] = useState<MekanismTransmission>("energy");

  const toggleWindow = (kind: MekanismWindowKind) => {
    setWindows(current => current.includes(kind) ? current.filter(value => value !== kind) : [...current, kind]);
  };
  const cycleRedstone = () => {
    const next = mekanismNextRedstone(redstone);
    setRedstone(next);
    onRedstoneChange?.(next);
  };
  const cycleSecurity = () => {
    const next = mekanismNextSecurity(security);
    setSecurity(next);
    onSecurityChange?.(next);
  };
  const handleTabClick = (kind: string) => {
    switch (kind) {
      case "config": {
        toggleWindow("side-config");

        break;
      }
      case "redstone": {
        cycleRedstone();

        break;
      }
      case "security": {
        cycleSecurity();

        break;
      }
      case "upgrade": {
        toggleWindow("upgrade");

        break;
      }
    // No default
    }
  };

  const submitFrequency = () => {
    const name = frequencyNameRef.current.trim();
    frequencyNameRef.current = "";
    if (name) {
      onSetFrequency?.(name);
    }
  };

  const selectedRow = frequencies.find(row => row.id === selectedFrequencyId);

  const activeTabs = [
    ...(windows.includes("side-config") ? ["config" as const] : []),
    ...(windows.includes("upgrade") ? ["upgrade" as const] : []),
  ];
  const frequencyTextEnd = 139 - 27;

  return (
    <MekanismScreen
      className={className}
      height={240}
      inventoryLabel={{ text: playerName, x: 8, y: 147 }}
      playerInventory={{ hotbarY: 216, x: 8, y: 158 }}
      tabs={(
        <MekanismTabBar
          active={activeTabs}
          onTabClick={handleTabClick}
          redstone={redstone}
          security={security}
          tabs={[...DEFAULT_TABS]}
          width={176}
        />
      )}
      title="传送器"
      titleX={26}
      titleY={4}
      width={176}
      windows={(
        <>
          {windows.includes("side-config")
            ? (
                <MekanismSideConfigWindow
                  left={10}
                  onClose={() => setWindows(windows.filter(value => value !== "side-config"))}
                  onSideCycle={(side) => {
                    const current = sides[side] ?? "NONE";
                    const next = mekanismNextSide(current);
                    setSides(value => ({ ...value, [side]: next }));
                  }}
                  onTransmissionChange={setTransmission}
                  sides={sides}
                  top={15}
                  transmission={transmission}
                  transmissions={["energy", "item"]}
                />
              )
            : null}
          {windows.includes("upgrade")
            ? (
                <MekanismUpgradeWindow
                  left={-11}
                  onClose={() => setWindows(windows.filter(value => value !== "upgrade"))}
                  top={15}
                />
              )
            : null}
        </>
      )}
    >
      <MekanismImageButton
        height={18}
        label={`传送器状态：${STATUS_LABELS[status]}`}
        left={6}
        name={`teleporter/${status}` as MekanismSpriteName}
        top={6}
        width={18}
      />
      <MekanismSlot item={energySlot} label="energy" left={152} top={6} type="power" />
      <MekanismBar height={56} kind="power" label="能量" left={158} top={26} />
      {SECURITY_TABS.map((tab) => {
        const isInactive = tab.mode === securityTab;
        return (
          <MekanismImageButton
            className={cn(isInactive && "opacity-50")}
            height={20}
            key={tab.mode}
            label={`${MEKANISM_SECURITY_LABELS[tab.mode]}频率`}
            left={tab.left}
            name={tab.sprite}
            onClick={onSecurityTabChange ? () => onSecurityTabChange(tab.mode) : undefined}
            top={14}
            width={38}
          />
        );
      })}
      <MekanismList
        left={27}
        onRowClick={onFrequencySelect}
        rows={frequencies}
        selectedId={selectedFrequencyId}
        top={36}
        visibleRows={3}
        width={122}
      />
      <MekanismLabel left={27} top={81} width={frequencyTextEnd}>
        {`频率：${currentFrequency?.label ?? "无"}`}
      </MekanismLabel>
      <MekanismLabel left={27} top={91} width={frequencyTextEnd}>
        {`所有者：${currentFrequency?.owner ?? "无"}`}
      </MekanismLabel>
      <MekanismLabel left={27} top={101} width={frequencyTextEnd}>
        {`安全：${currentFrequency ? MEKANISM_SECURITY_LABELS[currentFrequency.security] : "无"}`}
      </MekanismLabel>
      <MekanismLabel className="text-right" left={27} top={114} width={23}>
        设置：
      </MekanismLabel>
      <div
        className="absolute"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            submitFrequency();
          }
        }}
        style={{ height: gui(11), left: gui(50), top: gui(113), width: gui(98) }}
      >
        <MekanismTextField
          height={11}
          label="设置频率"
          left={0}
          onChange={(value) => {
            frequencyNameRef.current = value;
          }}
          top={0}
          width={98}
        />
      </div>
      <MekanismImageButton
        background={false}
        height={12}
        label="确认设置"
        left={134}
        name="button/checkmark"
        onClick={submitFrequency}
        top={112}
        width={12}
      />
      <MekanismButton
        disabled={!selectedFrequencyId}
        label="设置"
        left={27}
        onClick={() => selectedRow !== undefined && onSetFrequency?.(selectedRow.label)}
        top={127}
        width={50}
      />
      <MekanismButton
        disabled={!selectedFrequencyId}
        label="删除"
        left={79}
        onClick={onDeleteFrequency}
        top={127}
        width={50}
      />
      <MekanismSlot label="frequency-color" left={131} top={127} type="normal" />
      <div
        className="absolute"
        style={{
          backgroundColor: currentFrequency?.color,
          height: gui(14),
          left: gui(133),
          top: gui(129),
          width: gui(14),
        }}
      />
    </MekanismScreen>
  );
}
