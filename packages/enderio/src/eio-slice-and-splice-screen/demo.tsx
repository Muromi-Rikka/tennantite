import { EIO_DEMO_GOLD_INGOT, EIO_DEMO_IRON_ORE } from "../eio-demo-data";
import { EioSliceAndSpliceScreen } from "./index";

/**
 * SliceAndSplice 预览。
 */
export function EioSliceAndSpliceScreenDemo() {
  return (
    <EioSliceAndSpliceScreen
      energy={{ max: 100000, value: 48000 }}
      items={{
        "slice-and-splice-axe": EIO_DEMO_IRON_ORE,
        "slice-and-splice-input-0": EIO_DEMO_IRON_ORE,
        "slice-and-splice-output": EIO_DEMO_GOLD_INGOT,
        "slice-and-splice-shears": EIO_DEMO_IRON_ORE,
      }}
      onIoConfig={() => {}}
      onRedstoneChange={() => {}}
      onSlotClick={() => {}}
      progress={0.45}
      state="active"
    />
  );
}
