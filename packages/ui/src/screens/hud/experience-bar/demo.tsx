import { ExperienceBar } from "./index";

/**
 * ExperienceBar 预览用例（规格 §6.1）
*/
export function ExperienceBarDemo() {
  return (
    <div className="flex w-182 flex-col gap-8">
      <ExperienceBar level={30} progress={0.62} />
      <ExperienceBar level={0} progress={0.05} />
    </div>
  );
}
