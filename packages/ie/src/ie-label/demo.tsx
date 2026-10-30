import { IeLabel } from "./index";

/**
 * IeLabel 预览用例：左上角标题（显式 left）与居中说明行（省略 left）。
 */
export function IeLabelDemo() {
  return (
    <div className="relative h-20 w-44">
      <IeLabel left={8} top={6}>焦炉</IeLabel>
      <IeLabel top={24}>物品栏</IeLabel>
      <IeLabel left={8} top={42}>能量：3600 / 8000</IeLabel>
    </div>
  );
}
