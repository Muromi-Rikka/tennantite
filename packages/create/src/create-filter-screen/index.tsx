import type { ModSpriteRect } from "@tennantite/mods-core";
import type { InventoryItem, ScreenSlot } from "@tennantite/ui";
import { ModIconButton, ModSlotGrid, ModSprite } from "@tennantite/mods-core";
import { createSpriteMeta } from "@tennantite/textures";

import { CREATE_ATLAS, CREATE_FILTER, CREATE_ICONS } from "../create-metrics";
import { CreateWindow } from "../create-window/index";

export type CreateFilterMatch = "allow" | "deny";
export type CreateFilterMode = "and" | "or";

export interface CreateFilterScreenProps {
  className?: string;
  /**
   * 2×9 幽灵物品格（数据注入，无过滤逻辑）
   */
  items?: ScreenSlot[];
  /**
   * 名单方向（黑名单拒绝 / 白名单允许，照 FilterScreen 两态按钮）
   */
  match: CreateFilterMatch;
  /**
   * 标签连接词（AND / OR，照 AttributeFilterScreen 两态按钮）
   */
  mode: CreateFilterMode;
  onMatchChange?: (match: CreateFilterMatch) => void;
  onModeChange?: (mode: CreateFilterMode) => void;
  onRespectDataChange?: (shouldRespectData: boolean) => void;
  onSlotClick?: (index: number, item?: ScreenSlot) => void;
  player?: {
    hotbarItems?: (InventoryItem | null | undefined)[];
    mainItems?: (InventoryItem | null | undefined)[];
  };
  /**
   * 是否比对 NBT（照 FilterScreen RESPECT/IGNORE DATA 两态按钮）
   */
  respectData?: boolean;
}

const MODE_ICONS = {
  and: "whitelistAnd",
  or: "whitelistOr",
} as const satisfies Record<CreateFilterMode, keyof typeof CREATE_ICONS>;

const OPTIONS = ["allow", "deny", "ignoreData", "respectData"] as const;
type OptionName = (typeof OPTIONS)[number];

const OPTION_ICONS = {
  allow: "whitelist",
  deny: "blacklist",
  ignoreData: "ignoreData",
  respectData: "respectData",
} as const satisfies Record<OptionName, keyof typeof CREATE_ICONS>;

const OPTION_LABELS: Record<OptionName, string> = {
  allow: "白名单",
  deny: "黑名单",
  ignoreData: "忽略 NBT",
  respectData: "比对 NBT",
};

/**
 * Create 筛选器界面（`FilterScreen` 视觉复刻）：FILTER 214×99 背板 +
 * 2×9 幽灵物品格 + 黑名单/白名单与 NBT 两态按钮（激活项白色高亮）+
 * AND/OR 连接词切换 + 玩家背包。数据注入、无过滤逻辑。
 */
export function CreateFilterScreen({
  className,
  items,
  match,
  mode,
  onMatchChange,
  onModeChange,
  onRespectDataChange,
  onSlotClick,
  player,
  respectData: shouldRespectData = false,
}: CreateFilterScreenProps) {
  const filter = CREATE_ATLAS.filter;
  const buttons = CREATE_FILTER.buttons;
  const isOptionActive = (option: OptionName): boolean => {
    switch (option) {
      case "allow": {
        return match === "allow";
      }
      case "deny": {
        return match === "deny";
      }
      case "ignoreData": {
        return !shouldRespectData;
      }
      default: {
        return shouldRespectData;
      }
    }
  };
  return (
    <CreateWindow
      background={<ModSprite left={0} sprite={createSpriteMeta[filter.atlas]} src={filter} top={0} />}
      className={className}
      height={CREATE_FILTER.height}
      player={{
        hotbarItems: player?.hotbarItems,
        hotbarY: CREATE_FILTER.player.hotbarY,
        mainItems: player?.mainItems,
        x: CREATE_FILTER.player.x,
        y: CREATE_FILTER.player.y,
      }}
      width={CREATE_FILTER.width}
    >
      <ModSlotGrid
        columns={CREATE_FILTER.grid.columns}
        items={items}
        labelPrefix="filter-slot"
        left={CREATE_FILTER.grid.left}
        onSlotClick={onSlotClick
          ? index => onSlotClick(index, items?.[index])
          : undefined}
        rows={CREATE_FILTER.grid.rows}
        top={CREATE_FILTER.grid.top}
      />
      {OPTIONS.map(option => (
        <ModIconButton
          buttonClassName="bg-transparent"
          className={isOptionActive(option) ? "mc-slot-selected" : undefined}
          height={18}
          icon={(
            <ModSprite
              sprite={createSpriteMeta.icons}
              src={optionIcon(OPTION_ICONS[option])}
            />
          )}
          key={option}
          label={OPTION_LABELS[option]}
          left={buttons[option].left}
          onClick={onOptionClick(option, {
            match,
            mode,
            onMatchChange,
            onModeChange,
            onRespectDataChange,
          })}
          pressed={isOptionActive(option)}
          top={buttons[option].top}
          width={18}
        />
      ))}
      {(["and", "or"] as const).map(modeOption => (
        <ModIconButton
          buttonClassName="bg-transparent"
          className={mode === modeOption ? "mc-slot-selected" : undefined}
          height={18}
          icon={(
            <ModSprite
              sprite={createSpriteMeta.icons}
              src={optionIcon(MODE_ICONS[modeOption])}
            />
          )}
          key={modeOption}
          label={modeOption === "and" ? "全部满足（AND）" : "任一满足（OR）"}
          left={buttons[modeOption].left}
          onClick={() => onModeChange?.(modeOption)}
          pressed={mode === modeOption}
          top={buttons[modeOption].top}
          width={18}
        />
      ))}
    </CreateWindow>
  );
}

function onOptionClick(
  option: OptionName,
  handlers: {
    match: CreateFilterMatch;
    mode: CreateFilterMode;
    onMatchChange?: (match: CreateFilterMatch) => void;
    onModeChange?: (mode: CreateFilterMode) => void;
    onRespectDataChange?: (shouldRespectData: boolean) => void;
  },
) {
  switch (option) {
    case "allow": {
      return () => handlers.onMatchChange?.("allow");
    }
    case "deny": {
      return () => handlers.onMatchChange?.("deny");
    }
    case "ignoreData": {
      return () => handlers.onRespectDataChange?.(false);
    }
    default: {
      return () => handlers.onRespectDataChange?.(true);
    }
  }
}

function optionIcon(name: keyof typeof CREATE_ICONS): ModSpriteRect {
  const icon = CREATE_ICONS[name];
  return { height: 16, width: 16, x: icon.x, y: icon.y };
}
