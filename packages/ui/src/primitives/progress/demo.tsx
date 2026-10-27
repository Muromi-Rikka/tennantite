import { Progress } from "./index";

/**
 * Progress 预览用例：经验条 / Boss 血条
*/
export function ProgressDemo() {
  return (
    <div className="flex w-182 flex-col gap-4">
      <Progress aria-label="经验值" value={62} />
      <Progress aria-label="Boss 血量" value={85} variant="boss" />
    </div>
  );
}
