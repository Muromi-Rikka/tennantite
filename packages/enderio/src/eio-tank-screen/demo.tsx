import { EIO_DEMO_GOLD_INGOT, EIO_DEMO_IRON_ORE } from "../eio-demo-data";
import { EioTankScreen } from "./index";

/**
 * Tank 预览。
 */
export function EioTankScreenDemo() {
  return (
    <EioTankScreen
      items={{
        "tank-drain-output": EIO_DEMO_GOLD_INGOT,
        "tank-fill-input": EIO_DEMO_IRON_ORE,
      }}
      onIoConfig={() => {}}
      onRedstoneChange={() => {}}
      onSlotClick={() => {}}
      state="active"
    />
  );
}
