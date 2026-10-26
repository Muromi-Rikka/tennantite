import { Progress } from "./index";

/**
 * Progress 预览用例：经验条 / Boss 血条 / 燃料条
*/
export function ProgressDemo() {
  return (
    <div className="flex w-320 flex-col gap-24">
      <Progress aria-label="经验值" value={62} />
      <Progress aria-label="Boss 血量" value={0.85} variant="boss" />
      <Progress aria-label="燃料" value={0.4} variant="fuel" />
      <Progress aria-label="加载中" value={null} />
    </div>
  );
}
