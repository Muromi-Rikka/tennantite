import { gui } from "@tennantite/ui";
import { ThermalMachineScreen } from "../thermal-machine-screen/index";
import { ThermalSprite } from "../thermal-sprite/index";

export type ThermalCrafterScreenProps = Omit<
  Parameters<typeof ThermalMachineScreen>[0],
  "machine"
>;

/**
 * Thermal 组装机（MachineCrafterScreen，ThermalExpansion 24a2675，窗口 190 高）：
 * 9 输入槽行、26×26 产物槽、medium 流体罐、流体进度箭头、
 * SetRecipe 确认按钮 (142,52) 18×18。数据注入、无游戏逻辑。
 */
export function ThermalCrafterScreen(props: ThermalCrafterScreenProps) {
  return (
    <ThermalMachineScreen {...props} machine="crafter">
      <button
        aria-label="确认配方"
        className="absolute cursor-pointer border-0 bg-transparent p-0"
        style={{ height: gui(18), left: gui(142), top: gui(52), width: gui(18) }}
        type="button"
      >
        <ThermalSprite crop={{ height: 18, width: 18, x: 0, y: 0 }} height={18} name="elements/button_accept" width={18} />
      </button>
    </ThermalMachineScreen>
  );
}
