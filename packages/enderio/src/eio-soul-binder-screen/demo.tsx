import { EIO_DEMO_GOLD_INGOT, EIO_DEMO_IRON_INGOT, EIO_DEMO_SOUL_VIAL } from "../eio-demo-data";
import { EioSoulBinderScreen } from "./index";

/**
 * 灵魂绑定器预览：灵魂瓶 + 铁锭 → 金锭 ×2，进度 45%，经验 30 级 60%。
 */
export function EioSoulBinderScreenDemo() {
  return (
    <EioSoulBinderScreen
      energy={{ max: 100000, value: 48000 }}
      experience={{ level: 30, progress: 0.6 }}
      inputOther={EIO_DEMO_IRON_INGOT}
      inputSoul={EIO_DEMO_SOUL_VIAL}
      onRedstoneChange={() => {}}
      onSlotClick={() => {}}
      outputs={[EIO_DEMO_GOLD_INGOT, EIO_DEMO_GOLD_INGOT]}
      progress={0.45}
      state="active"
    />
  );
}
