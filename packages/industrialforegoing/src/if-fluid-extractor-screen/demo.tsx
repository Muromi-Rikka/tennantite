import { IF_DEMO_FLUIDS } from "../if-demo-data";
import { IfFluidExtractorScreen } from "./index";

export function IfFluidExtractorScreenDemo() {
  return (
    <IfFluidExtractorScreen
      area={{ particles: true, showArea: false }}
      energy={{ max: 1000, value: 400 }}
      fluid={IF_DEMO_FLUIDS.latex}
    />
  );
}
