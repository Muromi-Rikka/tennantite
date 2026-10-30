import { FermentorScreen } from "./index";

/**
 * FermentorScreen 预览用例：流体机器，生物质 → 沼气；物品槽留空
*/
export function FermentorScreenDemo() {
  return (
    <FermentorScreen
      discharge={{ icon: "lapis-lazuli", tooltip: "RE 电池" }}
      energy={{ max: 2000, value: 1100 }}
      progress={0.5}
      title="发酵机"
    />
  );
}
