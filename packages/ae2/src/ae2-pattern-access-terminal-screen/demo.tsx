import { Ae2PatternAccessTerminalScreen } from "./index";

/**
 * Ae2PatternAccessTerminalScreen 预览用例：一台满载 CPU + 两台空闲 CPU。
 */
export function Ae2PatternAccessTerminalScreenDemo() {
  return (
    <Ae2PatternAccessTerminalScreen
      cpus={[
        { detail: "存储: 2,034 · 合成中: 64", id: "cpu-0", name: "主 CPU" },
        { detail: "空闲", id: "cpu-1", name: "备用 CPU" },
        { detail: "空闲", id: "cpu-2", name: "并行 CPU" },
      ]}
      onCpuClick={() => {}}
      scroll={0.4}
      selectedId="cpu-0"
    />
  );
}
