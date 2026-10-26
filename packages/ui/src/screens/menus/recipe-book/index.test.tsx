import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { RecipeBookDemo } from "./demo";
import { RecipeBook } from "./index";

describe("recipeBook", () => {
  it("渲染分类与配方格", () => {
    render(<RecipeBookDemo />);
    expect(screen.getByRole("tab", { name: "建筑方块" })).toBeInTheDocument();
    expect(document.querySelectorAll(".mc-tex-slot").length).toBe(4);
  });

  it("未解锁配方显示占位", () => {
    render(
      <RecipeBook
        categories={[{ name: "全部", recipes: [{ unlocked: false }] }]}
      />,
    );
    expect(screen.getByText("?")).toBeInTheDocument();
  });

  it("分类切换", async () => {
    const user = userEvent.setup();
    render(<RecipeBookDemo />);
    await user.click(screen.getByRole("tab", { name: "工具" }));
    expect(document.querySelectorAll(".mc-tex-slot").length).toBe(2);
  });
});
