import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { gui } from "../../../lib/utils";
import { Ae2InscriberScreenDemo } from "./demo";
import { Ae2InscriberScreen } from "./index";

describe("ae2InscriberScreen", () => {
  it("渲染四个压印槽位、进度条与玩家背包", () => {
    const { container } = render(
      <Ae2InscriberScreen
        bottomPlate={{ icon: "nether-wart" }}
        input={{ icon: "gold-ingot" }}
        output={{ icon: "diamond" }}
        progress={0.6}
        topPlate={{ icon: "iron-ingot" }}
      />,
    );

    for (const label of ["inscriber-top", "inscriber-input", "inscriber-bottom", "inscriber-output"]) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }
    // 槽框由 AE2 贴图烘焙，热区与贴图实测坐标一致
    expect(screen.getByLabelText("inscriber-top")).toHaveStyle({
      left: gui(44),
      top: gui(15),
    });
    expect(screen.getByLabelText("inscriber-input")).toHaveStyle({
      left: gui(62),
      top: gui(38),
    });
    expect(screen.getByLabelText("inscriber-bottom")).toHaveStyle({
      left: gui(44),
      top: gui(61),
    });
    expect(screen.getByLabelText("inscriber-output")).toHaveStyle({
      height: gui(26),
      left: gui(108),
      top: gui(35),
      width: gui(26),
    });
    expect(screen.getByLabelText("inscriber-top")).not.toHaveClass("mc-tex-ae2-slot-large");
    expect(container.querySelectorAll("[data-mod-sprite]").length).toBeGreaterThan(1);

    expect(screen.getByLabelText("main-0").parentElement).toHaveStyle({ top: gui(93) });
    expect(screen.getByLabelText("hotbar-0").parentElement).toHaveStyle({ top: gui(151) });

    // 右侧升级槽条（AE2 1.12 GuiInscriber：xSize 211 + 35 宽升级条）
    expect(container.querySelectorAll("[aria-label^=\"inscriber-upgrade-\"]").length).toBe(3);
    expect(screen.getByLabelText("inscriber-upgrade-0")).toHaveStyle({
      left: gui(186),
      top: gui(7),
    });
    expect(screen.getByLabelText("inscriber-upgrade-2")).toHaveStyle({
      left: gui(186),
      top: gui(43),
    });

    const progress = screen.getByRole("progressbar", { name: "压印进度" });
    expect(progress).toHaveAttribute("aria-valuenow", "0.6");
    expect(progress).toHaveStyle({ left: gui(135), top: gui(39) });

    expect(container.querySelectorAll("[aria-label^=\"main-\"]").length).toBe(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]").length).toBe(9);
  });

  it("输出槽与升级槽回调", async () => {
    const user = userEvent.setup();
    const onTakeOutput = vi.fn();
    const onUpgradeSlotClick = vi.fn();
    render(
      <Ae2InscriberScreen
        onTakeOutput={onTakeOutput}
        onUpgradeSlotClick={onUpgradeSlotClick}
        output={{ icon: "diamond" }}
        upgrades={[{ icon: "iron-ingot" }]}
      />,
    );

    await user.click(screen.getByLabelText("inscriber-output"));
    expect(onTakeOutput).toHaveBeenCalledOnce();

    await user.click(screen.getByLabelText("inscriber-upgrade-0"));
    expect(onUpgradeSlotClick).toHaveBeenCalledWith(0, expect.objectContaining({ icon: "iron-ingot" }));
  });

  it("demo 渲染", () => {
    render(<Ae2InscriberScreenDemo />);
    expect(screen.getByText("压印器")).toBeInTheDocument();
  });
});
