import { EIO_DEMO_IRON_INGOT, EIO_DEMO_SOUL_VIAL } from "../eio-demo-data";
import { EioVatScreen } from "./index";

/**
 * Vat 预览：双试剂 + 进度 45%。
 */
export function EioVatScreenDemo() {
  return (
    <EioVatScreen
      items={{
        "vat-reagent-0": EIO_DEMO_IRON_INGOT,
        "vat-reagent-1": EIO_DEMO_SOUL_VIAL,
      }}
      onDumpOutputTank={() => {}}
      onRedstoneChange={() => {}}
      onSlotClick={() => {}}
      onTransferOutputTank={() => {}}
      progress={0.45}
    />
  );
}
