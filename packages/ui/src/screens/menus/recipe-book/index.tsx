import type { PixelIconName } from "@verdigris/textures";
import { Grid } from "../../../containers/grid/index";
import { Icon } from "../../../containers/icon/index";
import { Panel } from "../../../containers/panel/index";
import { Slot } from "../../../containers/slot/index";
import { TitleBar } from "../../../containers/title-bar/index";
import { cn } from "../../../lib/utils";
import { Tabs, TabsList, TabsPanel, TabsTab } from "../../../primitives/tabs/index";

export interface RecipeBookProps {
  /**
  * 分类页签（数据由使用方注入）
  */
  categories?: {
    name: string;
    recipes: RecipeEntry[];
  }[];
  className?: string;
  title?: React.ReactNode;
}

export interface RecipeEntry {
  /**
  * 产物（未解锁的占位条目可省略）
  */
  output?: { count?: number; icon?: PixelIconName; src?: string };
  /**
  * 是否已解锁（未解锁显示 ? 占位）
  */
  unlocked?: boolean;
}

/**
 * 配方书（规格 §6.3）：Tabs 分类 + 9 列 18 GUI px 配方网格 + 解锁态。
*/
export function RecipeBook({
  categories = [],
  className,
  title = "配方书",
}: RecipeBookProps) {
  const firstTab = categories[0]?.name ?? "全部";
  return (
    <Panel className={cn("inline-flex w-176 flex-col gap-4 p-6", className)}>
      <TitleBar align="center" title={title} />
      <Tabs className="gap-4" defaultValue={firstTab}>
        <TabsList aria-label="配方分类">
          {categories.map(category => (
            <TabsTab key={category.name} value={category.name}>
              {category.name}
            </TabsTab>
          ))}
        </TabsList>
        {categories.map(category => (
          <TabsPanel key={category.name} value={category.name}>
            <Grid columns={9}>
              {category.recipes.map((recipe, index) => (
                <Slot
                  className="cursor-pointer"
                  data-recipe-locked={recipe.unlocked === false ? "" : undefined}
                  data-recipe-slot=""
                  key={index}
                >
                  {recipe.unlocked === false || !recipe.output
                    ? (
                        <span className="font-mc mc-text text-mc-text-dim">?</span>
                      )
                    : (
                        <Icon
                          name={recipe.output.icon}
                          src={recipe.output.src}
                        />
                      )}
                </Slot>
              ))}
            </Grid>
          </TabsPanel>
        ))}
      </Tabs>
    </Panel>
  );
}
