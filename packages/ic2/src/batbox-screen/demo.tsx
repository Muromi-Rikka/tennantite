import { BatBoxScreen } from "./index";

/**
 * BatBoxScreen 预览用例：充电槽放置 RE 电池（原版图标近似）
*/
export function BatBoxScreenDemo() {
  return (
    <BatBoxScreen
      charge={{ icon: "lapis-lazuli", tooltip: "RE 电池" }}
      energy={{ max: 40000, value: 26000 }}
      title="储电箱"
    />
  );
}
