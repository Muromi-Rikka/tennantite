import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EioVatScreenDemo } from "../demos";
import { EioVatScreen } from "./index";

describe("eioVatScreen", () => {
  it("渲染 2 个试剂槽与 176×166 背景", () => {
    const { container } = render(<EioVatScreen items={{ "vat-reagent-0": {} }} />);
    expect(container.querySelectorAll("[aria-label^=\"vat-\"]")).toHaveLength(2);
    const background = container.querySelector("[data-eio-sprite=\"screen/vat\"]") as HTMLElement;
    expect(background.style.height).toBe("calc(var(--mc-gui) * 166)");
    expect(container.querySelector("[data-eio-sprite=\"sprites/vat_cover\"]")).not.toBeNull();
  });

  it("进度条与转移 / 倾倒按钮", async () => {
    const user = userEvent.setup();
    const onTransferOutputTank = vi.fn();
    const onDumpOutputTank = vi.fn();
    render(
      <EioVatScreen
        onDumpOutputTank={onDumpOutputTank}
        onTransferOutputTank={onTransferOutputTank}
        progress={0.45}
      />,
    );
    expect(screen.getByRole("progressbar", { name: "发酵桶进度" })).toHaveAttribute("aria-valuenow", "0.45");
    await user.click(screen.getByRole("button", { name: "转移输出流体" }));
    expect(onTransferOutputTank).toHaveBeenCalledOnce();
    await user.click(screen.getByRole("button", { name: "倾倒输出流体" }));
    expect(onDumpOutputTank).toHaveBeenCalledOnce();
  });

  it("demo 可渲染", () => {
    const { container } = render(<EioVatScreenDemo />);
    expect(container.querySelector("[data-eio-machine=\"vat\"]")).not.toBeNull();
  });
});
