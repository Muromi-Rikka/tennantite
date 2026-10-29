import { IF_DEMO_FLUIDS } from "../if-demo-data";
import { IfBiofuelGeneratorScreen } from "./index";

export function IfBiofuelGeneratorScreenDemo() {
  return (
    <IfBiofuelGeneratorScreen
      biofuel={IF_DEMO_FLUIDS.biofuel}
      burn={0.65}
      energy={{ max: 1000, value: 910 }}
    />
  );
}
