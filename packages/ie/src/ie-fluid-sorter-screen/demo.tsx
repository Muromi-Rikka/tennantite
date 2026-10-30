import { IeFluidSorterScreen } from "./index";

/**
 * IeFluidSorterScreen 预览用例：若干流体过滤格与 NBT 开关。
 */
export function IeFluidSorterScreenDemo() {
  return (
    <IeFluidSorterScreen
      filters={Array.from({ length: 48 }, (_, i) => i % 4 === 0 ? { tint: "#3a5cc8" } : (i % 4 === 1 ? { tint: "#7a8f3a" } : null))}
      nbt={[true, false, true, false, true, false]}
      onCellClick={() => {}}
      onNbtClick={() => {}}
    />
  );
}
