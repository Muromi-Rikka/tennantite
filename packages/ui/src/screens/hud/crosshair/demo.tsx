import { Crosshair } from "./index";

/**
 * Crosshair 预览用例（规格 §6.1）
*/
export function CrosshairDemo() {
  return (
    <div className="flex items-center gap-24">
      <div className="relative size-64 bg-linear-to-br from-[#5b3] to-[#357]">
        <div className="absolute top-1/2 left-1/2 -translate-1/2">
          <Crosshair />
        </div>
      </div>
      <Crosshair hidden />
      <Crosshair size={24} thickness={3} />
    </div>
  );
}
