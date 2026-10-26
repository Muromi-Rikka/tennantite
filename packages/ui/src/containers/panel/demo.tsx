import { TitleBar } from "../title-bar/index";
import { Panel } from "./index";

/**
 * Panel 预览用例（规格 §5 #1）
*/
export function PanelDemo() {
  return (
    <div className="flex items-start gap-24">
      <Panel className="w-280">
        <TitleBar title="Panel" />
        <p className="font-readable text-mc">窗口灰面板（default 变体）</p>
      </Panel>
      <Panel
        className="w-280 bg-linear-to-br from-[#5b3] to-[#357]"
        variant="dark"
      >
        <TitleBar title="Panel dark" />
        <p className="font-readable text-mc">半透明暗底，底色可透出</p>
      </Panel>
    </div>
  );
}
