import { EIO_DEMO_CHARCOAL } from "../eio-demo-data";
import { EioWirelessChargerScreen } from "./index";

/**
 * WirelessCharger 预览。
 */
export function EioWirelessChargerScreenDemo() {
  return (
    <EioWirelessChargerScreen
      energy={{ max: 100000, value: 48000 }}
      items={{
        "wireless-charger-capacitor": EIO_DEMO_CHARCOAL,
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
