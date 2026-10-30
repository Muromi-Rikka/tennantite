import { IfMachineScreen } from "./index";

interface IfMachineScreenDemoProps {
  energy?: { max: number; value: number };
  progress?: Record<string, number>;
}

export function IfMachineScreenDemo({
  energy = { max: 1000, value: 620 },
  progress = { bar: 0.45 },
}: IfMachineScreenDemoProps = {}) {
  return (
    <IfMachineScreen
      energy={energy}
      fluids={{
        input_fluid: { max: 1000, tint: "#41CD34", value: 480 },
        output_fluid: { max: 1000, tint: "#B24CD8", value: 260 },
      }}
      machine="dissolutionChamber"
      progress={progress}
    />
  );
}
