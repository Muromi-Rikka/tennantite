import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { IfIconButton } from "./index";

describe("ifIconButton", () => {
  it("按 state 切换图集裁剪并在悬停时加白色内描边", () => {
    const { container, getByRole } = render(
      <IfIconButton height={14} label="area" left={136} states={["showArea", "hideArea"]} top={84} width={14} />,
    );
    const button = getByRole("button", { name: "area" });
    expect(button.dataset.ifCrop).toBe("showArea");
    expect(button.getAttribute("style")).toContain("calc(var(--mc-gui) * 136)");
    fireEvent.mouseEnter(button);
    expect(button.className).toContain("hover:shadow-[inset_0_0_0_1px_#fff]");
    expect(container.querySelector("[data-if-sprite=\"machines\"]")).not.toBeNull();
  });

  it("点击与禁用", () => {
    const onClick = vi.fn();
    const { getByRole, rerender } = render(
      <IfIconButton height={14} label="lock" left={100} onClick={onClick} states={["lockUnlocked"]} top={64} width={14} />,
    );
    fireEvent.click(getByRole("button", { name: "lock" }));
    expect(onClick).toHaveBeenCalledTimes(1);
    rerender(
      <IfIconButton disabled height={14} label="lock" left={100} onClick={onClick} states={["lockUnlocked"]} top={64} width={14} />,
    );
    expect((getByRole("button", { name: "lock" }) as HTMLButtonElement).disabled).toBe(true);
  });
});
