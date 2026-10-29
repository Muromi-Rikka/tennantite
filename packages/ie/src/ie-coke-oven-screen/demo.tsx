import { IE_DEMO_BUCKET, IE_DEMO_COAL, IE_DEMO_COKE, IE_DEMO_CREOSOTE_BUCKET } from "../ie-demo-data";
import { IeCokeOvenScreen } from "./index";

/**
 * IeCokeOvenScreen 预览用例：煤炭炼焦 65%，焦炉罐 3600 / 8000。
 */
export function IeCokeOvenScreenDemo() {
  return (
    <IeCokeOvenScreen
      bucketOutput={IE_DEMO_CREOSOTE_BUCKET}
      burn={0.65}
      fluidContainer={IE_DEMO_BUCKET}
      input={IE_DEMO_COAL}
      onSlotClick={() => {}}
      output={IE_DEMO_COKE}
      tank={{ max: 8000, tint: "#6e5530", value: 3600 }}
    />
  );
}
