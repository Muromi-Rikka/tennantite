import { CreateTrainStationScreen } from "./index";

/**
 * CreateTrainStationScreen 预览用例：列车停靠态（车名 + 文字框 + 对话泡）。
 */
export function CreateTrainStationScreenDemo() {
  return (
    <CreateTrainStationScreen
      mode="idle"
      stationName="中央车站"
      train={{ name: "午夜特快" }}
    />
  );
}
