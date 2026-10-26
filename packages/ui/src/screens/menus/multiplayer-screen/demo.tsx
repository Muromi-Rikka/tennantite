import { MultiplayerScreen } from "./index";

/** MultiplayerScreen 预览用例（规格 §6.3） */
export function MultiplayerScreenDemo() {
  return (
    <MultiplayerScreen
      servers={[
        { address: "mc.hypixel.net", meta: "在线 42000 人", name: "Hypixel" },
        { address: "play.cubecraft.net", meta: "在线 12000 人", name: "CubeCraft" },
        { address: "hivemc.eu", meta: "在线 8000 人", name: "The Hive" },
      ]}
      selectedAddress="mc.hypixel.net"
    />
  );
}
