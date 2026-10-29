import { ModIconButton, ModProgress, ModSprite } from "@tennantite/mods-core";
import { createSpriteMeta } from "@tennantite/textures";
import { cn, gui } from "@tennantite/ui";

import { CREATE_ICONS, CREATE_VALUE_SETTINGS } from "../create-metrics";

export interface CreateValueSettingsPanelProps {
  className?: string;
  /**
   * 数值读法提示（上游 tip 行）
   */
  hint?: string;
  max: number;
  min: number;
  onChange?: (value: number) => void;
  /**
   * 增减步长（默认 1）
   */
  step?: number;
  /**
   * 面板标题（上游 label，如「数量」「光标间隔」）
   */
  title?: string;
  /**
   * 当前值（整数格，照上游 ScrollValueBehaviour）
   */
  value: number;
}

/**
 * Create 数值配置浮层（`ValueSettingsScreen` 视觉复刻）：深色半透明浮层面板 +
 * 标题与数值文本、249×8 里程碑轨道（每 8 格一枚窄里程碑、当前值一枚宽
 * 里程碑标记）、增减按钮。数据注入、无滚动确认逻辑。
 */
export function CreateValueSettingsPanel({
  className,
  hint,
  max,
  min,
  onChange,
  step = 1,
  title = "数值",
  value,
}: CreateValueSettingsPanelProps) {
  const bar = CREATE_VALUE_SETTINGS.bar;
  const range = Math.max(1, max - min);
  const ratio = Math.min(1, Math.max(0, (value - min) / range));
  const milestones = Math.floor(max / CREATE_VALUE_SETTINGS.milestoneInterval) + 1;
  const milestonePitch = bar.width / range;
  return (
    <div
      className={cn("mc-create-value-panel relative inline-block p-4", className)}
      style={{ width: gui(bar.width + 24) }}
    >
      <div className="mb-2 flex items-baseline justify-between">
        <span className="font-mc mc-text text-white mc-text-shadow">{title}</span>
        <span className="font-mc mc-text text-white mc-text-shadow">{value}</span>
      </div>
      <div className="relative" style={{ height: gui(bar.height), width: gui(bar.width) }}>
        <ModProgress
          direction="right"
          fillClassName="mc-create-value-fill"
          height={bar.height}
          label={hint ?? title}
          left={0}
          progress={ratio}
          top={0}
          trackClassName="mc-create-value-track"
          width={bar.width}
        />
        {Array.from({ length: milestones }, (_, index) => {
          const milestone = index * CREATE_VALUE_SETTINGS.milestoneInterval;
          if (milestone > max) {
            return null;
          }
          const wide = CREATE_VALUE_SETTINGS.wideMilestone;
          const isCurrent = milestone === value;
          const region = isCurrent ? wide : CREATE_VALUE_SETTINGS.milestone;
          return (
            <ModSprite
              height={region.height}
              key={milestone}
              left={Math.min(bar.width - region.width, Math.round(milestone * milestonePitch))}
              sprite={createSpriteMeta["value-settings"]}
              src={{
                height: region.height,
                width: region.width,
                x: isCurrent ? wide.x : 0,
                y: isCurrent ? wide.y : 0,
              }}
              top={0}
              width={region.width}
            />
          );
        })}
      </div>
      <div className="mt-2 flex justify-end gap-2">
        <ModIconButton
          disabled={!onChange || value - step < min}
          height={18}
          icon={(
            <span style={{ display: "block", transform: "rotate(180deg)" }}>
              <ModSprite
                sprite={createSpriteMeta.icons}
                src={{ height: 16, width: 16, x: CREATE_ICONS.add.x, y: CREATE_ICONS.add.y }}
              />
            </span>
          )}
          label="减小"
          onClick={onChange ? () => onChange(Math.max(min, value - step)) : undefined}
          width={18}
        />
        <ModIconButton
          disabled={!onChange || value + step > max}
          height={18}
          icon={(
            <ModSprite
              sprite={createSpriteMeta.icons}
              src={{ height: 16, width: 16, x: CREATE_ICONS.add.x, y: CREATE_ICONS.add.y }}
            />
          )}
          label="增大"
          onClick={onChange ? () => onChange(Math.min(max, value + step)) : undefined}
          width={18}
        />
      </div>
    </div>
  );
}
