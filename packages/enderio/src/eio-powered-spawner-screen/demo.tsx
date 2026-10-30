import { EIO_DEMO_CHARCOAL, EIO_DEMO_GOLD_INGOT, EIO_DEMO_IRON_ORE } from "../eio-demo-data";
import { EioPoweredSpawnerScreen } from "./index";

/**
 * PoweredSpawner 预览：生成模式、能量 48%、进度 45%。
 */
export function EioPoweredSpawnerScreenDemo() {
  return (
    <EioPoweredSpawnerScreen
      energy={{ max: 100000, value: 48000 }}
      items={{
        "powered-spawner-capacitor": EIO_DEMO_CHARCOAL,
        "powered-spawner-input": EIO_DEMO_IRON_ORE,
        "powered-spawner-output": EIO_DEMO_GOLD_INGOT,
      }}
      onModeChange={() => {}}
      onRedstoneChange={() => {}}
      onSlotClick={() => {}}
      progress={0.45}
      rangeVisible={true}
      state="active"
    />
  );
}
