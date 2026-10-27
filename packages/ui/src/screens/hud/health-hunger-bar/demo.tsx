import { HealthHungerBar } from "./index";

/**
 * HealthHungerBar 预览用例（规格 §6.1）
*/
export function HealthHungerBarDemo() {
  return (
    <div className="flex flex-col gap-12">
      <HealthHungerBar health={20} hunger={17} />
      <HealthHungerBar armor={13} health={7} hunger={9} oxygen={6} />
      <HealthHungerBar health={1} hunger={0} />
    </div>
  );
}
