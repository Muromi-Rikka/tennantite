import { BeaconScreen } from "./index";

/**
 * BeaconScreen 预览用例（规格 §6.2）
*/
export function BeaconScreenDemo() {
  return (
    <BeaconScreen
      payment={{ count: 9, icon: "diamond", tooltip: "钻石" }}
      primaryOptions={[
        { id: "speed", label: "速度" },
        { id: "haste", label: "急迫" },
      ]}
      secondaryOptions={[
        { id: "strength", label: "力量" },
        { id: "jump", label: "跳跃提升" },
      ]}
      title="信标"
    />
  );
}
