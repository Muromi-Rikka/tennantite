import type { ScreenSlot } from "@tennantite/ui";
import type { ReactElement, ReactNode } from "react";
import { gui, PlayerInventory, ScreenItemSlot, ScreenPanel } from "@tennantite/ui";
import type {
  IfMachineKey,
  IfMycelialGeneratorVariant,
  IfSlotGroup,
} from "../if-machine-layout";
import type { IfRedstoneMode } from "../if-markers";
import type { IfFaceMode } from "../if-metrics";

import { IfAugmentPanel } from "../if-augment-panel/index";
import { IfEnergyBar } from "../if-energy-bar/index";
import { IfFluidTank } from "../if-fluid-tank/index";
import { IfIconButton } from "../if-icon-button/index";
import { resolveIfMachineLayout } from "../if-machine-layout";
import { ifButtonCrop, ifNextRedstone } from "../if-markers";
import {
  IF_AREA_BUTTON,
  IF_DONATE,
  IF_DONATE_FOOT,
  IF_DONATE_ICON,
  IF_DYE_MAP,
  IF_GENERATOR_FRAME,
  IF_GENERATOR_ICON,
  IF_ITEM_SIZE,
  IF_PANEL_HEIGHT,
  IF_PANEL_LEFT,
  IF_PANEL_WIDTH,
  IF_PARTICLE_BUTTON,
  IF_PLAYER,
  IF_SCREEN_WIDTH,
  IF_TEXT_COLOR,
  IF_TITLE_TOP,
} from "../if-metrics";
import { IfProgress } from "../if-progress/index";
import { IfRedstoneButton } from "../if-redstone-button/index";
import { IfSlot } from "../if-slot/index";
import { IfSprite } from "../if-sprite/index";
import { IfTankPanel } from "../if-tank-panel/index";
import { IfTextField } from "../if-text-field/index";

export interface IfMachineScreenProps {
  area?: { particles: boolean; showArea: boolean };
  buttons?: Record<string, number>;
  children?: ReactNode;
  className?: string;
  /**
   * 菌丝发电机展示物品（128,39）
   */
  display?: ScreenSlot;
  energy?: { max: number; value: number };
  faces?: Record<string, IfFaceMode>;
  fluids?: Record<string, { max: number; tint: string; value: number }>;
  items?: Record<string, ScreenSlot>;
  labelValues?: Record<string, string>;
  locked?: Record<string, boolean>;
  machine: IfMachineKey;
  onAreaChange?: (next: { particles: boolean; showArea: boolean }) => void;
  onButtonActivate?: (id: string) => void;
  onFaceActivate?: (id: string) => void;
  onRedstoneChange?: (next: IfRedstoneMode) => void;
  onSlotActivate?: (label: string) => void;
  onTextFieldChange?: (id: string, value: string) => void;
  overlays?: Record<string, ScreenSlot>;
  progress?: Record<string, number>;
  redstone?: IfRedstoneMode;
  textFieldValues?: Record<string, string>;
  title?: string;
  variant?: IfMycelialGeneratorVariant;
}

/**
 * Industrial Foregoing 机器界面基座（Titanium 176×184 背景 + 右侧面板 +
 * 左侧捐赠徽标）。内部子元素坐标以主面板外沿为 0；根容器多留左右外框。
 */
export function IfMachineScreen({
  area,
  buttons,
  children,
  className,
  display,
  energy,
  faces,
  fluids,
  items,
  labelValues,
  locked,
  machine,
  onAreaChange,
  onButtonActivate,
  onFaceActivate,
  onRedstoneChange,
  onSlotActivate,
  onTextFieldChange,
  overlays,
  progress,
  redstone = "ignore",
  textFieldValues,
  title,
  variant,
}: IfMachineScreenProps) {
  const resolved = resolveIfMachineLayout(machine, variant);
  const { spec } = resolved;
  const fluidStates = fluids ?? {};
  const progressStates = progress ?? {};
  const areaState = area ?? { particles: true, showArea: false };

  return (
    <ScreenPanel
      backgroundClassName="bg-transparent"
      className={className}
      data-if-machine={machine}
      data-if-screen=""
      height={IF_PANEL_HEIGHT}
      width={IF_SCREEN_WIDTH}
    >
      <div
        className="absolute"
        style={{
          height: gui(IF_PANEL_HEIGHT),
          left: gui(IF_PANEL_LEFT),
          top: 0,
          width: gui(IF_PANEL_WIDTH),
        }}
      >
        <IfSprite
          crop="machineBackground"
          height={IF_PANEL_HEIGHT}
          left={0}
          name="titanium_background"
          top={0}
          width={IF_PANEL_WIDTH}
        />
        <span
          className="absolute font-mc mc-text whitespace-pre"
          style={{
            color: IF_TEXT_COLOR,
            left: 0,
            right: 0,
            textAlign: "center",
            top: gui(IF_TITLE_TOP),
          }}
        >
          {title ?? spec.title}
        </span>

        {resolved.energy
          ? (
              <IfEnergyBar
                max={energy?.max ?? 1}
                value={energy?.value ?? 0}
              />
            )
          : null}

        {resolved.bar
          ? (
              <IfProgress
                color={resolved.bar.color}
                kind={resolved.bar.kind}
                label="进度"
                left={resolved.bar.x}
                max={1}
                top={resolved.bar.y}
                value={progressStates.bar ?? 0}
              />
            )
          : null}

        {spec.progresses.map(progressSpec => (
          <IfProgress
            color={progressSpec.color}
            key={progressSpec.name}
            kind={progressSpec.kind}
            label={progressSpec.name}
            left={progressSpec.x}
            max={1}
            top={progressSpec.y}
            value={progressStates[progressSpec.name] ?? 0}
          />
        ))}

        {spec.slots.flatMap(group => renderSlotGroup(group, items, onSlotActivate))}

        {spec.filterSlots.map(filterSpec => (
          <IfSlot
            color={filterSpec.color}
            frame="filter"
            item={items?.[filterSpec.id]}
            key={filterSpec.id}
            label={filterSpec.id}
            left={filterSpec.x}
            onActivate={onSlotActivate ? () => { onSlotActivate(filterSpec.id); } : undefined}
            top={filterSpec.y}
          />
        ))}

        {spec.tanks.map((tankSpec) => {
          const state = fluidStates[tankSpec.name];
          return (
            <IfFluidTank
              color={tankSpec.color}
              key={tankSpec.name}
              label={tankSpec.name}
              left={tankSpec.x}
              max={state?.max ?? 1}
              name={tankSpec.name}
              size={tankSpec.size}
              tint={state?.tint ?? "#4C7F99"}
              top={tankSpec.y}
              value={state?.value ?? 0}
            />
          );
        })}

        {spec.overlays.map(overlaySpec => overlaySpec.id === "enchant-icon"
          ? (
              <IfSprite
                crop="enchantIcon"
                height={14}
                key={overlaySpec.id}
                left={overlaySpec.x}
                name="machines"
                top={overlaySpec.y}
                width={14}
              />
            )
          : (
              <ScreenItemSlot
                frame={false}
                item={overlays?.[overlaySpec.id]}
                key={overlaySpec.id}
                label={`overlay-${overlaySpec.id}`}
                left={overlaySpec.x}
                onActivate={onSlotActivate ? () => { onSlotActivate(overlaySpec.id); } : undefined}
                size={overlaySpec.size}
                top={overlaySpec.y}
              />
            ))}

        {machine === "mycelialGenerator"
          ? (
              <>
                <IfSprite
                  crop="generatorFrame"
                  height={IF_GENERATOR_FRAME.size}
                  left={IF_GENERATOR_FRAME.left}
                  name="titanium_background"
                  opacity={0.6}
                  top={IF_GENERATOR_FRAME.top}
                  width={IF_GENERATOR_FRAME.size}
                />
                <ScreenItemSlot
                  frame={false}
                  item={display}
                  label="display"
                  left={IF_GENERATOR_ICON.left}
                  size={IF_ITEM_SIZE}
                  top={IF_GENERATOR_ICON.top}
                />
              </>
            )
          : null}

        {spec.labels.map((labelSpec) => {
          const value = labelValues?.[labelSpec.id] ?? labelSpec.text;
          const text = value === "" && labelSpec.id === "coords" ? "未找到目标" : value;
          return (
            <span
              className="absolute font-mc mc-text whitespace-pre"
              key={labelSpec.id}
              style={{ color: IF_TEXT_COLOR, left: gui(labelSpec.x), top: gui(labelSpec.y) }}
            >
              {text}
            </span>
          );
        })}

        {spec.textFields.map(field => (
          <IfTextField
            height={field.height}
            key={field.id}
            label={field.id}
            left={field.x}
            onChange={onTextFieldChange ? (value) => { onTextFieldChange(field.id, value); } : undefined}
            top={field.y}
            value={textFieldValues?.[field.id] ?? ""}
            width={field.width}
          />
        ))}

        {spec.buttons.map((buttonSpec) => {
          const state = buttons?.[buttonSpec.id] ?? 0;
          const isLocked = locked?.[buttonSpec.id] ?? false;
          const crop = ifButtonCrop(buttonSpec.kind, state, isLocked);
          const tooltip = buttonSpec.kind === "lock"
            ? (isLocked ? "解锁" : "锁定")
            : buttonSpec.id;
          return (
            <IfIconButton
              height={buttonSpec.height}
              key={buttonSpec.id}
              label={buttonSpec.id}
              left={buttonSpec.x}
              onClick={onButtonActivate ? () => { onButtonActivate(buttonSpec.id); } : undefined}
              state={0}
              states={[crop]}
              tooltip={tooltip}
              top={buttonSpec.y}
              width={buttonSpec.width}
            />
          );
        })}

        {resolved.faces.map(face => (
          <button
            aria-label={`face-${face.id}`}
            className="absolute border-0 p-0"
            data-if-face={face.id}
            data-if-face-mode={faces?.[face.id] ?? "disabled"}
            key={`face-${face.id}`}
            onClick={onFaceActivate ? () => { onFaceActivate(face.id); } : undefined}
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

        {resolved.areaButtons
          ? (
              <>
                <IfIconButton
                  height={14}
                  label="area"
                  left={IF_AREA_BUTTON.left}
                  onClick={onAreaChange
                    ? () => { onAreaChange({ ...areaState, showArea: !areaState.showArea }); }
                    : undefined}
                  state={areaState.showArea ? 1 : 0}
                  states={["showArea", "hideArea"]}
                  tooltip={areaState.showArea ? "隐藏区域" : "显示区域"}
                  top={IF_AREA_BUTTON.top}
                  width={14}
                />
                <IfIconButton
                  height={14}
                  label="particle"
                  left={IF_PARTICLE_BUTTON.left}
                  onClick={onAreaChange
                    ? () => { onAreaChange({ ...areaState, particles: !areaState.particles }); }
                    : undefined}
                  state={areaState.particles ? 1 : 0}
                  states={["hideParticle", "showParticle"]}
                  tooltip={areaState.particles ? "显示粒子" : "隐藏粒子"}
                  top={IF_PARTICLE_BUTTON.top}
                  width={14}
                />
              </>
            )
          : null}

        {resolved.redstone
          ? (
              <IfRedstoneButton
                onClick={onRedstoneChange
                  ? () => { onRedstoneChange(ifNextRedstone(redstone)); }
                  : undefined}
                value={redstone}
              />
            )
          : null}

        {resolved.augments
          ? (
              <IfAugmentPanel
                items={[0, 1, 2, 3].map(index => items?.[`augment-${index}`])}
              />
            )
          : null}

        {resolved.tankPanel
          ? (
              <IfTankPanel
                input={items?.["fluid-input"]}
                output={items?.["fluid-output"]}
                progress={progressStates["fluid-transfer"] ?? 0}
              />
            )
          : null}

        <IfSprite
          crop="donateBg"
          height={22}
          left={IF_DONATE.left}
          name="titanium_background_alt"
          top={IF_DONATE.top}
          width={22}
        />
        <IfSprite
          crop="donateFoot"
          height={3}
          left={IF_DONATE_FOOT.left}
          name="titanium_background_alt"
          top={IF_DONATE_FOOT.top}
          width={22}
        />
        <IfSprite
          crop="donateIcon"
          height={15}
          left={IF_DONATE_ICON.left}
          name="donate"
          top={IF_DONATE_ICON.top}
          width={15}
        />

        <PlayerInventory
          bare
          hotbarY={IF_PLAYER.hotbarY}
          x={IF_PLAYER.left}
          y={IF_PLAYER.top}
        />
        {children}
      </div>
    </ScreenPanel>
  );
}

function renderSlotGroup(
  group: IfSlotGroup,
  items: Record<string, ScreenSlot> | undefined,
  onSlotActivate: ((label: string) => void) | undefined,
): ReactElement[] {
  const cells = group.offsets
    ?? Array.from({ length: group.cols * group.rows }, (_, index) => [
      (index % group.cols) * 18,
      Math.floor(index / group.cols) * 18,
    ] as const);

  return cells.map(([dx, dy], index) => {
    const isSingle = !group.offsets && group.cols * group.rows === 1;
    const label = isSingle ? group.name : `${group.name}-${index}`;
    return (
      <IfSlot
        color={group.color}
        item={items?.[label]}
        key={label}
        label={label}
        left={group.x + dx}
        onActivate={onSlotActivate ? () => { onSlotActivate(label); } : undefined}
        top={group.y + dy}
      />
    );
  });
}
