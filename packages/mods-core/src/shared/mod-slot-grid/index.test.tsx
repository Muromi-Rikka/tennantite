import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ModSlotGrid } from "./index";

describe("modSlotGrid", () => {
  it("label 回调逐格生成名称", () => {
    render(
      <ModSlotGrid
        columns={2}
        label={index => `custom-${index}`}
        left={0}
        rows={2}
        top={0}
      />,
    );
    expect(screen.getByLabelText("custom-0")).toBeInTheDocument();
    expect(screen.getByLabelText("custom-3")).toBeInTheDocument();
  });

  it("labelPrefix 模式保持旧命名", () => {
    render(<ModSlotGrid columns={1} labelPrefix="slot" left={0} rows={1} top={0} />);
    expect(screen.getByLabelText("slot-0")).toBeInTheDocument();
  });
});
