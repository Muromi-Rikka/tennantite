import { LoomScreen } from "./index";

/**
 * LoomScreen 预览用例（规格 §6.2）：原版无 16×16 旗帜物品贴图，
 * 旗帜/产物槽留空以免展示石头旗帜；只保留染料与图案选择。
*/
export function LoomScreenDemo() {
  return (
    <LoomScreen
      dye={{ count: 1, icon: "blue-dye", tooltip: "蓝色染料" }}
      title="织布机"
    />
  );
}
