import { CREATE_DEMO_PLAYER } from "../create-demo-data";
import { CreatePackageFilterScreen } from "./index";

/**
 * CreatePackageFilterScreen 预览用例：预填包裹地址。
 */
export function CreatePackageFilterScreenDemo() {
  return (
    <CreatePackageFilterScreen
      address="仓库 3 号"
      player={CREATE_DEMO_PLAYER}
    />
  );
}
