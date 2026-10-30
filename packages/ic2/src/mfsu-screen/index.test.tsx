import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MfsuScreenDemo } from "./demo";
import { MfsuScreen } from "./index";

describe("mfsuScreen", () => {
  it("储电箱同版式，默认输出 512 EU/t", () => {
    render(<MfsuScreen energy={{ max: 40000000, value: 26000000 }} title="MFSU" />);
    expect(screen.getByText("输出: 512 EU/t")).toBeInTheDocument();
    expect(screen.getByText("/40000000")).toBeInTheDocument();
  });

  it("demo 渲染", () => {
    render(<MfsuScreenDemo />);
    expect(screen.getByText("MFSU 超高压储电箱")).toBeInTheDocument();
  });
});
