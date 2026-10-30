import { gui } from "@tennantite/ui";
import { ThermalMachineScreen } from "../thermal-machine-screen/index";
import { ThermalSprite } from "../thermal-sprite/index";

export type ThermalNullifierScreenProps = Omit<
  Parameters<typeof ThermalMachineScreen>[0],
  "machine"
>;

/**
 * Thermal 销毁器（DeviceNullifierScreen，ThermalCore cc7c230）：
 * 3×3 输入槽阵、清空垃圾桶按钮 (131,33) 20×20（nullifier_empty_bin 60×20 图集）。
 * 数据注入、无游戏逻辑。
 */
export function ThermalNullifierScreen(props: ThermalNullifierScreenProps) {
  return (
    <ThermalMachineScreen {...props} machine="nullifier">
      <button
        aria-label="清空垃圾桶"
        className="absolute cursor-pointer border-0 bg-transparent p-0"
        style={{ height: gui(20), left: gui(131), top: gui(33), width: gui(20) }}
        type="button"
      >
        <ThermalSprite crop={{ height: 20, width: 20, x: 0, y: 0 }} height={20} name="container/nullifier_empty_bin" width={20} />
      </button>
    </ThermalMachineScreen>
  );
}
