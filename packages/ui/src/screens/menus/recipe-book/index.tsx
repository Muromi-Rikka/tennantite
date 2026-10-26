import type { PixelIconName } from "@verdigris/textures";
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
  * 是否已解锁（未解锁显示 ??? 占位）
  */
  unlocked?: boolean;
}

/**
 * 配方书（规格 §6.3）：Tabs 分类 + Slot 配方网格 + 解锁态。
*/
export function RecipeBook({
  categories = [],
  className,
  title = "配方书",
}: RecipeBookProps) {
  const firstTab = categories[0]?.name ?? "全部";
  return (
    <Panel className={cn("inline-flex flex-col gap-16 p-16", className)}>
      <TitleBar align="center" title={title} />
      <Tabs defaultValue={firstTab}>
        <TabsList aria-label="配方分类">
          {categories.map(category => (
            <TabsTab key={category.name} value={category.name}>
              {category.name}
            </TabsTab>
          ))}
        </TabsList>
        {categories.map(category => (
          <TabsPanel key={category.name} value={category.name}>
            <div className="flex flex-wrap gap-4">
              {category.recipes.map((recipe, index) => (
                <Slot
                  className="cursor-pointer"
                  data-recipe-locked={recipe.unlocked === false ? "" : undefined}
                  key={index}
                  size={48}
                >
                  {recipe.unlocked === false || !recipe.output
                    ? (
                        <span className="font-readable text-mc text-mc-text-dim">?</span>
                      )
                    : (
                        <Icon
                          name={recipe.output.icon}
                          size={36}
                          src={recipe.output.src}
                        />
                      )}
                </Slot>
              ))}
            </div>
          </TabsPanel>
        ))}
      </Tabs>
    </Panel>
  );
}
