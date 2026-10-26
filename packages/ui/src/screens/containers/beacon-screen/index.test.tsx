import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { BeaconScreenDemo } from "./demo";
import { BeaconScreen } from "./index";

describe("beaconScreen", () => {
  it("渲染支付槽与两个效果选择器", () => {
    render(
      <BeaconScreen
        payment={{ count: 9 }}
        primaryOptions={[{ id: "speed", label: "速度" }]}
        secondaryOptions={[{ id: "strength", label: "力量" }]}
      />,
    );
    expect(screen.getByLabelText("信标支付槽")).toBeInTheDocument();
    expect(screen.getByLabelText("主效果")).toBeInTheDocument();
    expect(screen.getByLabelText("副效果")).toBeInTheDocument();
  });

  it("确认回调携带当前选择", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(
      <BeaconScreen
        onConfirm={onConfirm}
        payment={{ count: 1 }}
        primaryOptions={[{ id: "speed", label: "速度" }]}
        secondaryOptions={[{ id: "strength", label: "力量" }]}
      />,
    );
    await user.click(screen.getByLabelText("主效果"));
    await user.click(await screen.findByText("速度"));
    await user.click(screen.getByRole("button", { name: "完成" }));
    expect(onConfirm).toHaveBeenCalledWith(
      expect.objectContaining({ primary: "speed", secondary: null }),
    );
  });

  it("demo 渲染", () => {
    render(<BeaconScreenDemo />);
    expect(screen.getByText("信标")).toBeInTheDocument();
  });
});
