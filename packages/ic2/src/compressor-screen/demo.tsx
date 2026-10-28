import { CompressorScreen } from "./index";

/**
 * CompressorScreen 预览用例：煤炭 → 钻石（原版图标近似）
*/
export function CompressorScreenDemo() {
  return (
    <CompressorScreen
      energy={{ max: 2000, value: 1100 }}
      input={{ icon: "charcoal", tooltip: "煤炭" }}
      output={{ icon: "diamond", tooltip: "钻石" }}
      progress={0.6}
      title="压缩机"
    />
  );
}
