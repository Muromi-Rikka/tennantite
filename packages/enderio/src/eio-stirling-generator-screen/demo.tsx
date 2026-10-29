import { EIO_DEMO_CHARCOAL } from "../eio-demo-data";
import { EioStirlingGeneratorScreen } from "./index";

/**
 * 斯特林发电机预览：煤炭燃烧 60%，能量 32%，产能 20 µI/t，效率 100%。
 */
export function EioStirlingGeneratorScreenDemo() {
  return (
    <EioStirlingGeneratorScreen
      burn={0.6}
      capacitorInstalled
      efficiency={100}
      energy={{ max: 100000, value: 32000 }}
      fuel={EIO_DEMO_CHARCOAL}
      generating={20}
      onRedstoneChange={() => {}}
      onSlotClick={() => {}}
      state="active"
    />
  );
}
