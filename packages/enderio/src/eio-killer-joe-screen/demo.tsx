import { EIO_DEMO_CHARCOAL } from "../eio-demo-data";
import { EioKillerJoeScreen } from "./index";

/**
 * KillerJoe 预览。
 */
export function EioKillerJoeScreenDemo() {
  return (
    <EioKillerJoeScreen
      items={{
        "killer-joe-food": EIO_DEMO_CHARCOAL,
      }}
    />
  );
}
