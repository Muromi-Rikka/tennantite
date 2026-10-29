import { IF_DEMO_ITEMS } from "../if-demo-data";
import { IfMachineScreen } from "./index";

export function IfMachineScreenDemo() {
  return (
    <IfMachineScreen
      energy={{ max: 1000, value: 620 }}
      fluids={{
        input_fluid: { max: 1000, tint: "#41CD34", value: 480 },
        output_fluid: { max: 1000, tint: "#B24CD8", value: 260 },
      }}
      items={{
        "input-0": IF_DEMO_ITEMS.diamond,
        "input-1": IF_DEMO_ITEMS.wheat,
        "input-2": IF_DEMO_ITEMS.emerald,
        "output-0": IF_DEMO_ITEMS.gunpowder,
      }}
      machine="dissolutionChamber"
      progress={{ bar: 0.45 }}
    />
  );
}
