import { ModIconButton, ModSprite } from "@tennantite/mods-core";
import { createSpriteMeta } from "@tennantite/textures";

import { CREATE_ICONS, CREATE_SCHEMATICANNON } from "../create-metrics";

export interface SettingsRowProps {
  onReplaceModeChange?: (mode: number) => void;
  onToggleSkipBlockEntities?: () => void;
  onToggleSkipMissing?: () => void;
  /**
   * 替换等级 0..3（dontReplace / solid / any / empty）
   */
  replaceMode: number;
  skipBlockEntities: boolean;
  skipMissing: boolean;
}

const REPLACE_OPTIONS = [
  { icon: "dontReplace", label: "不替换实体" },
  { icon: "replaceSolid", label: "替换为实体" },
  { icon: "replaceAny", label: "替换为任意方块" },
  { icon: "replaceEmpty", label: "替换为空气" },
] as const;

/**
 * 蓝图炮放置设置行：4 枚替换等级按钮 + 跳过缺失材料 / 跳过方块实体开关。
 */
export function SettingsRow({
  onReplaceModeChange,
  onToggleSkipBlockEntities,
  onToggleSkipMissing,
  replaceMode,
  skipBlockEntities,
  skipMissing,
}: SettingsRowProps) {
  const layout = CREATE_SCHEMATICANNON;
  const icons = CREATE_ICONS;
  return (
    <>
      {REPLACE_OPTIONS.map((option, index) => (
        <ModIconButton
          buttonClassName="bg-transparent"
          height={18}
          icon={(
            <ModSprite
              sprite={createSpriteMeta.icons}
              src={{ height: 16, width: 16, x: icons[option.icon].x, y: icons[option.icon].y }}
            />
          )}
          key={option.icon}
          label={option.label}
          left={layout.buttons.settingsReplace.left + index * layout.buttons.settingsReplace.step}
          onClick={() => onReplaceModeChange?.(index)}
          pressed={replaceMode === index}
          top={layout.buttons.settingsReplace.top}
          width={18}
        />
      ))}
      <ModIconButton
        buttonClassName="bg-transparent"
        height={18}
        icon={(
          <ModSprite
            sprite={createSpriteMeta.icons}
            src={{ height: 16, width: 16, x: icons.skipMissing.x, y: icons.skipMissing.y }}
          />
        )}
        label="跳过缺失材料"
        left={layout.buttons.skipMissing.left}
        onClick={onToggleSkipMissing}
        pressed={skipMissing}
        top={layout.buttons.skipMissing.top}
        width={18}
      />
      <ModIconButton
        buttonClassName="bg-transparent"
        height={18}
        icon={(
          <ModSprite
            sprite={createSpriteMeta.icons}
            src={{ height: 16, width: 16, x: icons.skipBlockEntities.x, y: icons.skipBlockEntities.y }}
          />
        )}
        label="跳过方块实体"
        left={layout.buttons.skipBlockEntities.left}
        onClick={onToggleSkipBlockEntities}
        pressed={skipBlockEntities}
        top={layout.buttons.skipBlockEntities.top}
        width={18}
      />
    </>
  );
}
