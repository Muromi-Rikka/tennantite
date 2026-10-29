import { EIO_DEMO_GOLD_INGOT, EIO_DEMO_GUNPOWDER, EIO_DEMO_IRON_ORE } from "../eio-demo-data";
import { EioSagMillScreen } from "./index";

/**
 * SAG 磨粉机预览：铁矿石 16 → 金锭 ×4，研磨球耐久 70%，进度 35%，能量 72%。
 */
export function EioSagMillScreenDemo() {
  return (
    <EioSagMillScreen
      energy={{ max: 100000, value: 72000 }}
      grindingBall={{ durability: 0.7 }}
      grindingBallSlot={EIO_DEMO_GUNPOWDER}
      input={EIO_DEMO_IRON_ORE}
      onRedstoneChange={() => {}}
      onSlotClick={() => {}}
      outputs={[EIO_DEMO_GOLD_INGOT, EIO_DEMO_GOLD_INGOT, EIO_DEMO_GOLD_INGOT, EIO_DEMO_GOLD_INGOT]}
      progress={0.35}
      state="active"
    />
  );
}
