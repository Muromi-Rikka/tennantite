import type { ScreenSlot } from "@tennantite/ui";
import { useState } from "react";
import { mekanismNextRedstone, mekanismNextSecurity, mekanismNextSide } from "../mekanism-mode-state";
import type { MekanismDataType, MekanismRedstoneMode, MekanismSecurityMode, MekanismSide, MekanismTransmission, MekanismWindowKind } from "../mekanism-types";
import { MekanismBar } from "../mekanism-bar/index";
import { MekanismButton } from "../mekanism-button/index";
import { MekanismInnerScreen } from "../mekanism-inner-screen/index";
import { MekanismScreen } from "../mekanism-screen/index";
import { MekanismSideConfigWindow } from "../mekanism-side-config-window/index";
import { MekanismSlot } from "../mekanism-slot/index";
import { MekanismSwitch } from "../mekanism-switch/index";
import { MekanismTabBar } from "../mekanism-tab-bar/index";
import { MekanismUpgradeWindow } from "../mekanism-upgrade-window/index";

export interface MekanismDigitalMinerScreenProps {
  className?: string;
  defaultWindows?: MekanismWindowKind[];
  energy?: { max: number; value: number };
  /**
   * 能量槽物品
   */
  energySlot?: ScreenSlot;
  /**
   * 缺失方块展示（空则槽位显示对勾覆盖）
   */
  missing?: ScreenSlot;
  /**
   * 点击“配置”（上游进入 GuiDigitalMinerConfig 独立界面）
   */
  onConfigClick?: () => void;
  onResetClick?: () => void;
  onSlotClick?: (role: string, item: ScreenSlot | undefined) => void;
  onStartClick?: () => void;
  onStopClick?: () => void;
  /**
   * 三态开关变化（自动弹出 / 自动拉取 / 精准采集）
   */
  onSwitchChange?: (kind: "eject" | "input" | "silk", isChecked: boolean) => void;
  playerName?: string;
  redstone?: MekanismRedstoneMode;
  /**
   * 搜索进度文本（第二行）
   */
  searchText?: string;
  security?: MekanismSecurityMode;
  slots?: Record<string, ScreenSlot>;
  startActive?: boolean;
  statusText?: string;
  stopActive?: boolean;
  switches?: { eject?: boolean; input?: boolean; silk?: boolean };
  /**
   * 待挖掘数量文本（第三行）
   */
  toMineText?: string;
}

const DEFAULT_TABS = ["config", "transporter", "upgrade", "security", "redstone", "energy"] as const;
const SWITCHES: { icon: "eject" | "input" | "silk"; key: "eject" | "input" | "silk"; label: string; left: number }[] = [
  { icon: "eject", key: "eject", label: "自动弹出", left: 19 },
  { icon: "input", key: "input", label: "自动拉取", left: 38 },
  { icon: "silk", key: "silk", label: "精准采集", left: 57 },
];

/**
 * 数字采矿机：176×242，GuiDigitalMiner。内嵌状态屏 + 三个拨动开关 + 纵向能量条 +
 * 缺失方块槽 + 启动/停止/配置/重置按钮 + 9×3 输出网格（坐标自上游 GuiDigitalMiner@d4df9b3）。
 */
export function MekanismDigitalMinerScreen({
  className,
  defaultWindows = [],
  energy,
  energySlot,
  missing,
  onConfigClick,
  onResetClick,
  onSlotClick,
  onStartClick,
  onStopClick,
  onSwitchChange,
  playerName = "玩家",
  redstone: initialRedstone = "disabled",
  searchText = "搜索完成",
  security: initialSecurity = "public",
  slots = {},
  startActive = true,
  statusText = "待机",
  stopActive = false,
  switches = {},
  toMineText = "0",
}: MekanismDigitalMinerScreenProps) {
  const [windows, setWindows] = useState<MekanismWindowKind[]>(defaultWindows);
  const [localRedstone, setLocalRedstone] = useState<MekanismRedstoneMode>(initialRedstone);
  const [localSecurity, setLocalSecurity] = useState<MekanismSecurityMode>(initialSecurity);
  const [sides, setSides] = useState<Partial<Record<MekanismSide, MekanismDataType>>>({});
  const [transmission, setTransmission] = useState<MekanismTransmission>("energy");

  const toggleWindow = (kind: MekanismWindowKind) => {
    setWindows(current => current.includes(kind) ? current.filter(value => value !== kind) : [...current, kind]);
  };
  const handleTabClick = (kind: string) => {
    switch (kind) {
      case "config": {
        toggleWindow("side-config");

        break;
      }
      case "redstone": {
        const next = mekanismNextRedstone(localRedstone);
        setLocalRedstone(next);

        break;
      }
      case "security": {
        const next = mekanismNextSecurity(localSecurity);
        setLocalSecurity(next);

        break;
      }
      case "upgrade": {
        toggleWindow("upgrade");

        break;
      }
    // No default
    }
  };

  const activeTabs = [
    ...(windows.includes("side-config") ? ["config" as const] : []),
    ...(windows.includes("upgrade") ? ["upgrade" as const] : []),
  ];

  return (
    <MekanismScreen
      className={className}
      height={242}
      inventoryLabel={{ text: playerName, x: 8, y: 148 }}
      playerInventory={{ hotbarY: 218, x: 8, y: 160 }}
      tabs={(
        <MekanismTabBar
          active={activeTabs}
          onTabClick={handleTabClick}
          redstone={localRedstone}
          security={localSecurity}
          tabs={[...DEFAULT_TABS]}
          width={176}
        />
      )}
      title="数字采矿机"
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
      <MekanismInnerScreen height={69} left={7} top={19} width={77}>
        <span className="truncate">{statusText}</span>
        <span className="truncate">{searchText}</span>
        <span className="truncate">{`待挖：${toMineText}`}</span>
      </MekanismInnerScreen>
      {SWITCHES.map(switchItem => (
        <MekanismSwitch
          icon={switchItem.icon}
          isChecked={switches[switchItem.key] ?? false}
          key={switchItem.key}
          label={switchItem.label}
          left={switchItem.left}
          onChange={onSwitchChange ? isChecked => onSwitchChange(switchItem.key, isChecked) : undefined}
          top={56}
        />
      ))}
      <MekanismSlot
        item={missing}
        label="missing"
        left={64}
        onActivate={onSlotClick ? () => onSlotClick("missing", missing) : undefined}
        overlay={missing ? undefined : "check"}
        top={21}
        type="normal"
      />
      <MekanismButton
        active={startActive}
        height={18}
        label="启动"
        left={87}
        onClick={onStartClick}
        top={19}
        width={61}
      />
      <MekanismButton
        active={stopActive}
        height={18}
        label="停止"
        left={87}
        onClick={onStopClick}
        top={36}
        width={61}
      />
      <MekanismButton
        height={18}
        label="配置"
        left={87}
        onClick={onConfigClick}
        top={53}
        width={61}
      />
      <MekanismButton
        height={18}
        label="重置"
        left={87}
        onClick={onResetClick}
        top={70}
        width={61}
      />
      {Array.from({ length: 27 }, (_, index) => {
        const column = index % 9;
        const row = Math.floor(index / 9);
        const role = `main-${index}`;
        return (
          <MekanismSlot
            item={slots[role]}
            key={role}
            label={role}
            left={7 + column * 18}
            onActivate={onSlotClick ? () => onSlotClick(role, slots[role]) : undefined}
            top={91 + row * 18}
            type="normal"
          />
        );
      })}
      <MekanismSlot
        item={energySlot}
        label="energy"
        left={151}
        onActivate={onSlotClick ? () => onSlotClick("energy", energySlot) : undefined}
        top={19}
        type="power"
      />
      <MekanismBar
        height={47}
        kind="power"
        label="能量"
        left={157}
        top={39}
        value={energy && energy.max > 0 ? energy.value / energy.max : 0}
      />
    </MekanismScreen>
  );
}
