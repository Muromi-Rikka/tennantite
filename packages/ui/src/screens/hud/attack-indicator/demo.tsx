import { AttackIndicator } from "./index";

export function AttackIndicatorDemo() {
  return (
    <div className="flex items-center gap-8">
      <AttackIndicator progress={0.5} />
      <AttackIndicator progress={1} variant="hotbar" />
    </div>
  );
}
