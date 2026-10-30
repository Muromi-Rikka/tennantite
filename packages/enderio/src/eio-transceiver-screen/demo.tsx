import { EIO_DEMO_IRON_INGOT } from "../eio-demo-data";
import { EioTransceiverScreen } from "./index";

/**
 * Transceiver 预览：general 模式，左列与信道槽位。
 */
export function EioTransceiverScreenDemo() {
  return (
    <EioTransceiverScreen
      items={{
        "transceiver-channel-0": EIO_DEMO_IRON_INGOT,
        "transceiver-left-0": EIO_DEMO_IRON_INGOT,
      }}
      onSlotClick={() => {}}
    />
  );
}
