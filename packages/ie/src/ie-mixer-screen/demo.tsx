import { IeMixerScreen } from "./index";

/**
 * IeMixerScreen 预览用例：生物质混合，多罐 5200 / 10000，能量 21000 / 32000。
 */
export function IeMixerScreenDemo() {
  return (
    <IeMixerScreen
      energy={{ max: 32000, value: 21000 }}
      inputs={[
        { count: 12, icon: "iron-ore", tooltip: "泥土" },
        { count: 8, icon: "charcoal", tooltip: "树叶" },
        null,
        { count: 5, icon: "potion", tooltip: "水桶" },
      ]}
      multitank={{ max: 10000, tint: "#5c7a3c", value: 5200 }}
      onOutputAllChange={() => {}}
      onSlotClick={() => {}}
      outputAll
      progresses={[0.3, 0.7, 0, 0.9]}
    />
  );
}
