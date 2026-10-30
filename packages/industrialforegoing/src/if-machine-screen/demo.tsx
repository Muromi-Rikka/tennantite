import { IfMachineScreen } from "./index";

export function IfMachineScreenDemo() {
  return (
    <IfMachineScreen
      energy={{ max: 1000, value: 620 }}
      fluids={{
        input_fluid: { max: 1000, tint: "#41CD34", value: 480 },
        output_fluid: { max: 1000, tint: "#B24CD8", value: 260 },
      }}
      machine="dissolutionChamber"
      progress={{ bar: 0.45 }}
    />
  );
}
