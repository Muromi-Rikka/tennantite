import { IeMixerScreen } from "./index";

/**
 * IeMixerScreen 预览用例：2 沙 + 沙砾 + 黏土球 + 500mB 水 → 500mB 混凝土。
 */
export function IeMixerScreenDemo() {
  return (
    <IeMixerScreen
      energy={{ max: 32000, value: 21000 }}
      inputs={[
        { count: 2, icon: "sand", tooltip: "沙子 ×2" },
        { count: 1, icon: "gravel", tooltip: "沙砾" },
        { count: 1, icon: "clay-ball", tooltip: "黏土球" },
        null,
      ]}
      multitank={{ max: 8000, tint: "#9a9a9a", value: 500 }}
      onOutputAllChange={() => {}}
      onSlotClick={() => {}}
      outputAll
      progresses={[0.3, 0.7, 0, 0.9]}
    />
  );
}
