import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { IronFurnaceScreenDemo } from "./demo";
import { IronFurnaceScreen } from "./index";

describe("ironFurnaceScreen", () => {
  it("省略放电槽与 EU 表，燃料槽替代放电槽位", () => {
    const { container } = render(
      <IronFurnaceScreen fuel={{ icon: "charcoal" }} input={{}} output={{ count: 1 }} />,
    );
    expect(container.querySelectorAll("[aria-label^=\"machine-\"]")).toHaveLength(7);
    expect(screen.queryByLabelText("machine-discharge")).not.toBeInTheDocument();
    expect(screen.getByLabelText("machine-fuel")).toBeInTheDocument();
    expect(screen.queryByRole("progressbar", { name: "EU 能量" })).not.toBeInTheDocument();
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
  });

  it("进度使用 arrow 贴图", () => {
    const { container } = render(<IronFurnaceScreen progress={0.7} />);
    expect(container.querySelector("[data-ic2-progress]")).toHaveAttribute(
      "data-ic2-progress",
      "arrow",
    );
  });

  it("demo 渲染", () => {
    render(<IronFurnaceScreenDemo />);
    expect(screen.getByText("铁炉")).toBeInTheDocument();
  });
});
