import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CesuScreenDemo } from "./demo";
import { CesuScreen } from "./index";

describe("cesuScreen", () => {
  it("储电箱同版式，默认输出 32 EU/t", () => {
    render(<CesuScreen energy={{ max: 300000, value: 210000 }} title="CESU" />);
    expect(screen.getByText("输出: 32 EU/t")).toBeInTheDocument();
    expect(screen.getByText("/300000")).toBeInTheDocument();
    expect(screen.getByLabelText("batbox-charge")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "EU 存储" })).toHaveAttribute(
      "aria-valuenow",
      "210000",
    );
  });

  it("demo 渲染", () => {
    render(<CesuScreenDemo />);
    expect(screen.getByText("CESU 储电箱")).toBeInTheDocument();
  });
});
