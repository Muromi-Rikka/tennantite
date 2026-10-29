import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EioGrindingBall } from "./index";

describe("eioGrindingBall", () => {
  it("按耐久自下而上裁剪 4×16", () => {
    const { container } = render(<EioGrindingBall durability={0.7} left={2} top={3} />);
    const bar = screen.getByRole("progressbar", { name: "研磨球耐久" });
    expect(bar).toHaveAttribute("aria-valuenow", "0.7");
    expect(bar.style.left).toBe("calc(var(--mc-gui) * 2)");
    expect(bar.style.top).toBe("calc(var(--mc-gui) * 3)");
    expect(container.querySelector("[data-eio-sprite=\"sprites/screen/sag_mill/grinding_ball_durability\"]")).not.toBeNull();
  });
});
