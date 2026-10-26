import { ItemStack } from "./index";

/**
 * ItemStack 预览用例（规格 §5 #3）
*/
export function ItemStackDemo() {
  return (
    <div className="flex items-center gap-16">
      <ItemStack count={64} icon="stone-block" />
      <ItemStack count={1} icon="diamond" selected tooltip="钻石" />
      <ItemStack icon="apple" tooltip="苹果 · 恢复 4 饥饿" />
      <ItemStack count={3} icon="sword" selected />
    </div>
  );
}
