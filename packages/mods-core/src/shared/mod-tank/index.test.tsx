import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ModTank } from "./index";

describe("modTank", () => {
  it("按 value/max 输出百分比", () => {
    render(<ModTank height={36} label="液体" left={0} max={100} top={0} value={30} width={20} />);
    const tank = screen.getByRole("progressbar", { name: "液体" });
    expect(tank).toHaveAttribute("aria-valuenow", "30");
    expect(tank).toHaveAttribute("aria-valuemax", "100");
  });

  it("inset 作用于填充满溢层", () => {
    const { container } = render(
      <ModTank height={36} inset={1} left={0} max={100} top={0} value={30} width={20} />,
    );
    const clip = container.querySelector(".overflow-hidden") as HTMLElement;
    expect(clip.style.inset).toBe("calc(var(--mc-gui) * 1)");
  });

  it("overlay 位于 frame 之后", () => {
    const { container } = render(
      <ModTank
        frame={<span data-testid="frame" />}
        height={36}
        left={0}
        max={100}
        overlay={<span data-testid="overlay" />}
        top={0}
        value={30}
        width={20}
      />,
    );
    const root = container.firstElementChild as HTMLElement;
    const frame = root.querySelector("[data-testid='frame']")!;
    const overlay = root.querySelector("[data-testid='overlay']")!;
    expect(frame.compareDocumentPosition(overlay) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
