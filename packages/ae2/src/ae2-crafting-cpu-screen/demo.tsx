import { Ae2CraftingCpuScreen } from "./index";

/**
 * Ae2CraftingCpuScreen 预览用例：进行中的合成任务清单。
 */
export function Ae2CraftingCpuScreenDemo() {
  return (
    <Ae2CraftingCpuScreen
      eta="3分12秒"
      jobs={[
        { detail: "已存储: 64 / 合成中: 8", icon: { icon: "iron-ingot", tooltip: "铁锭" }, id: "iron" },
        { detail: "已存储: 12", icon: { icon: "gold-ingot", tooltip: "金锭" }, id: "gold" },
        { detail: "已排队: 3", icon: { icon: "diamond", tooltip: "钻石" }, id: "diamond" },
        { detail: "已存储: 7", icon: { icon: "charcoal", tooltip: "煤炭" }, id: "charcoal" },
      ]}
      onCancel={() => {}}
      progress={0.25}
    />
  );
}
