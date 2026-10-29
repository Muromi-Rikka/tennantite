import { IF_DEMO_ITEMS } from "../if-demo-data";
import { IfMycelialGeneratorScreen } from "./index";

export function IfMycelialGeneratorScreenDemo() {
  return (
    <IfMycelialGeneratorScreen
      burn={0.4}
      display={IF_DEMO_ITEMS.wheat}
      energy={{ max: 1000, value: 300 }}
      inputs={[{ max: 1000, tint: "#F0F0F0", value: 500 }, IF_DEMO_ITEMS.wheat]}
      variant="slimey"
    />
  );
}
