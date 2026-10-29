import { IfFermentationStationScreen } from "./index";

export function IfFermentationStationScreenDemo() {
  return (
    <IfFermentationStationScreen
      catalyst={{ max: 1000, tint: "#41CD34", value: 640 }}
      energy={{ max: 1000, value: 480 }}
      input={{ max: 1000, tint: "#51301A", value: 720 }}
      output={{ max: 1000, tint: "#EB8844", value: 310 }}
      production={2}
      progress={0.6}
      seal={1}
    />
  );
}
