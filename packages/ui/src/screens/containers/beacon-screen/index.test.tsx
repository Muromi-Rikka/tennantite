import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { BeaconScreenDemo } from "./demo";
import { BeaconScreen } from "./index";

const primaryOptions = [
  { icon: "effect-speed" as const, id: "speed", label: "速度" },
];
const secondaryOptions = [
  { icon: "effect-regeneration" as const, id: "regeneration", label: "生命恢复" },
];

describe("beaconScreen", () => {
  it("渲染双栏标题、5 个主效果位、辅助效果位、支付槽与玩家背包", () => {
    const { container } = render(
      <BeaconScreen
        payment={{ count: 9 }}
        primaryOptions={primaryOptions}
        secondaryOptions={secondaryOptions}
      />,
    );
    expect(screen.getByText("主效果")).toBeInTheDocument();
    expect(screen.getByText("辅助效果")).toBeInTheDocument();
    expect(screen.getByLabelText("信标支付槽")).toBeInTheDocument();
    expect(container.querySelectorAll("[aria-label^=\"主效果 \"]").length).toBe(4);
    expect(screen.getByLabelText("速度")).toBeInTheDocument();
    expect(screen.getByLabelText("生命恢复")).toBeInTheDocument();
    expect(container.querySelectorAll("[aria-label^=\"main-\"]").length).toBe(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]").length).toBe(9);
  });

  it("未投料时效果与完成按钮禁用", () => {
    render(
      <BeaconScreen
        primaryOptions={primaryOptions}
        secondaryOptions={secondaryOptions}
      />,
    );
    expect(screen.getByLabelText("速度")).toBeDisabled();
    expect(screen.getByLabelText("生命恢复")).toBeDisabled();
    expect(screen.getByLabelText("完成")).toBeDisabled();
    expect(screen.getByLabelText("取消")).toBeEnabled();
  });

  it("确认回调携带当前选择", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(
      <BeaconScreen
        onConfirm={onConfirm}
        payment={{ count: 1 }}
        primaryOptions={primaryOptions}
        secondaryOptions={secondaryOptions}
      />,
    );
    expect(screen.getByLabelText("完成")).toBeDisabled();
    await user.click(screen.getByLabelText("速度"));
    expect(screen.getByLabelText("速度")).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByLabelText("完成")).toBeEnabled();
    await user.click(screen.getByLabelText("完成"));
    expect(onConfirm).toHaveBeenCalledWith(
      expect.objectContaining({ payment: true, primary: "speed", secondary: null }),
    );
  });

  it("demo 渲染", () => {
    render(<BeaconScreenDemo />);
    expect(screen.getByLabelText("力量")).toBeInTheDocument();
    expect(screen.getByLabelText("生命恢复")).toBeInTheDocument();
  });
});
