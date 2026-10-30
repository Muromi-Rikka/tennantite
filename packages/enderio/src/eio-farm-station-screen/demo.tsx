import { EIO_DEMO_GOLD_INGOT, EIO_DEMO_IRON_ORE } from "../eio-demo-data";
import { EioFarmStationScreen } from "./index";

/**
 * FarmStation 预览。
 */
export function EioFarmStationScreenDemo() {
  return (
    <EioFarmStationScreen
      energy={{ max: 100000, value: 48000 }}
      items={{
        "farm-station-output-0": EIO_DEMO_GOLD_INGOT,
        "farm-station-tool-0": EIO_DEMO_IRON_ORE,
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
