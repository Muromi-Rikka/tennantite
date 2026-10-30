import { EIO_DEMO_GOLD_INGOT, EIO_DEMO_IRON_ORE } from "../eio-demo-data";
import { EioImpulseHopperScreen } from "./index";

/**
 * ImpulseHopper 预览。
 */
export function EioImpulseHopperScreenDemo() {
  return (
    <EioImpulseHopperScreen
      energy={{ max: 100000, value: 48000 }}
      items={{
        "impulse-hopper-input-0": EIO_DEMO_IRON_ORE,
        "impulse-hopper-output-0": EIO_DEMO_GOLD_INGOT,
      }}
      onIoConfig={() => {}}
      onRedstoneChange={() => {}}
      onSlotClick={() => {}}
      state="active"
    />
  );
}
