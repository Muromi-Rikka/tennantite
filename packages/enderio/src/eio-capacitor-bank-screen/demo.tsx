import { EioCapacitorBankScreen } from "./index";

/**
 * 电容组预览：1.2M / 4M RF（30%）。
 */
export function EioCapacitorBankScreenDemo() {
  return (
    <EioCapacitorBankScreen
      energy={{ max: 4000000, value: 1200000 }}
      onRedstoneChange={() => {}}
    />
  );
}
