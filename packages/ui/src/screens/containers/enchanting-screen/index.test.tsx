import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EnchantingScreenDemo } from "./demo";
import { EnchantingScreen } from "./index";

describe("enchantingScreen", () => {
  it("渲染物品槽、青金石槽与三档附魔选项", () => {
    const { container } = render(
      <EnchantingScreen
        availableLevel={30}
        lapis={{ count: 16 }}
        options={[
          { lapisCost: 1, level: 1, xpCost: 2 },
          { lapisCost: 2, level: 2, xpCost: 11 },
          { lapisCost: 3, level: 3, xpCost: 30 },
        ]}
      />,
    );
    expect(container.querySelectorAll("[aria-label^=\"enchant-\"]").length).toBe(2);
    expect(container.querySelectorAll("[aria-label^=\"附魔选项\"]").length).toBe(3);
    expect(screen.getByLabelText("附魔选项 I（消耗 2 级与 1 青金石）")).toBeEnabled();
    expect(screen.getByLabelText("附魔选项 III（消耗 30 级与 3 青金石）")).toBeEnabled();
  });

  it("资源不足时禁用选项", () => {
    render(
      <EnchantingScreen
        availableLevel={1}
        lapis={{ count: 1 }}
        options={[{ lapisCost: 3, level: 3, xpCost: 30 }]}
      />,
    );
    expect(screen.getByLabelText("附魔选项 III（消耗 30 级与 3 青金石）")).toBeDisabled();
  });

  it("选择回调", async () => {
    const user = userEvent.setup();
    const onEnchantSelect = vi.fn();
    render(
      <EnchantingScreen
        availableLevel={30}
        lapis={{ count: 16 }}
        onEnchantSelect={onEnchantSelect}
        options={[{ lapisCost: 2, level: 2, xpCost: 11 }]}
      />,
    );
    await user.click(screen.getByLabelText("附魔选项 II（消耗 11 级与 2 青金石）"));
    expect(onEnchantSelect).toHaveBeenCalledWith(
      expect.objectContaining({ level: 2 }),
    );
  });

  it("demo 渲染", () => {
    render(<EnchantingScreenDemo />);
    expect(screen.getByText("附魔")).toBeInTheDocument();
  });
});
