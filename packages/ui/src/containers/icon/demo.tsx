import { Icon } from "./index";

/**
 * Icon 预览用例（规格 §5 #4）
*/
export function IconDemo() {
  return (
    <div className="flex flex-wrap items-end gap-12">
      <Icon name="heart" size={9} />
      <Icon name="grass-block" size={16} />
      <Icon name="emerald" size={32} />
      <Icon name="diamond" />
      <Icon name="sword" size={24} />
      <Icon className="border-(length:--mc-gui) border-black" name="stone-block" size={32} />
    </div>
  );
}
