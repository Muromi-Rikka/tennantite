import { IeCrateScreen } from "./index";

/**
 * IeCrateScreen 预览用例：装满矿物的储物木箱。
 */
export function IeCrateScreenDemo() {
  return (
    <IeCrateScreen
      items={Array.from({ length: 27 }, (_, i) => i < 9 ? { count: 64, icon: "iron-ore", tooltip: "铁矿石" } : (i < 12 ? { count: 32, icon: "iron-ingot", tooltip: "铁锭" } : null))}
      name="矿场补给箱"
      onNameChange={() => {}}
      onSlotClick={() => {}}
    />
  );
}
