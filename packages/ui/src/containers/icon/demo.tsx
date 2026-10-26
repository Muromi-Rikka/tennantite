import { Icon } from "./index";

/**
 * Icon 预览用例（规格 §5 #4）
*/
export function IconDemo() {
  return (
    <div className="flex flex-wrap items-end gap-24">
      <Icon name="heart" size={32} />
      <Icon name="grass-block" size={48} />
      <Icon name="creeper-face" size={64} />
      <Icon name="diamond" size={32} />
      <Icon name="sword" size={48} />
      <Icon className="border border-black" name="stone-block" size={64} />
    </div>
  );
}
