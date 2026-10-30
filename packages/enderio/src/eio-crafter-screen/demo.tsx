import { EIO_DEMO_GOLD_INGOT, EIO_DEMO_IRON_ORE } from "../eio-demo-data";
import { EioCrafterScreen } from "./index";

/**
 * Crafter 预览。
 */
export function EioCrafterScreenDemo() {
  return (
    <EioCrafterScreen
      energy={{ max: 100000, value: 48000 }}
      items={{
        "crafter-ghost-0": EIO_DEMO_IRON_ORE,
        "crafter-input-0": EIO_DEMO_IRON_ORE,
        "crafter-output": EIO_DEMO_GOLD_INGOT,
      }}
      onIoConfig={() => {}}
      onRedstoneChange={() => {}}
      onSlotClick={() => {}}
      state="active"
    />
  );
}
