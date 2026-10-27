import { Badge } from "./index";

/**
 * Badge 预览用例：物品数量与稀有标识
*/
export function BadgeDemo() {
  return (
    <div className="flex items-end gap-12">
      <span className="mc-tex-slot relative block size-18">
        <Badge className="absolute right-1 bottom-0">64</Badge>
      </span>
      <span className="mc-tex-slot relative block size-18">
        <Badge className="absolute right-1 bottom-0" variant="gold">
          1
        </Badge>
      </span>
      <Badge variant="gold">史诗</Badge>
      <Badge variant="dim">v0.1.0</Badge>
    </div>
  );
}
