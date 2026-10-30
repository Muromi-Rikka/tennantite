import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { IeCrateScreenDemo } from "../demos";
import { IeCrateScreen } from "./index";

describe("ieCrateScreen", () => {
  it("渲染 27 个存储槽、背景贴图与玩家背包", () => {
    const { container } = render(<IeCrateScreen />);
    expect(container.querySelectorAll("[aria-label^=\"crate-slot-\"]")).toHaveLength(27);
    expect(container.querySelector("[data-ie-sprite=\"crate\"]")).not.toBeNull();
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
  });

  it("槽位框坐标 = CrateMenu slot - 1（首槽 8,18 → 7,17，每行 9）", () => {
    render(<IeCrateScreen />);
    expect(screen.getByLabelText("crate-slot-0").style.left).toBe("calc(var(--mc-gui) * 7)");
    expect(screen.getByLabelText("crate-slot-0").style.top).toBe("calc(var(--mc-gui) * 17)");
    expect(screen.getByLabelText("crate-slot-9").style.top).toBe("calc(var(--mc-gui) * 35)");
  });

  it("名称框渲染与回调", async () => {
    const user = userEvent.setup();
    const onNameChange = vi.fn();
    render(<IeCrateScreen name="矿场补给箱" onNameChange={onNameChange} />);
    const nameField = screen.getByLabelText("木箱名称");
    expect(nameField).toHaveValue("矿场补给箱");
    await user.type(nameField, "!");
    expect(onNameChange).toHaveBeenCalled();
  });

  it("demo 渲染", () => {
    render(<IeCrateScreenDemo />);
    expect(screen.getByLabelText("木箱名称")).toHaveValue("矿场补给箱");
  });
});
