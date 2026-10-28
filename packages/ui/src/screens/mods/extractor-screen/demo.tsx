import { ExtractorScreen } from "./index";

/**
 * ExtractorScreen 预览用例：橡木木板 → 橡胶（原版图标近似）
*/
export function ExtractorScreenDemo() {
  return (
    <ExtractorScreen
      energy={{ max: 2000, value: 600 }}
      input={{ icon: "oak-planks", tooltip: "橡木木板" }}
      output={{ count: 3, icon: "charcoal", tooltip: "橡胶" }}
      progress={0.3}
      redstoneMode="none"
      title="提取机"
    />
  );
}
