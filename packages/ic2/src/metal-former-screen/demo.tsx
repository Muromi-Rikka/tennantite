import { gui } from "@tennantite/ui";

import { MetalFormerScreen } from "./index";

const MODES = [
  { label: "滚压", mode: "rolling" },
  { label: "挤压", mode: "extruding" },
  { label: "造板", mode: "ingot" },
] as const;

/**
 * MetalFormerScreen 预览用例：铁锭 → 铁板（原版图标近似）；rolling /
 * extruding / ingot 三个模式按钮经 `children` 注入（原版 20×20 按钮贴图，
 * `guidef/metal_former.xml` 无按钮坐标，摆位取进度条与产物槽之间的空档）。
*/
export function MetalFormerScreenDemo() {
  return (
    <MetalFormerScreen
      discharge={{ icon: "lapis-lazuli", tooltip: "RE 电池" }}
      energy={{ max: 2000, value: 1400 }}
      input={{ icon: "iron-ingot", tooltip: "铁锭" }}
      output={{ count: 2, icon: "iron-ingot", tooltip: "铁板" }}
      progress={0.6}
      title="金属成型机"
    >
      {MODES.map((mode, index) => (
        <button
          aria-label={`模式：${mode.label}`}
          className="mc-tex-ic2-btn absolute cursor-pointer border-0 p-0"
          key={mode.mode}
          style={{ height: gui(20), left: gui(40 + index * 22), top: gui(58), width: gui(20) }}
          title={`模式：${mode.label}`}
          type="button"
        >
          <span className="text-mc-text font-mc mc-text" style={{ fontSize: gui(8) }}>
            {mode.label}
          </span>
        </button>
      ))}
    </MetalFormerScreen>
  );
}
