import { EIO_DEMO_CHARCOAL } from "../eio-demo-data";
import { EioSoulEngineScreen } from "./index";

/**
 * SoulEngine 预览。
 */
export function EioSoulEngineScreenDemo() {
  return (
    <EioSoulEngineScreen
      energy={{ max: 100000, value: 48000 }}
      items={{
        "soul-engine-capacitor": EIO_DEMO_CHARCOAL,
      }}
      onIoConfig={() => {}}
      onRedstoneChange={() => {}}
      onSlotClick={() => {}}
      state="active"
    />
  );
}
