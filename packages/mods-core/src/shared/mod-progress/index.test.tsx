import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ModProgress } from "./index";

describe("modProgress", () => {
  it("默认 ratio 口径输出 0..1", () => {
    render(<ModProgress height={10} label="进度" left={0} progress={0.4} top={0} width={20} />);
    const bar = screen.getByRole("progressbar", { name: "进度" });
    expect(bar).toHaveAttribute("aria-valuenow", "0.4");
    expect(bar).toHaveAttribute("aria-valuemax", "1");
  });

  it("percent 口径输出 0..100", () => {
    render(
      <ModProgress ariaValue="percent" height={10} label="能量" left={0} max={200} top={0} value={80} width={20} />,
    );
    const bar = screen.getByRole("progressbar", { name: "能量" });
    expect(bar).toHaveAttribute("aria-valuenow", "40");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
  });

  it("raw 口径输出原始值", () => {
    render(
      <ModProgress ariaValue="raw" height={10} label="热量" left={0} max={1000} top={0} value={600} width={20} />,
    );
    const bar = screen.getByRole("progressbar", { name: "热量" });
    expect(bar).toHaveAttribute("aria-valuenow", "600");
    expect(bar).toHaveAttribute("aria-valuemax", "1000");
  });

  it("track 节点位于填充层之前", () => {
    const { container } = render(
      <ModProgress
        height={10}
        left={0}
        progress={0.5}
        top={0}
        track={<span data-testid="track" />}
        width={20}
      />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.children[0]!.querySelector("[data-testid='track']")).not.toBeNull();
    expect(root.children[1]!.getAttribute("aria-hidden")).toBe("true");
  });

  it("dataAttributes 展开到根节点", () => {
    const { container } = render(
      <ModProgress
        dataAttributes={{ "data-test-bar": "1" }}
        height={10}
        left={0}
        progress={0.5}
        top={0}
        width={20}
      />,
    );
    expect(container.firstElementChild).toHaveAttribute("data-test-bar", "1");
  });
});
