import { CesuScreen } from "./index";

/**
 * CesuScreen 预览用例：300k EU 容量的 CESU
*/
export function CesuScreenDemo() {
  return (
    <CesuScreen
      charge={{ icon: "lapis-lazuli", tooltip: "RE 电池" }}
      energy={{ max: 300000, value: 210000 }}
      title="CESU 储电箱"
    />
  );
}
