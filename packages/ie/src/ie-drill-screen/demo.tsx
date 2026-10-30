import { IeDrillScreen } from "./index";

/**
 * IeDrillScreen 预览用例：装有钻头与三个钻头部件。
 */
export function IeDrillScreenDemo() {
  return (
    <IeDrillScreen
      cores={[{ icon: "iron-ingot", tooltip: "铁质钻头部件" }, { icon: "iron-ingot", tooltip: "钢质钻头部件" }, null]}
      head={{ icon: "iron-ingot", tooltip: "钻头" }}
      onSlotClick={() => {}}
    />
  );
}
