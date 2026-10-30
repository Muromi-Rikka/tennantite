import { ModTank } from "./index";

export function ModTankDemo() {
  return (
    <div className="relative size-24">
      <ModTank
        height={40}
        inset={1}
        label="液体"
        left={8}
        max={100}
        tint="#3f76e4"
        top={8}
        value={30}
        width={40}
      />
    </div>
  );
}
