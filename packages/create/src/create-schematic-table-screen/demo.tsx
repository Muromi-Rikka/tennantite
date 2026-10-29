import { CREATE_DEMO_PLAYER } from "../create-demo-data";
import { CreateSchematicTableScreen } from "./index";

/**
 * CreateSchematicTableScreen 预览用例：空蓝图 + 进度 0.25。
 */
export function CreateSchematicTableScreenDemo() {
  return (
    <CreateSchematicTableScreen
      input={{ count: 1, icon: "wheat", tooltip: "空蓝图" }}
      player={CREATE_DEMO_PLAYER}
      progress={0.25}
    />
  );
}
