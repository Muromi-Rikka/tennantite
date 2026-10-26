import { StatusEffects } from "./index";

/**
 * StatusEffects 预览用例（规格 §6.1）
*/
export function StatusEffectsDemo() {
  return (
    <StatusEffects
      effects={[
        { amplifier: "II", duration: "0:30", name: "速度" },
        { duration: "1:00", name: "跳跃提升" },
        { duration: "0:10", name: "反胃" },
      ]}
    />
  );
}
