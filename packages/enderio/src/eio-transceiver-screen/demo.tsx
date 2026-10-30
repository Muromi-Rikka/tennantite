import { EIO_DEMO_IRON_INGOT, EIO_DEMO_SOUL_VIAL } from "../eio-demo-data";
import { EioTransceiverScreen } from "./index";

/**
 * Transceiver 预览：general 模式，信道槽位。
 */
export function EioTransceiverScreenDemo() {
  return (
    <EioTransceiverScreen
      items={{
        "transceiver-channel-0": EIO_DEMO_IRON_INGOT,
        "transceiver-channel-5": EIO_DEMO_SOUL_VIAL,
      }}
      onSlotClick={() => {}}
    />
  );
}
