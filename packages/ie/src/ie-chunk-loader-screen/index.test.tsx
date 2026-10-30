import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { IeChunkLoaderScreenDemo } from "../demos";
import { IeChunkLoaderScreen } from "./index";

describe("ieChunkLoaderScreen", () => {
  it("渲染纸张槽、背景贴图与玩家背包", () => {
    const { container } = render(<IeChunkLoaderScreen paper={{}} />);
    expect(container.querySelectorAll("[aria-label^=\"chunk-loader-paper\"]")).toHaveLength(1);
    expect(container.querySelector("[data-ie-sprite=\"chunk_loader\"]")).not.toBeNull();
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
  });

  it("槽位框坐标 = ChunkLoaderMenu slot - 1（纸张 124,94 → 123,93）", () => {
    render(<IeChunkLoaderScreen />);
    expect(screen.getByLabelText("chunk-loader-paper").style.left).toBe("calc(var(--mc-gui) * 123)");
    expect(screen.getByLabelText("chunk-loader-paper").style.top).toBe("calc(var(--mc-gui) * 93)");
  });

  it("刷新条与能量条渲染", () => {
    render(<IeChunkLoaderScreen energy={{ max: 32000, value: 22400 }} refresh={0.4} />);
    expect(screen.getByRole("progressbar", { name: "区块加载机刷新" })).toHaveAttribute("aria-valuenow", "0.4");
    expect(screen.getByRole("progressbar", { name: "区块加载机能量" })).toHaveAttribute("aria-valuenow", "70");
  });

  it("反应式列表条目渲染", () => {
    render(<IeChunkLoaderScreen entries={["矿井电梯（12, 64, -8）"]} />);
    expect(screen.getByRole("listitem")).toHaveTextContent("矿井电梯");
  });

  it("demo 渲染", () => {
    render(<IeChunkLoaderScreenDemo />);
    expect(screen.getByText("区块加载机")).toBeInTheDocument();
  });
});
