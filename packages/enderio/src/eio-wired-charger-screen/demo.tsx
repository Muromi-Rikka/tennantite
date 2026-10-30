import { EIO_DEMO_GOLD_INGOT, EIO_DEMO_IRON_ORE } from "../eio-demo-data";
import { EioWiredChargerScreen } from "./index";

/**
 * WiredCharger 预览。
 */
export function EioWiredChargerScreenDemo() {
  return (
    <EioWiredChargerScreen
      energy={{ max: 100000, value: 48000 }}
      items={{
        "wired-charger-item-charged": EIO_DEMO_GOLD_INGOT,
        "wired-charger-item-to-charge": EIO_DEMO_IRON_ORE,
      }}
      onIoConfig={() => {}}
      onRedstoneChange={() => {}}
      onSlotClick={() => {}}
      progress={0.45}
      state="active"
    />
  );
}
