import { Divider } from "../divider/index";
import { Card } from "./index";

/**
 * Card / TitleBar / Divider 预览用例（规格 §5 #5）
*/
export function CardDemo() {
  return (
    <Card align="center" className="w-280" title="合成">
      <p className="font-readable text-mc">Panel + TitleBar + 内容区块</p>
      <Divider className="my-8" />
      <p className="font-readable text-mc text-mc-text-dim">分隔线上下</p>
    </Card>
  );
}
