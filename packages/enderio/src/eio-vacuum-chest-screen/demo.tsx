import { EIO_DEMO_GOLD_INGOT, EIO_DEMO_IRON_ORE } from "../eio-demo-data";
import { EioVacuumChestScreen } from "./index";

/**
 * VacuumChest 预览。
 */
export function EioVacuumChestScreenDemo() {
  return (
    <EioVacuumChestScreen
      items={{
        "vacuum-chest-filter": EIO_DEMO_IRON_ORE,
        "vacuum-chest-main-0": EIO_DEMO_GOLD_INGOT,
      }}
      onRangeToggle={() => {}}
      onRedstoneChange={() => {}}
      onSlotClick={() => {}}
      rangeVisible={true}
      state="active"
    />
  );
}
