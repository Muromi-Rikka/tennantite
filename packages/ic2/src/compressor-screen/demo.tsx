import { CompressorScreen } from "./index";

/**
 * CompressorScreen 预览用例：9 铁锭 → 1 铁块（原版图标近似）
*/
export function CompressorScreenDemo() {
  return (
    <CompressorScreen
      energy={{ max: 2000, value: 1100 }}
      input={{ count: 9, icon: "iron-ingot", tooltip: "铁锭 ×9" }}
      output={{ count: 1, icon: "iron-block", tooltip: "铁块" }}
      progress={0.6}
      title="压缩机"
    />
  );
}
