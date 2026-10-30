import { EIO_DEMO_CHARCOAL, EIO_DEMO_SOUL_VIAL } from "../eio-demo-data";
import { EioAversionScreen } from "./index";

/**
 * Aversion 预览。
 */
export function EioAversionScreenDemo() {
  return (
    <EioAversionScreen
      background="screen/aversion"
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
