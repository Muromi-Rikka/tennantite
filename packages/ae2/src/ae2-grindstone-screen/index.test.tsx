import { gui } from "@tennantite/ui";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Ae2GrindstoneScreenDemo } from "./demo";
import { Ae2GrindstoneScreen } from "./index";

describe("ae2GrindstoneScreen", () => {
  it("渲染矿石槽、杵槽、产物槽与玩家背包", () => {
    const { container } = render(
      <Ae2GrindstoneScreen
        ores={[{ icon: "iron-ore" }, { icon: "iron-ore" }, { icon: "stone-block" }]}
        outputs={[{ icon: "iron-ingot" }]}
      />,
    );

    for (const label of ["grindstone-ore-0", "grindstone-ore-1", "grindstone-ore-2", "grindstone-pestle", "grindstone-output-0"]) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }
    // 槽框由 AE2 贴图烘焙，热区与 GuiGrinder 槽位坐标一致
    expect(screen.getByLabelText("grindstone-ore-0")).toHaveStyle({
      left: gui(12),
      top: gui(17),
    });
    expect(screen.getByLabelText("grindstone-ore-2")).toHaveStyle({
      left: gui(48),
      top: gui(17),
    });
    expect(screen.getByLabelText("grindstone-pestle")).toHaveStyle({
      left: gui(80),
      top: gui(40),
    });
    expect(screen.getByLabelText("grindstone-output-1")).toHaveStyle({
      left: gui(130),
      top: gui(63),
    });

    expect(screen.getByLabelText("main-0").parentElement).toHaveStyle({ top: gui(93) });
    expect(screen.getByLabelText("hotbar-0").parentElement).toHaveStyle({ top: gui(151) });
    expect(container.querySelectorAll("[aria-label^=\"main-\"]").length).toBe(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]").length).toBe(9);
  });

  it("矿石与产物槽回调", async () => {
    const user = userEvent.setup();
    const onOreSlotClick = vi.fn();
    const onTakeOutput = vi.fn();
    render(
      <Ae2GrindstoneScreen
        onOreSlotClick={onOreSlotClick}
        onTakeOutput={onTakeOutput}
        ores={[{ icon: "iron-ore" }]}
        outputs={[{ icon: "iron-ingot" }]}
      />,
    );

    await user.click(screen.getByLabelText("grindstone-ore-0"));
    expect(onOreSlotClick).toHaveBeenCalledWith(0, expect.objectContaining({ icon: "iron-ore" }));

    await user.click(screen.getByLabelText("grindstone-output-0"));
    expect(onTakeOutput).toHaveBeenCalledWith(0, expect.objectContaining({ icon: "iron-ingot" }));
  });

  it("demo 渲染", () => {
    render(<Ae2GrindstoneScreenDemo />);
    expect(screen.getByText("磨石")).toBeInTheDocument();
  });
});
