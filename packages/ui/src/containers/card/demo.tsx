import { Divider } from "../divider/index";
import { Card } from "./index";

/**
 * Card / TitleBar / Divider 预览用例（规格 §5 #5）
*/
export function CardDemo() {
  return (
    <Card align="center" className="w-140" title="合成">
      <p className="font-mc mc-text">Panel + TitleBar + 内容区块</p>
      <Divider className="my-4" />
      <p className="font-mc mc-text text-mc-text-dim">分隔线上下</p>
    </Card>
  );
}
