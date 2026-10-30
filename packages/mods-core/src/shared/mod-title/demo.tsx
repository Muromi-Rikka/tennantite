import { ModTitle } from "./index";

export function ModTitleDemo() {
  return (
    <div className="relative h-16 w-48">
      <ModTitle left={0} top={0}>左对齐标题</ModTitle>
      <ModTitle right={0} top={16}>右对齐标题</ModTitle>
    </div>
  );
}
