import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CREATE_SCHEMATICANNON } from "../create-metrics";
import { CreateSchematicannonScreen } from "./index";

describe("createSchematicannonScreen", () => {
  it("渲染五槽位与进度/燃料条", () => {
    render(
      <CreateSchematicannonScreen
        fuel={0.5}
        progress={0.25}
        slots={{
          blueprintOutput: { count: 1, icon: "wheat" },
          gunpowder: { count: 8, icon: "gunpowder" },
          listOutput: { count: 1, icon: "wheat" },
          listPrinter: { count: 1, icon: "wheat" },
          schematic: { count: 1, icon: "wheat" },
        }}
      />,
    );
    expect(screen.getByLabelText("schematic")).toBeInTheDocument();
    expect(screen.getByLabelText("blueprint-output")).toBeInTheDocument();
    expect(screen.getByLabelText("list-printer")).toBeInTheDocument();
    expect(screen.getByLabelText("list-output")).toBeInTheDocument();
    expect(screen.getByLabelText("gunpowder")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "progress" })).toHaveAttribute("aria-valuenow", "0.25");
    expect(screen.getByRole("progressbar", { name: "fuel" })).toHaveAttribute("aria-valuenow", "0.5");
  });

  it("运行状态驱动按钮可用性", () => {
    render(<CreateSchematicannonScreen state="running" />);
    expect(screen.getByLabelText("播放")).toBeDisabled();
    expect(screen.getByLabelText("暂停")).toBeEnabled();
    expect(screen.getByLabelText("停止")).toBeEnabled();
  });

  it("停止状态驱动按钮可用性", () => {
    render(<CreateSchematicannonScreen state="stopped" />);
    expect(screen.getByLabelText("播放")).toBeEnabled();
    expect(screen.getByLabelText("暂停")).toBeDisabled();
  });

  it("放置设置行按常量定位且回调替换等级", () => {
    const onReplaceModeChange = vi.fn();
    render(
      <CreateSchematicannonScreen
        onReplaceModeChange={onReplaceModeChange}
        replaceMode={1}
        showSettings
      />,
    );
    const solid = screen.getByLabelText("替换为实体");
    expect(solid.style.left).toBe(
      `calc(var(--mc-gui) * ${CREATE_SCHEMATICANNON.buttons.settingsReplace.left + CREATE_SCHEMATICANNON.buttons.settingsReplace.step})`,
    );
    expect(solid).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(solid);
    expect(onReplaceModeChange).toHaveBeenCalledWith(1);
    expect(screen.getByLabelText("跳过缺失材料")).toBeInTheDocument();
    expect(screen.getByLabelText("跳过方块实体")).toBeInTheDocument();
  });

  it("确认/暂停/设置回调", () => {
    const onConfirm = vi.fn();
    const onPause = vi.fn();
    const onToggleSettings = vi.fn();
    render(
      <CreateSchematicannonScreen
        onConfirm={onConfirm}
        onPause={onPause}
        onToggleSettings={onToggleSettings}
        state="running"
      />,
    );
    fireEvent.click(screen.getByLabelText("确认"));
    fireEvent.click(screen.getByLabelText("暂停"));
    fireEvent.click(screen.getByLabelText("放置设置"));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onPause).toHaveBeenCalledTimes(1);
    expect(onToggleSettings).toHaveBeenCalledTimes(1);
  });
});
