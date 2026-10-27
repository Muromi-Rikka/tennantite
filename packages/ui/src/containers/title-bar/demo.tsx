import { Panel } from "../panel/index";
import { TitleBar } from "./index";

export function TitleBarDemo() {
  return (
    <Panel className="w-160 p-8">
      <TitleBar title="合成" />
      <p className="mt-8 font-mc mc-text text-mc-text-dim">居中标题（默认）</p>
      <TitleBar align="start" className="mt-8" title="左对齐" />
      <TitleBar align="end" className="mt-8" title="右对齐" />
    </Panel>
  );
}
