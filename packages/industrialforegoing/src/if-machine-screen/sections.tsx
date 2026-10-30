import type { ScreenSlot } from "@tennantite/ui";
import type {
  IfButtonSpec,
  IfFilterSlotSpec,
  IfLabelSpec,
  IfOverlaySpec,
  IfResolvedFace,
  IfTankSpec,
  IfTextFieldSpec,
} from "../if-machine-layout";
import type { IfFaceMode } from "../if-metrics";

import { gui, ScreenItemSlot } from "@tennantite/ui";
import {
  IF_AREA_BUTTON,
  IF_DYE_MAP,
  IF_PARTICLE_BUTTON,
  IF_TEXT_COLOR,
} from "../if-metrics";
import { ifButtonCrop } from "../if-markers";
import { IfFluidTank } from "../if-fluid-tank/index";
import { IfIconButton } from "../if-icon-button/index";
import { IfSlot } from "../if-slot/index";
import { IfSprite } from "../if-sprite/index";
import { IfTextField } from "../if-text-field/index";

/**
 * 过滤槽列表：`frame="filter"` 的遮罩槽。
 */
export interface IfFilterSlotsProps {
  items?: Record<string, ScreenSlot>;
  onActivate?: (id: string) => void;
  specs: IfFilterSlotSpec[];
}

export function IfFilterSlots({ items, onActivate, specs }: IfFilterSlotsProps) {
  return (
    <>
      {specs.map(spec => (
        <IfSlot
          color={spec.color}
          frame="filter"
          item={items?.[spec.id]}
          key={spec.id}
          label={spec.id}
          left={spec.x}
          onActivate={onActivate ? () => { onActivate(spec.id); } : undefined}
          top={spec.y}
        />
      ))}
    </>
  );
}

/**
 * 储罐列表：缺省状态按空罐渲染。
 */
export interface IfTankListProps {
  fluids?: Record<string, { max: number; tint: string; value: number }>;
  specs: IfTankSpec[];
}

export function IfTankList({ fluids, specs }: IfTankListProps) {
  return (
    <>
      {specs.map((spec) => {
        const state = fluids?.[spec.name];
        return (
          <IfFluidTank
            color={spec.color}
            key={spec.name}
            label={spec.name}
            left={spec.x}
            max={state?.max ?? 1}
            name={spec.name}
            size={spec.size}
            tint={state?.tint ?? "#4C7F99"}
            top={spec.y}
            value={state?.value ?? 0}
          />
        );
      })}
    </>
  );
}

/**
 * 覆盖层列表：`enchant-icon` 用图集图标，其余为可点击物品槽。
 */
export interface IfOverlayListProps {
  onActivate?: (id: string) => void;
  overlays?: Record<string, ScreenSlot>;
  specs: IfOverlaySpec[];
}

export function IfOverlayList({ onActivate, overlays, specs }: IfOverlayListProps) {
  return (
    <>
      {specs.map(spec => spec.id === "enchant-icon"
        ? (
            <IfSprite
              crop="enchantIcon"
              height={14}
              key={spec.id}
              left={spec.x}
              name="machines"
              top={spec.y}
              width={14}
            />
          )
        : (
            <ScreenItemSlot
              frame={false}
              item={overlays?.[spec.id]}
              key={spec.id}
              label={`overlay-${spec.id}`}
              left={spec.x}
              onActivate={onActivate ? () => { onActivate(spec.id); } : undefined}
              size={spec.size}
              top={spec.y}
            />
          ))}
    </>
  );
}

/**
 * 文本标签列表：`coords` 空值回退为「未找到目标」。
 */
export interface IfLabelListProps {
  labelValues?: Record<string, string>;
  specs: IfLabelSpec[];
}

export function IfLabelList({ labelValues, specs }: IfLabelListProps) {
  return (
    <>
      {specs.map((spec) => {
        const value = labelValues?.[spec.id] ?? spec.text;
        const text = value === "" && spec.id === "coords" ? "未找到目标" : value;
        return (
          <span
            className="absolute font-mc mc-text whitespace-pre"
            key={spec.id}
            style={{ color: IF_TEXT_COLOR, left: gui(spec.x), top: gui(spec.y) }}
          >
            {text}
          </span>
        );
      })}
    </>
  );
}

/**
 * 文本输入列表：值由调用方受控。
 */
export interface IfTextFieldListProps {
  onChange?: (id: string, value: string) => void;
  specs: IfTextFieldSpec[];
  values?: Record<string, string>;
}

export function IfTextFieldList({ onChange, specs, values }: IfTextFieldListProps) {
  return (
    <>
      {specs.map(spec => (
        <IfTextField
          height={spec.height}
          key={spec.id}
          label={spec.id}
          left={spec.x}
          onChange={onChange ? (value) => { onChange(spec.id, value); } : undefined}
          top={spec.y}
          value={values?.[spec.id] ?? ""}
          width={spec.width}
        />
      ))}
    </>
  );
}

/**
 * 图集按钮列表：状态索引 + 锁定态解析裁剪，锁定按钮的提示在「锁定/解锁」间切换。
 */
export interface IfButtonListProps {
  locked?: Record<string, boolean>;
  onActivate?: (id: string) => void;
  specs: IfButtonSpec[];
  states?: Record<string, number>;
}

export function IfButtonList({ locked, onActivate, specs, states }: IfButtonListProps) {
  return (
    <>
      {specs.map((spec) => {
        const state = states?.[spec.id] ?? 0;
        const isLocked = locked?.[spec.id] ?? false;
        const crop = ifButtonCrop(spec.kind, state, isLocked);
        const tooltip = spec.kind === "lock"
          ? (isLocked ? "解锁" : "锁定")
          : spec.id;
        return (
          <IfIconButton
            height={spec.height}
            key={spec.id}
            label={spec.id}
            left={spec.x}
            onClick={onActivate ? () => { onActivate(spec.id); } : undefined}
            state={0}
            states={[crop]}
            tooltip={tooltip}
            top={spec.y}
            width={spec.width}
          />
        );
      })}
    </>
  );
}

/**
 * 面配置按钮列表：染色方块 + 侧管理器图标。
 */
export interface IfFaceListProps {
  faces?: Record<string, IfFaceMode>;
  onActivate?: (id: string) => void;
  specs: IfResolvedFace[];
}

export function IfFaceList({ faces, onActivate, specs }: IfFaceListProps) {
  return (
    <>
      {specs.map(face => (
        <button
          aria-label={`face-${face.id}`}
          className="absolute border-0 p-0"
          data-if-face={face.id}
          data-if-face-mode={faces?.[face.id] ?? "disabled"}
          key={`face-${face.id}`}
          onClick={onActivate ? () => { onActivate(face.id); } : undefined}
          style={{
            backgroundColor: IF_DYE_MAP[face.color],
            height: gui(14),
            left: gui(face.x),
            padding: 0,
            top: gui(face.y),
            width: gui(14),
          }}
          title={`面配置：${face.id}`}
          type="button"
        >
          <IfSprite
            crop="sideManager"
            height={14}
            left={0}
            name="titanium_background"
            top={0}
            width={14}
          />
        </button>
      ))}
    </>
  );
}

/**
 * 区域 / 粒子开关：受控于 `area`，点击回传翻转后的完整状态。
 */
export interface IfAreaTogglesProps {
  area?: { particles: boolean; showArea: boolean };
  onChange?: (next: { particles: boolean; showArea: boolean }) => void;
}

export function IfAreaToggles({
  area = { particles: true, showArea: false },
  onChange,
}: IfAreaTogglesProps) {
  return (
    <>
      <IfIconButton
        height={14}
        label="area"
        left={IF_AREA_BUTTON.left}
        onClick={onChange
          ? () => { onChange({ ...area, showArea: !area.showArea }); }
          : undefined}
        state={area.showArea ? 1 : 0}
        states={["showArea", "hideArea"]}
        tooltip={area.showArea ? "隐藏区域" : "显示区域"}
        top={IF_AREA_BUTTON.top}
        width={14}
      />
      <IfIconButton
        height={14}
        label="particle"
        left={IF_PARTICLE_BUTTON.left}
        onClick={onChange
          ? () => { onChange({ ...area, particles: !area.particles }); }
          : undefined}
        state={area.particles ? 1 : 0}
        states={["hideParticle", "showParticle"]}
        tooltip={area.particles ? "显示粒子" : "隐藏粒子"}
        top={IF_PARTICLE_BUTTON.top}
        width={14}
      />
    </>
  );
}
