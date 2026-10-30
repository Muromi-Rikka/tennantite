import { MekanismBar } from "./index";

/**
 * MekanismBar 预览用例：纵向功率条、横向速率条与动态条（渐变染色）。
 */
export function MekanismBarDemo() {
  return (
    <div className="relative h-40 w-64">
      <MekanismBar height={52} kind="power" label="功率" left={10} top={10} value={0.65} />
      <MekanismBar
        horizontal
        kind="rate"
        label="速率"
        left={34}
        tint={{ from: "#366bd0", to: "#5a8cff" }}
        top={10}
        value={0.45}
        width={78}
      />
      <MekanismBar height={32} kind="dynamic" label="动态" left={34} top={34} value={0.7} width={78} />
    </div>
  );
}
