import { LocatorBar } from "./index";

export function LocatorBarDemo() {
  return <LocatorBar arrow="up" dots={[{ color: "#ff5555", x: -0.4 }, { color: "#55ff55", kind: "1", x: 0.3 }]} />;
}
