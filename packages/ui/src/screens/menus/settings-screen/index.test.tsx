import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { SettingsScreenDemo } from "./demo";
import { SettingsScreen } from "./index";

describe("SettingsScreen", () => {
  it("视频分页渲染滑条与复选框", () => {
    render(<SettingsScreen defaults={{ fov: 90 }} />);
    expect(screen.getByText("视野：90")).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "显示云" })).toBeChecked();
  });

  it("切换到游戏分页渲染难度单选", async () => {
    const user = userEvent.setup();
    render(<SettingsScreen />);
    await user.click(screen.getByRole("tab", { name: "游戏" }));
    expect(screen.getByRole("radio", { name: "普通" })).toBeChecked();
  });

  it("demo 渲染", () => {
    render(<SettingsScreenDemo />);
    expect(screen.getByText("亮度：80%")).toBeInTheDocument();
  });
});
