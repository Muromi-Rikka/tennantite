import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { RecyclerScreenDemo } from "./demo";
import { RecyclerScreen } from "./index";

describe("recyclerScreen", () => {
  it("渲染 7 个机器槽位与玩家背包", () => {
    const { container } = render(
      <RecyclerScreen energy={{ max: 2000, value: 900 }} input={{}} output={{ count: 5 }} />,
    );
    expect(container.querySelectorAll("[aria-label^=\"machine-\"]")).toHaveLength(7);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]")).toHaveLength(9);
    expect(screen.getByRole("progressbar", { name: "EU 能量" })).toHaveAttribute(
      "aria-valuenow",
      "900",
    );
  });

  it("进度使用原版 arrow 贴图", () => {
    const { container } = render(<RecyclerScreen progress={0.35} />);
    expect(screen.getByRole("progressbar", { name: "处理进度" })).toHaveAttribute(
      "aria-valuenow",
      "0.35",
    );
    expect(container.querySelector("[data-ic2-progress]")).toHaveAttribute(
      "data-ic2-progress",
      "arrow",
    );
  });

  it("demo 渲染", () => {
    render(<RecyclerScreenDemo />);
    expect(screen.getByText("回收机")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
