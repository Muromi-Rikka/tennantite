import { StatisticsScreen } from "./index";

export function StatisticsScreenDemo() {
  return <StatisticsScreen groups={[{ name: "通用", rows: [{ label: "挖掘方块", value: 128 }] }]} />;
}
