import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { IfSlot } from "./index";

describe("ifSlot", () => {
  it("普通槽把槽框画在物品左上 -1,-1，并叠双色遮罩", () => {
    const { container } = render(<IfSlot color="orange" label="slot-0" left={20} top={30} />);
    const frame = container.querySelector("[data-if-sprite=\"titanium_background\"]");
    expect(frame?.getAttribute("style")).toContain("calc(var(--mc-gui) * 19)");
    expect(frame?.getAttribute("style")).toContain("calc(var(--mc-gui) * 29)");
    expect(screen.getByLabelText("slot-0")).toBeInTheDocument();
  });

  it("过滤槽使用 18×18 槽框与 firework 色 50% 覆盖", () => {
    const { container } = render(
      <IfSlot color="lime" frame="filter" item={{ icon: "wheat" }} label="filter-0" left={45} top={21} />,
    );
    const frame = container.querySelector("[data-if-sprite=\"titanium_background\"]");
    expect(frame?.getAttribute("style")).toContain("calc(var(--mc-gui) * 45)");
    const overlays = [...container.querySelectorAll("div")].filter(
      element => element.style.backgroundColor === "rgb(128, 199, 31)",
    );
    expect(overlays.length).toBeGreaterThanOrEqual(2);
    expect(screen.getByLabelText("filter-0")).toBeInTheDocument();
  });
});
