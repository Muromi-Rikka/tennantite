import { FermentorScreen } from "./index";

/**
 * FermentorScreen 预览用例：小麦 + 电池 → 发酵产物（原版图标近似）
*/
export function FermentorScreenDemo() {
  return (
    <FermentorScreen
      discharge={{ icon: "lapis-lazuli", tooltip: "RE 电池" }}
      energy={{ max: 2000, value: 1100 }}
      input={{ icon: "wheat", tooltip: "小麦" }}
      output={{ count: 1, icon: "potion", tooltip: "发酵产物" }}
      progress={0.5}
      title="发酵机"
    />
  );
}
