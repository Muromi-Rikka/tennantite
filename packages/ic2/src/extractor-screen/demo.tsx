import { ExtractorScreen } from "./index";

/**
 * ExtractorScreen 预览用例：黏性树脂 → 3 橡胶（原版图标近似）
*/
export function ExtractorScreenDemo() {
  return (
    <ExtractorScreen
      energy={{ max: 2000, value: 600 }}
      input={{ count: 1, icon: "oak-planks", tooltip: "黏性树脂" }}
      output={{ count: 3, icon: "charcoal", tooltip: "橡胶 ×3" }}
      progress={0.3}
      title="提取机"
    />
  );
}
