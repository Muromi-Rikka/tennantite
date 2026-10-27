import { Panel } from "../panel/index";
import { Divider } from "./index";

export function DividerDemo() {
  return (
    <Panel className="w-160 p-8">
      <p className="font-mc mc-text">上方内容</p>
      <Divider className="my-8" />
      <p className="font-mc mc-text text-mc-text-dim">下方内容</p>
      <div className="mt-8 flex h-40 items-stretch gap-8">
        <span className="font-mc mc-text">左</span>
        <Divider orientation="vertical" />
        <span className="font-mc mc-text">右</span>
      </div>
      <Divider className="my-8" variant="strong" />
      <p className="font-mc mc-text text-mc-text-dim">strong 单实线</p>
    </Panel>
  );
}
