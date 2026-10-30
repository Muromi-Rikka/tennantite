import { EIO_DEMO_BOOK } from "../eio-demo-data";
import { EioEnchanterScreen } from "./index";

/**
 * Enchanter 预览：书 + 催化剂 → 附魔书，费用 12 级。
 */
export function EioEnchanterScreenDemo() {
  return (
    <EioEnchanterScreen
      cost={12}
      items={{
        "enchanter-book": EIO_DEMO_BOOK,
        "enchanter-catalyst": EIO_DEMO_BOOK,
        "enchanter-lapis": EIO_DEMO_BOOK,
        "enchanter-output": EIO_DEMO_BOOK,
      }}
    />
  );
}
