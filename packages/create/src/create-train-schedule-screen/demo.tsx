import { CreateTrainScheduleScreen } from "./index";

/**
 * CreateTrainScheduleScreen 预览用例：三条卡片（目的地 / 带条件的分段等待）+
 * 循环开启、进度指向第二条。
 */
export function CreateTrainScheduleScreenDemo() {
  return (
    <CreateTrainScheduleScreen
      cyclic
      entries={[
        {
          conditions: [
            [{ label: "Idle 5 分", width: 90 }],
            [{ label: "车厢满载", width: 100 }],
          ],
          icon: { count: 1, icon: "wheat", tooltip: "运送货物" },
          id: "quarry",
          label: "采石场",
          supportsConditions: true,
          width: 100,
        },
        {
          id: "station-a",
          label: "中央车站",
          width: 110,
        },
        {
          conditions: [
            [{ label: "储物已满", width: 100 }, { label: "开启红石", width: 100 }],
            [{ label: "Idle 30 秒", width: 90 }],
          ],
          icon: { count: 1, icon: "iron-ingot", tooltip: "回收铁锭" },
          id: "smelter",
          label: "冶炼厂",
          supportsConditions: true,
          width: 100,
        },
      ]}
      savedProgress={1}
    />
  );
}
