import { EIO_DEMO_GOLD_INGOT, EIO_DEMO_IRON_ORE } from "../eio-demo-data";
import { EioBufferScreen } from "./index";

/**
 * Buffer 预览。
 */
export function EioBufferScreenDemo() {
  return (
    <EioBufferScreen
      items={{
        "buffer-slot-0": EIO_DEMO_IRON_ORE,
        "buffer-slot-1": EIO_DEMO_GOLD_INGOT,
      }}
    />
  );
}
