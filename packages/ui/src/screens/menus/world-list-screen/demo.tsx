import { WorldListScreen } from "./index";

export function WorldListScreenDemo() {
  return <WorldListScreen worlds={[{ name: "世界 1" }, { name: "世界 2", status: "warning" }]} />;
}
