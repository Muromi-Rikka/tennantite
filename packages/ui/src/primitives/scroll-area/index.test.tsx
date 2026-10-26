import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ScrollAreaDemo } from "./demo";
import { ScrollArea } from "./index";

describe("scrollArea", () => {
  it("应用像素滚动条类", () => {
    render(
      <ScrollArea className="h-120" data-testid="area">
        <div>内容</div>
      </ScrollArea>,
    );
    expect(screen.getByTestId("area")).toHaveClass("mc-scroll");
  });

  it("渲染列表内容", () => {
    render(<ScrollAreaDemo />);
    expect(screen.getByText(/Hypixel/)).toBeInTheDocument();
    expect(screen.getByText(/CubeCraft/)).toBeInTheDocument();
  });
});
