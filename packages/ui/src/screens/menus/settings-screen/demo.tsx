import { SettingsScreen } from "./index";

/**
 * SettingsScreen 预览用例（规格 §6.3）
*/
export function SettingsScreenDemo() {
  return (
    <SettingsScreen defaults={{ brightness: 80, fov: 90, showClouds: false }} />
  );
}
