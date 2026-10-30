import { EIO_DEMO_GOLD_INGOT, EIO_DEMO_IRON_INGOT, EIO_DEMO_IRON_ORE } from "../eio-demo-data";
import { EioPaintingMachineScreen } from "./index";

/**
 * PaintingMachine 预览。
 */
export function EioPaintingMachineScreenDemo() {
  return (
    <EioPaintingMachineScreen
      energy={{ max: 100000, value: 48000 }}
      items={{
        "painting-machine-input": EIO_DEMO_IRON_ORE,
        "painting-machine-output": EIO_DEMO_GOLD_INGOT,
        "painting-machine-paint": EIO_DEMO_IRON_INGOT,
      }}
      onIoConfig={() => {}}
      onRedstoneChange={() => {}}
      onSlotClick={() => {}}
      progress={0.45}
      state="active"
    />
  );
}
