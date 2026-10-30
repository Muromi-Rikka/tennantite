import { gui } from "@tennantite/ui";
import { ThermalMachineScreen } from "../thermal-machine-screen/index";
import { ThermalSprite } from "../thermal-sprite/index";

export interface ThermalTinkerBenchScreenProps extends Omit<
  Parameters<typeof ThermalMachineScreen>[0],
  "machine"
> {
  /**
   * 工作模式（augment 强化 / replenish 补充，切换按钮贴图）
   */
  mode?: "augment" | "replenish";
  onModeClick?: () => void;
}

/**
 * Thermal 强化工作台（TinkerBenchScreen，ThermalCore cc7c230）：
 * 能量表、medium 流体罐、强化槽、辅件槽、3×3 强化槽阵、
 * 模式按钮 (42,51) 20×20（tinker_bench_mode_augment/replenish 40×20 图集，0 正常、20 悬停）。
 * 数据注入、无游戏逻辑。
 */
export function ThermalTinkerBenchScreen({ mode = "augment", onModeClick, ...props }: ThermalTinkerBenchScreenProps) {
  return (
    <ThermalMachineScreen {...props} machine="tinker_bench">
      <button
        aria-label="切换模式"
        className="absolute cursor-pointer border-0 bg-transparent p-0"
        onClick={onModeClick}
        style={{ height: gui(20), left: gui(42), top: gui(51), width: gui(20) }}
        type="button"
      >
        <ThermalSprite
          crop={{ height: 20, width: 20, x: 0, y: 0 }}
          height={20}
          name={mode === "replenish" ? "container/tinker_bench_mode_replenish" : "container/tinker_bench_mode_augment"}
          width={20}
        />
      </button>
    </ThermalMachineScreen>
  );
}
