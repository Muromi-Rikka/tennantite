import { IeEnergyBar } from "../ie-energy-bar/index";
import { IeLabel } from "../ie-label/index";
import { IE_MACHINES } from "../ie-machine-layout";
import { IeMachineScreen } from "../ie-machine-screen/index";
import { IeSpriteButton } from "../ie-sprite-button/index";

export interface IeCapacitorHvScreenProps {
  className?: string;
  /**
   * 存量与容量（IF）
   */
  energy: { amount?: number; capacity: number; value?: number };
  /**
   * IO 模式（进料 / 出料）
   */
  mode?: IeCapacitorIoMode;
  onModeChange?: (mode: IeCapacitorIoMode) => void;
}

export type IeCapacitorIoMode = "input" | "output";

/**
 * 高压电容（1.21.1 无 GUI 容器，能量以能量条与侧栏 HUD 呈现；按
 * IEContainerScreen 范式重建）：竖向能量条（EnergyInfoArea 7×46）、
 * 存量/容量文本、IO 模式按钮（sprites/hud/square_in / square_out）。
 */
export function IeCapacitorHvScreen({
  className,
  energy,
  mode = "input",
  onModeChange,
}: IeCapacitorHvScreenProps) {
  const layout = IE_MACHINES.capacitorHv;
  const stored = energy.value ?? energy.amount ?? 0;
  return (
    <IeMachineScreen
      className={className}
      height={layout.height}
      inventoryLabelTop={layout.inventoryLabelTop}
      player={layout.player}
      playerFrames
      title={layout.title}
      width={layout.width}
    >
      <IeEnergyBar
        label="电容能量"
        left={layout.energy.left}
        max={energy.capacity}
        top={layout.energy.top}
        value={stored}
      />
      <IeLabel left={110} top={35}>{`${stored} IF`}</IeLabel>
      <IeLabel left={110} top={45}>{`容量 ${energy.capacity} IF`}</IeLabel>
      <IeSpriteButton
        className={mode === "input" ? undefined : "opacity-55"}
        dataAttributes={{ "data-ie-io-mode": mode === "input" ? "active" : "idle" }}
        label="capacitor-hv-mode-in"
        left={24}
        name="sprites/hud/square_in"
        onClick={() => onModeChange?.("input")}
        pressed={mode === "input"}
        title="输入模式"
        top={43}
      />
      <IeSpriteButton
        className={mode === "output" ? undefined : "opacity-55"}
        dataAttributes={{ "data-ie-io-mode": mode === "output" ? "active" : "idle" }}
        label="capacitor-hv-mode-out"
        left={42}
        name="sprites/hud/square_out"
        onClick={() => onModeChange?.("output")}
        pressed={mode === "output"}
        title="输出模式"
        top={43}
      />
    </IeMachineScreen>
  );
}
