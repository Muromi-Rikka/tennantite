import { BlockIcon } from "./index";

/**
 * BlockIcon 预览用例（规格 §5 #6）
 */
export function BlockIconDemo() {
  return (
    <div className="flex flex-wrap items-end gap-12">
      <BlockIcon name="grass-block" />
      <BlockIcon name="stone-block" size={32} />
      <BlockIcon name="oak-log" size={32} />
      <BlockIcon name="crafting-table" size={32} />
      <BlockIcon name="iron-ore" size={24} />
      <BlockIcon name="ice" size={24} />
      <BlockIcon name="sand" />
      <BlockIcon name="oak-planks" />
    </div>
  );
}
