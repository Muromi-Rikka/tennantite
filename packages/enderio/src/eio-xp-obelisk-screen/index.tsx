import type { EioRedstoneControl } from "../eio-machine-layout";
import { EIO_REDSTONE_LABELS, eioNextRedstone, eioRedstoneIcon } from "../eio-controls";
import { EioExperienceBar } from "../eio-experience-bar/index";
import { EioIconButton } from "../eio-icon-button/index";
import { EIO_MACHINES } from "../eio-machine-layout";
import { EioMachineScreen } from "../eio-machine-screen/index";

export interface EioXpObeliskScreenProps {
  className?: string;
  onIoConfig?: () => void;
  onRedstoneChange?: (control: EioRedstoneControl) => void;
  /**
   * 六按钮回调：1 / 10 / 全部，正数取回（存入玩家）、负数存入方尖碑
   */
  onXpAction?: (amount: 1 | 10 | "all", direction: "add" | "remove") => void;
  redstone?: EioRedstoneControl;
  /**
   * 方尖碑经验条（110 宽）进度 0..1 与等级
   */
  xp?: { level: number; progress: number };
}

const XP_BUTTONS = [
  { amount: 1, direction: "add", icon: "sprites/buttons/xp_add_one", label: "取回 1 级", left: 48, top: 26 },
  { amount: 1, direction: "remove", icon: "sprites/buttons/xp_remove_one", label: "存入 1 级", left: 48, top: 74 },
  { amount: 10, direction: "add", icon: "sprites/buttons/xp_add_multi", label: "取回 10 级", left: 80, top: 26 },
  { amount: 10, direction: "remove", icon: "sprites/buttons/xp_remove_multi", label: "存入 10 级", left: 80, top: 74 },
  { amount: "all", direction: "add", icon: "sprites/buttons/xp_add_all", label: "取回全部经验", left: 112, top: 26 },
  { amount: "all", direction: "remove", icon: "sprites/buttons/xp_remove_all", label: "存入全部经验", left: 112, top: 74 },
] as const;

/**
 * 经验方尖碑（176×116，无玩家背包）：110×5 经验条、经验按钮组 ×6 与红石 / IO 按钮。
 */
export function EioXpObeliskScreen({
  className,
  onIoConfig,
  onRedstoneChange,
  onXpAction,
  redstone = "always_active",
  xp = { level: 0, progress: 0 },
}: EioXpObeliskScreenProps) {
  const layout = EIO_MACHINES.xpObelisk;

  return (
    <EioMachineScreen
      background={layout.background}
      backgroundHeight={layout.backgroundHeight}
      className={className}
      height={layout.height}
      machine="xpObelisk"
      width={layout.width}
    >
      <EioExperienceBar
        left={33}
        level={xp.level}
        progress={xp.progress}
        top={55}
        width={110}
      />
      {XP_BUTTONS.map(button => (
        <EioIconButton
          icon={button.icon}
          key={button.label}
          label={button.label}
          left={button.left}
          onClick={() => { onXpAction?.(button.amount, button.direction); }}
          top={button.top}
        />
      ))}
      <EioIconButton
        icon={eioRedstoneIcon(redstone)}
        label="红石控制"
        left={layout.redstone?.left ?? 0}
        onClick={() => { onRedstoneChange?.(eioNextRedstone(redstone)); }}
        title={`红石控制：${EIO_REDSTONE_LABELS[redstone]}`}
        top={layout.redstone?.top ?? 0}
      />
      <EioIconButton
        icon="sprites/buttons/io_config"
        label="IO 配置"
        left={154}
        onClick={onIoConfig}
        top={24}
      />
    </EioMachineScreen>
  );
}
