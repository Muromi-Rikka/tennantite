import { EIO_DEMO_GOLD_INGOT, EIO_DEMO_IRON_INGOT, EIO_DEMO_IRON_ORE } from "../eio-demo-data";
import { EioAlloySmelterScreen } from "./index";

/**
 * 合金炉预览：全部模式、铁矿石 + 铁锭 + 铁矿石 → 金锭，进度 50%，能量 65%。
 */
export function EioAlloySmelterScreenDemo() {
  return (
    <EioAlloySmelterScreen
      energy={{ max: 100000, value: 65000 }}
      inputs={[EIO_DEMO_IRON_ORE, EIO_DEMO_IRON_INGOT, EIO_DEMO_IRON_ORE]}
      onModeChange={() => {}}
      onRedstoneChange={() => {}}
      onSlotClick={() => {}}
      output={EIO_DEMO_GOLD_INGOT}
      progress={0.5}
      state="active"
    />
  );
}
