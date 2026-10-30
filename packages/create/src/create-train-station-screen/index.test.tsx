import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CREATE_TRAIN_STATION } from "../create-metrics";
import { CreateTrainStationScreen } from "./index";

describe("createTrainStationScreen", () => {
  it("空闲模式渲染站名与新建列车按钮", () => {
    render(<CreateTrainStationScreen idleText="空闲" mode="idle" stationName="中央车站" />);
    expect(screen.getByText("中央车站")).toBeInTheDocument();
    expect(screen.getByText("空闲")).toBeInTheDocument();
    expect(screen.getByLabelText("新建列车")).toBeInTheDocument();
    expect(screen.queryByLabelText("拆解列车")).toBeNull();
  });

  it("列车停靠态渲染车名与拆解/丢下时刻表按钮", () => {
    render(
      <CreateTrainStationScreen mode="idle" stationName="中央车站" train={{ name: "午夜特快" }} />,
    );
    expect(screen.getByText("午夜特快")).toBeInTheDocument();
    expect(screen.getByLabelText("拆解列车")).toBeInTheDocument();
    expect(screen.getByLabelText("丢下时刻表")).toBeInTheDocument();
    expect(screen.queryByLabelText("新建列车")).toBeNull();
  });

  it("空闲模式按钮回调", () => {
    const onNewTrain = vi.fn();
    const onConfirm = vi.fn();
    render(<CreateTrainStationScreen mode="idle" onConfirm={onConfirm} onNewTrain={onNewTrain} />);
    fireEvent.click(screen.getByLabelText("新建列车"));
    fireEvent.click(screen.getByLabelText("确认"));
    expect(onNewTrain).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("组装模式渲染图标选择条与组装/退出/关闭按钮", () => {
    const onAssembleToggle = vi.fn();
    const onQuitAssembly = vi.fn();
    render(
      <CreateTrainStationScreen
        howTo={["放置 Bogey 于铁轨上"]}
        iconTypeLabel="列车图标：默认"
        mode="assembling"
        onAssembleToggle={onAssembleToggle}
        onQuitAssembly={onQuitAssembly}
        stationName="中央车站"
        statusText="Bogey 数量：2"
      />,
    );
    expect(screen.getByText("列车图标：默认")).toBeInTheDocument();
    expect(screen.getByText("Bogey 数量：2")).toBeInTheDocument();
    const toggle = screen.getByLabelText("开始组装");
    expect(toggle.style.left).toBe(`calc(var(--mc-gui) * ${CREATE_TRAIN_STATION.assembling.buttons.toggle.left})`);
    fireEvent.click(toggle);
    fireEvent.click(screen.getByLabelText("退出组装"));
    expect(onAssembleToggle).toHaveBeenCalledTimes(1);
    expect(onQuitAssembly).toHaveBeenCalledTimes(1);
  });
});
