import { IeCapacitorHvScreen } from "./index";

/**
 * IeCapacitorHvScreen 预览用例：2.6M / 4M，输入模式。
 */
export function IeCapacitorHvScreenDemo() {
  return (
    <IeCapacitorHvScreen
      energy={{ capacity: 4000000, value: 2600000 }}
      mode="input"
      onModeChange={() => {}}
    />
  );
}
