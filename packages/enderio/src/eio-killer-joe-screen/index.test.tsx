import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EioKillerJoeScreenDemo } from "../demos";
import { EioKillerJoeScreen } from "./index";

describe("eioKillerJoeScreen", () => {
  it("渲染 1 个槽位与 screen/killer_joe 背景", () => {
    const { container } = render(
      <EioKillerJoeScreen items={{ "killer-joe-food": {} }} />,
    );
    expect(container.querySelectorAll("[aria-label^=\"killer-joe-\"]")).toHaveLength(1);
    const background = container.querySelector("[data-eio-sprite=\"screen/killer_joe\"]") as HTMLElement;
    expect(background.style.height).toBe("calc(var(--mc-gui) * 166)");
  });

  it("demo 可渲染", () => {
    const { container } = render(<EioKillerJoeScreenDemo />);
    expect(container.querySelector("[data-eio-machine=\"killerJoe\"]")).not.toBeNull();
  });
});
