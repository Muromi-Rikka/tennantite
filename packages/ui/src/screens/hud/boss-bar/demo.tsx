import { BossBar } from "./index";

/**
 * BossBar 预览用例（规格 §6.1）
*/
export function BossBarDemo() {
  return (
    <div className="flex w-182 flex-col gap-12">
      <BossBar name="凋灵" value={0.75} />
      <BossBar name="末影龙" value={0.25} />
    </div>
  );
}
