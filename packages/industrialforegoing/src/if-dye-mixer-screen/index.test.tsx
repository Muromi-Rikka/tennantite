import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { IfDyeMixerScreen } from "./index";

describe("ifDyeMixerScreen", () => {
  it("三色输入 / 进度与染料色块", () => {
    const { container } = render(
      <IfDyeMixerScreen blue={{ level: 0.2 }} dyeIndex={14} green={{ level: 0.4 }} red={{ level: 0.6 }} />,
    );
    expect(container.querySelector("[data-if-dye=\"red\"]")?.getAttribute("style")).toContain("rgb(176, 46, 38)");
    expect(container.querySelector("[aria-label=\"red\"]")?.getAttribute("aria-valuenow")).toBe("60");
    expect(container.querySelector("[aria-label=\"green\"]")?.getAttribute("aria-valuenow")).toBe("40");
    expect(container.querySelector("[aria-label=\"blue\"]")?.getAttribute("aria-valuenow")).toBe("20");
  });

  it("前后按钮回调", () => {
    const onNextDye = vi.fn();
    const onPreviousDye = vi.fn();
    render(<IfDyeMixerScreen onNextDye={onNextDye} onPreviousDye={onPreviousDye} />);
    fireEvent.click(screen.getByRole("button", { name: "dye-next" }));
    fireEvent.click(screen.getByRole("button", { name: "dye-prev" }));
    expect(onNextDye).toHaveBeenCalledTimes(1);
    expect(onPreviousDye).toHaveBeenCalledTimes(1);
  });
});
