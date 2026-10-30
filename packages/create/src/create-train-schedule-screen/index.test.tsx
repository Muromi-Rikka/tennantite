import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { CreateScheduleEntry } from "./index";
import { CREATE_TRAIN_SCHEDULE } from "../create-metrics";
import { CreateTrainScheduleScreen } from "./index";

const ENTRIES: CreateScheduleEntry[] = [
  {
    conditions: [[{ label: "Idle 5 分", width: 90 }]],
    icon: { count: 1, icon: "wheat" },
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
];

describe("createTrainScheduleScreen", () => {
  it("渲染标题、卡片与四枚底部按钮", () => {
    render(<CreateTrainScheduleScreen entries={ENTRIES} title="列车时刻表" />);
    expect(screen.getByText("列车时刻表")).toBeInTheDocument();
    expect(screen.getByLabelText("编辑指令-quarry")).toBeInTheDocument();
    expect(screen.getByLabelText("编辑指令-station-a")).toBeInTheDocument();
    expect(screen.getByLabelText("确认")).toBeInTheDocument();
    expect(screen.getByLabelText("循环")).toBeInTheDocument();
    expect(screen.getByLabelText("进度重置")).toBeInTheDocument();
    expect(screen.getByLabelText("跳过当前")).toBeInTheDocument();
  });

  it("条件列渲染条件胶囊与列间追加/新建钮", () => {
    render(<CreateTrainScheduleScreen entries={ENTRIES} />);
    expect(screen.getByText("Idle 5 分")).toBeInTheDocument();
    expect(screen.getByLabelText("移除条目-quarry")).toBeInTheDocument();
    expect(screen.getByLabelText("复制条目-quarry")).toBeInTheDocument();
    expect(screen.getByLabelText("上移条目-station-a")).toBeInTheDocument();
    expect(screen.queryByLabelText("上移条目-quarry")).toBeNull();
  });

  it("循环按钮按下态与回调", () => {
    const onCyclicChange = vi.fn();
    render(<CreateTrainScheduleScreen cyclic entries={ENTRIES} onCyclicChange={onCyclicChange} />);
    expect(screen.getByLabelText("循环")).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByLabelText("循环"));
    expect(onCyclicChange).toHaveBeenCalledTimes(1);
  });

  it("编辑浮层渲染编辑板、选择条与玩家背包", () => {
    const onEditorConfirm = vi.fn();
    render(
      <CreateTrainScheduleScreen
        editor={{ allowDelete: true, kind: "condition", onConfirm: onEditorConfirm, typeLabel: "等待条件" }}
        entries={ENTRIES}
      />,
    );
    expect(screen.getByText("编辑条件")).toBeInTheDocument();
    expect(screen.getByText("等待条件")).toBeInTheDocument();
    expect(screen.getByLabelText("删除")).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("确认编辑"));
    expect(onEditorConfirm).toHaveBeenCalledTimes(1);
  });

  it("确认按钮按常量定位", () => {
    render(<CreateTrainScheduleScreen entries={ENTRIES} />);
    expect(screen.getByLabelText("确认").style.left).toBe(
      `calc(var(--mc-gui) * ${CREATE_TRAIN_SCHEDULE.buttons.confirm.left})`,
    );
  });
});
