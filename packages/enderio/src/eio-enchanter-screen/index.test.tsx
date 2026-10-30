import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EioEnchanterScreenDemo } from "../demos";
import { EioEnchanterScreen } from "./index";

describe("eioEnchanterScreen", () => {
  it("渲染 4 个槽位与 176×166 背景", () => {
    const { container } = render(<EioEnchanterScreen items={{ "enchanter-book": {} }} />);
    expect(container.querySelectorAll("[aria-label^=\"enchanter-\"]")).toHaveLength(4);
    const background = container.querySelector("[data-eio-sprite=\"screen/enchanter\"]") as HTMLElement;
    expect(background.style.height).toBe("calc(var(--mc-gui) * 166)");
  });

  it("费用文本", () => {
    render(<EioEnchanterScreen cost={12} />);
    expect(screen.getByText("附魔费用：12")).toBeInTheDocument();
  });

  it("demo 可渲染", () => {
    const { container } = render(<EioEnchanterScreenDemo />);
    expect(container.querySelector("[data-eio-machine=\"enchanter\"]")).not.toBeNull();
  });
});
