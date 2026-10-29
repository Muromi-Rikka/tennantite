import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { IfFermentationStationScreen } from "./index";

describe("ifFermentationStationScreen", () => {
  it("生产按钮回调下一档（0 → 1）", () => {
    const onControlClick = vi.fn();
    render(<IfFermentationStationScreen onControlClick={onControlClick} />);
    fireEvent.click(screen.getByRole("button", { name: "ferm-production" }));
    expect(onControlClick).toHaveBeenCalledWith("ferm-production", 1);
  });

  it("封印状态图随 seal 变化", () => {
    const { container, rerender } = render(<IfFermentationStationScreen seal={0} />);
    const sealButton = container.querySelector<HTMLElement>("[data-if-button=\"ferm-seal\"]");
    expect(sealButton?.dataset.ifCrop).toBe("fermTankFull");
    rerender(<IfFermentationStationScreen seal={1} />);
    expect(container.querySelector<HTMLElement>("[data-if-button=\"ferm-seal\"]")?.dataset.ifCrop).toBe("fermTankHalf");
  });
});
