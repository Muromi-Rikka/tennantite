import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EioSliceAndSpliceScreenDemo } from "../demos";
import { EioSliceAndSpliceScreen } from "./index";

describe("eioSliceAndSpliceScreen", () => {
  it("渲染 10 个槽位与 screen/slice_and_splice 背景", () => {
    const { container } = render(
      <EioSliceAndSpliceScreen items={{ "slice-and-splice-input-0": {} }} />,
    );
    expect(container.querySelectorAll("[aria-label^=\"slice-and-splice-\"]")).toHaveLength(10);
    const background = container.querySelector("[data-eio-sprite=\"screen/slice_and_splice\"]") as HTMLElement;
    expect(background.style.height).toBe("calc(var(--mc-gui) * 208)");
  });

  it("进度条与能量", () => {
    const { container } = render(<EioSliceAndSpliceScreen energy={{ max: 100000, value: 48000 }} progress={0.45} />);
    expect(screen.getByRole("progressbar", { name: "切片拼接机进度" })).toHaveAttribute("aria-valuenow", "0.45");
    expect(screen.getByRole("progressbar", { name: "能量" })).toHaveAttribute("aria-valuenow", "48");
    expect(container.querySelector("[data-eio-energy-bar]")).not.toBeNull();
  });

  it("控件按钮", async () => {
    const user = userEvent.setup();
    const onRedstoneChange = vi.fn();
    const onIoConfig = vi.fn();
    render(<EioSliceAndSpliceScreen onIoConfig={onIoConfig} onRedstoneChange={onRedstoneChange} />);
    await user.click(screen.getByRole("button", { name: "红石控制" }));
    expect(onRedstoneChange).toHaveBeenCalledOnce();
  });

  it("demo 可渲染", () => {
    const { container } = render(<EioSliceAndSpliceScreenDemo />);
    expect(container.querySelector("[data-eio-machine=\"sliceAndSplice\"]")).not.toBeNull();
  });
});
