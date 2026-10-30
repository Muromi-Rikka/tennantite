import { EIO_DEMO_BOOK } from "../eio-demo-data";
import { EioTravelAnchorScreen } from "./index";

/**
 * TravelAnchor 预览：命名锚点、可见。
 */
export function EioTravelAnchorScreenDemo() {
  return (
    <EioTravelAnchorScreen
      ghost={EIO_DEMO_BOOK}
      name="家园锚点"
      onNameChange={() => {}}
      onSlotClick={() => {}}
      onVisibleChange={() => {}}
      visible={true}
    />
  );
}
