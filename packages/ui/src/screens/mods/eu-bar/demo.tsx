import { EuBar } from "./index";

/**
 * EuBar 预览用例：空槽 / 半满 / 满槽三档状态
*/
export function EuBarDemo() {
  return (
    <div className="flex items-end gap-8">
      <EuBar aria-label="空能量槽" label="空能量槽" max={40000} value={0} />
      <EuBar label="半满能量槽" max={40000} value={18000} />
      <EuBar label="满能量槽" max={40000} value={40000} />
      <EuBar height={20} label="不足一格" max={40000} value={4000} width={10} />
    </div>
  );
}
