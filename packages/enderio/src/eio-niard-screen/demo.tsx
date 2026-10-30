import { EIO_DEMO_CHARCOAL, EIO_DEMO_IRON_ORE } from "../eio-demo-data";
import { EioNiardScreen } from "./index";

/**
 * Niard 预览。
 */
export function EioNiardScreenDemo() {
  return (
    <EioNiardScreen
      energy={{ max: 100000, value: 48000 }}
      items={{
        "tank-capacitor": EIO_DEMO_CHARCOAL,
        "tank-fill-input": EIO_DEMO_IRON_ORE,
      }}
      onIoConfig={() => {}}
      onRangeToggle={() => {}}
      onRedstoneChange={() => {}}
      onSlotClick={() => {}}
      rangeVisible={true}
      state="active"
    />
  );
}
