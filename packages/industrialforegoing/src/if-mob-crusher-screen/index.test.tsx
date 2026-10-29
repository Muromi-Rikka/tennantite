import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { IfMobCrusherScreen } from "./index";

describe("ifMobCrusherScreen", () => {
  it("18 个输出槽与生产 / 消耗按钮", () => {
    const onModeChange = vi.fn();
    const { container } = render(<IfMobCrusherScreen mode="produce" onModeChange={onModeChange} />);
    expect(container.querySelectorAll("[aria-label^=\"output-\"]")).toHaveLength(18);
    expect(container.querySelector<HTMLElement>("[data-if-button=\"mob-crusher\"]")?.dataset.ifCrop).toBe("sideEnabled");
    fireEvent.click(screen.getByRole("button", { name: "mob-crusher" }));
    expect(onModeChange).toHaveBeenCalledWith("consume");
  });
});
