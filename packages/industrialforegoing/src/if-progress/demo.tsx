import { IfProgress } from "./index";

export function IfProgressDemo() {
  return (
    <div className="relative size-64">
      <IfProgress kind="vertical" label="竖条" left={8} max={1} top={8} value={0.5} />
      <IfProgress color="orange" kind="arrow-right" label="右箭头" left={40} max={1} top={40} value={0.6} />
      <IfProgress color="cyan" kind="arrow-down" label="下箭头" left={70} max={1} top={40} value={0.4} />
    </div>
  );
}
