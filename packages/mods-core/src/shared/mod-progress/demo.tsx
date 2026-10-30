import { ModProgress } from "./index";

const FILL = { background: "#55ff55", height: "100%", width: "100%" };

export function ModProgressDemo() {
  return (
    <div className="relative h-24 w-48">
      <ModProgress
        direction="right"
        fill={<div style={FILL} />}
        height={12}
        label="横向进度"
        left={8}
        progress={0.6}
        top={8}
        width={80}
      />
      <ModProgress
        ariaValue="percent"
        direction="up"
        fill={<div style={{ ...FILL, background: "#3f76e4" }} />}
        height={40}
        label="纵向百分比"
        left={104}
        max={100}
        top={8}
        value={35}
        width={12}
      />
    </div>
  );
}
