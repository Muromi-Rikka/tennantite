import type { JeiSpriteName } from "@tennantite/textures";

/**
 * JEI 布局常量（坐标为面板 GUI px，1 源 px = 1 GUI px）。
 * 来源：JustEnoughItems 26.3 `mezz.jei.gui.*` 的常量与贴图实测。
 */

/**
 * ingredient 单元 18 = 16 图标 + 四周各 1（GuiIngredientProperties + INGREDIENT_PADDING）
*/
export const JEI_INGREDIENT_CELL = 18;

/**
 * 普通配方槽（jei `slot.png`）与槽位边长
*/
export const JEI_SLOT_SIZE = 18;

/**
 * 配方输出槽（jei `output_slot.png`）
*/
export const JEI_OUTPUT_SLOT_SIZE = 26;

/**
 * 配方进度箭头（jei `recipe_arrow.png`）
*/
export const JEI_RECIPE_ARROW = { height: 16, width: 22 } as const;

/**
 * 熔炼火焰图标（jei `icons/flame*.png`）
*/
export const JEI_FLAME = { height: 14, width: 14 } as const;

/**
 * 物品列表面板（`IngredientListOverlay` / `IngredientGrid`）：
 * 搜索框在列表面板左侧（游戏中位于屏幕底部中央），网格纵向排列，底部翻页箭头。
 */
export const JEI_ITEM_LIST = {
  /**
  * 翻页箭头（icons/arrow_*.png 9×7）
  */
  pageArrow: { gap: 4, height: 7, width: 9 },
  /**
  * 面板背景相对槽位的内边距
  */
  panelPadding: 1,
  /**
  * 搜索框高（GuiTextFieldFilter 12）与宽（search_background_v2 可拉伸）
  */
  search: { height: 12, width: 80 },
  searchGap: 4,
} as const;

/**
 * 书签面板（`BookmarkOverlay`）：窄栏贴图书签槽，底部书签/历史按钮。
 */
export const JEI_BOOKMARK = {
  /**
  * BUTTON_GAP
  */
  buttonGap: 2,
  /**
  * BUTTON_SIZE
  */
  buttonSize: 20,
  pageArrow: { gap: 4, height: 7, width: 9 },
  panelPadding: 1,
} as const;

/**
 * 配方查看界面（`RecipesGui`）：默认与原版容器同尺寸 176×166，
 * 左侧分类标签列、顶部居中标题与翻页、右侧选项按钮列。
 */
export const JEI_RECIPE_GUI = {
  /**
  * borderPadding
  */
  borderPadding: 6,
  height: 166,
  /**
  * navBarPadding
  */
  navBarPadding: 2,
  /**
  * 前后配方导航按钮（smallButtonWidth/Height）
  */
  navButton: { height: 13, width: 13 },
  /**
  * 右侧选项按钮列（RecipeOptionButtons：2×1 边框 + 2×5 边距 + 16 按钮，与配方区重叠 6）
  */
  optionTab: { border: 5, button: 16, buttonBorder: 1, overlap: 6, width: 28 },
  /**
  * 左侧分类标签（tab_selected/tab_unselected 24×24）
  */
  tab: { left: 2, size: 24, top: 30 },
  /**
  * 标题高 = font.lineHeight 9 + borderPadding 6
  */
  titleHeight: 15,
  width: 176,
} as const;

/**
 * 选项列默认按钮（jei `icons/*`）
*/
export const JEI_OPTION_BUTTONS = {
  bookmark: {
    icon: "icons/recipe_bookmark",
    label: "加入书签",
  },
  transfer: {
    icon: "icons/recipe_transfer",
    label: "移入物品栏",
  },
} satisfies Record<string, { icon: JeiSpriteName; label: string }>;
