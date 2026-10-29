import { IE_DEMO_IRON_INGOT, IE_DEMO_MOLD } from "../ie-demo-data";
import { IeMetalPressScreen } from "./index";

/**
 * IeMetalPressScreen 预览用例：选中第二个模具，进度 0.5。
 */
export function IeMetalPressScreenDemo() {
  return (
    <IeMetalPressScreen
      activeMold={1}
      input={IE_DEMO_IRON_INGOT}
      molds={[IE_DEMO_MOLD, IE_DEMO_MOLD, IE_DEMO_MOLD]}
      onMoldSelect={() => {}}
      onSlotClick={() => {}}
      output={{ count: 2, icon: "iron-ingot", tooltip: "铁板" }}
      progress={0.5}
    />
  );
}
