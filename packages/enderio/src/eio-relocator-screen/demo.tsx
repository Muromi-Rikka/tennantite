import { EIO_DEMO_CHARCOAL, EIO_DEMO_SOUL_VIAL } from "../eio-demo-data";
import { EioRelocatorScreen } from "./index";

/**
 * Relocator 预览。
 */
export function EioRelocatorScreenDemo() {
  return (
    <EioRelocatorScreen
      background="screen/relocator"
      energy={{ max: 100000, value: 48000 }}
      items={{
        "obelisk-capacitor": EIO_DEMO_CHARCOAL,
        "obelisk-filter": EIO_DEMO_SOUL_VIAL,
      }}
      onRangeToggle={() => {}}
      onRedstoneChange={() => {}}
      onSlotClick={() => {}}
      rangeVisible={true}
      state="active"
    />
  );
}
