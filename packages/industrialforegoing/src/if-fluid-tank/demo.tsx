import { IfFluidTank } from "./index";

export function IfFluidTankDemo() {
  return (
    <div className="relative h-40 w-48">
      <IfFluidTank
        color="blue"
        left={8}
        max={1000}
        name="normal"
        size="normal"
        tint="#287697"
        top={8}
        value={640}
      />
      <IfFluidTank
        color="lime"
        left={40}
        max={1000}
        name="small"
        size="small"
        tint="#41CD34"
        top={8}
        value={320}
      />
    </div>
  );
}
