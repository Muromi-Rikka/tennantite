import { gui } from "@tennantite/ui";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Ae2CraftingCpuScreenDemo } from "./demo";
import { Ae2CraftingCpuScreen } from "./index";

describe("ae2CraftingCpuScreen", () => {
  it("渲染任务区块、进度条、取消按钮与滚动条", () => {
    render(
      <Ae2CraftingCpuScreen
        eta="3分12秒"
        jobs={[
          { detail: "已存储: 64", icon: { icon: "iron-ingot" }, id: "iron" },
          { detail: "合成中: 4", icon: { icon: "gold-ingot" }, id: "gold" },
        ]}
        progress={0.25}
      />,
    );

    expect(screen.getByText("合成状态 - 3分12秒")).toBeInTheDocument();
    expect(screen.getByLabelText("cpu-job-iron")).toHaveStyle({
      // 第 1 列区块图标：(57, 22)
      left: gui(57),
      top: gui(22),
    });
    expect(screen.getByLabelText("cpu-job-gold")).toHaveStyle({
      // 第 2 列区块图标：(57 + 68, 22)
      left: gui(125),
      top: gui(22),
    });
    expect(screen.getByText("已存储: 64")).toBeInTheDocument();

    const progress = screen.getByRole("progressbar", { name: "合成进度" });
    expect(progress).toHaveAttribute("aria-valuenow", "0.25");
    expect(progress).toHaveStyle({ left: gui(8), top: gui(165) });

    expect(screen.getByLabelText("取消合成")).toBeInTheDocument();
  });

  it("取消回调与禁用态", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    const first = render(<Ae2CraftingCpuScreen onCancel={onCancel} />);

    await user.click(screen.getByLabelText("取消合成"));
    expect(onCancel).toHaveBeenCalledOnce();
    first.unmount();

    render(<Ae2CraftingCpuScreen />);
    expect(screen.getByLabelText("取消合成")).toHaveAttribute("disabled");
  });

  it("demo 渲染", () => {
    render(<Ae2CraftingCpuScreenDemo />);
    expect(screen.getByText(/合成状态/)).toBeInTheDocument();
  });
});
