import { ThermalSprite } from "./index";

/**
 * ThermalSprite 预览用例：容器整图、能量图集裁剪格与染色裁剪。
 */
export function ThermalSpriteDemo() {
  return (
    <div className="relative h-[180px] w-[220px]">
      <ThermalSprite crop={{ height: 166, width: 176, x: 0, y: 0 }} height={166} name="container/pulverizer" width={176} />
      <ThermalSprite
        crop={{ height: 42, width: 16, x: 0, y: 0 }}
        left={186}
        name="elements/storage_energy"
        top={10}
      />
      <ThermalSprite
        crop={{ height: 40, width: 16, x: 16, y: 1 }}
        height={40}
        left={186}
        name="elements/storage_energy"
        tint="#3c7fe0"
        top={60}
      />
    </div>
  );
}
