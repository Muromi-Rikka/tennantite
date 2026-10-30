import { ModLabel } from "./index";

export function ModLabelDemo() {
  return (
    <div className="relative h-24 w-48">
      <ModLabel top={4}>居中文字</ModLabel>
      <ModLabel color="#f78034" shadow top={20}>橙色阴影</ModLabel>
      <ModLabel left={0} lineHeight={9} size={5.4} top={36}>5.4px 小字</ModLabel>
    </div>
  );
}
