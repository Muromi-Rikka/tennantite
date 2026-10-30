import { MfsuScreen } from "./index";

/**
 * MfsuScreen 预览用例：40M EU 容量的 MFSU
*/
export function MfsuScreenDemo() {
  return (
    <MfsuScreen
      charge={{ icon: "lapis-lazuli", tooltip: "充电槽" }}
      energy={{ max: 40000000, value: 26000000 }}
      title="MFSU 超高压储电箱"
    />
  );
}
