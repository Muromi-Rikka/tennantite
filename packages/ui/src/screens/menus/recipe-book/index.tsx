/* eslint-disable react/no-array-index-key -- 配方格是固定网格，位置即槽位 */
import type { PixelIconName } from "@verdigris/textures";

import { GuiSprite } from "../../../containers/gui-sprite/index";
import { Icon } from "../../../containers/icon/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { cn, gui } from "../../../lib/utils";
import { Tabs, TabsList, TabsPanel, TabsTab } from "../../../primitives/tabs/index";

export interface RecipeBookProps {
  categories?: { name: string; recipes: RecipeEntry[] }[];
  className?: string;
  title?: React.ReactNode;
}

export interface RecipeEntry {
  output?: { count?: number; icon?: PixelIconName; src?: string };
  unlocked?: boolean;
}

/**
 * 配方书（规格 §6.3）：177×166，`recipe_book.png` 主体 + 25px 配方格。
 */
export function RecipeBook({
  categories = [],
  className,
  title,
}: RecipeBookProps) {
  const firstTab = categories[0]?.name ?? "全部";
  return (
    <ScreenPanel className={cn(className)} height={166} title={title} width={177}>
      <GuiSprite
        className="absolute"
        height={166}
        name="recipe_book.png"
        src={{ height: 166, width: 147, x: 1, y: 1 }}
        style={{ left: gui(30), top: 0 }}
        width={147}
      />
      <Tabs className="absolute inset-0" defaultValue={firstTab}>
        <TabsList aria-label="配方分类" className="absolute top-3 left-0">
          {categories.map(category => (
            <TabsTab
              className="mc-tex-tab h-27 w-35 border-0 px-1"
              key={category.name}
              value={category.name}
            >
              {category.name}
            </TabsTab>
          ))}
        </TabsList>
        {categories.map(category => (
          <TabsPanel
            className="absolute"
            key={category.name}
            style={{ height: gui(120), left: gui(41), top: gui(28), width: gui(125) }}
            value={category.name}
          >
            {category.recipes.map((recipe, index) => {
              const unlocked = recipe.unlocked !== false && recipe.output;
              return (
                <button
                  aria-label={recipe.output ? `配方 ${index + 1}` : "未解锁配方"}
                  className="absolute cursor-pointer border-0 bg-transparent p-0"
                  data-recipe-locked={recipe.unlocked === false ? "" : undefined}
                  data-recipe-slot=""
                  key={index}
                  style={{
                    height: gui(25),
                    left: gui((index % 5) * 25),
                    top: gui(Math.floor(index / 5) * 25),
                    width: gui(25),
                  }}
                  type="button"
                >
                  <GuiSprite
                    height={25}
                    name={unlocked
                      ? "sprites/recipe_book/slot_craftable.png"
                      : "sprites/recipe_book/slot_uncraftable.png"}
                    width={25}
                  />
                  {unlocked
                    ? <Icon className="absolute top-1 left-1" name={recipe.output?.icon} size={16} src={recipe.output?.src} />
                    : <span className="relative font-mc mc-text text-mc-text-dim">?</span>}
                </button>
              );
            })}
          </TabsPanel>
        ))}
      </Tabs>
    </ScreenPanel>
  );
}
