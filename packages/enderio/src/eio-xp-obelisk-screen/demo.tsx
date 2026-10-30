import { EioXpObeliskScreen } from "./index";

/**
 * XpObelisk 预览：30 级 60% 经验。
 */
export function EioXpObeliskScreenDemo() {
  return (
    <EioXpObeliskScreen
      onRedstoneChange={() => {}}
      onXpAction={() => {}}
      redstone="always_active"
      xp={{ level: 30, progress: 0.6 }}
    />
  );
}
