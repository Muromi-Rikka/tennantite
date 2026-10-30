import { EIO_DEMO_CHARCOAL } from "../eio-demo-data";
import { EioDrainScreen } from "./index";

/**
 * Drain 预览。
 */
export function EioDrainScreenDemo() {
  return (
    <EioDrainScreen
      energy={{ max: 100000, value: 48000 }}
      items={{
        "tank-capacitor": EIO_DEMO_CHARCOAL,
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
