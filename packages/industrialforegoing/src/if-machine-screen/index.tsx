import type { ScreenSlot } from "@tennantite/ui";
import type { ReactNode } from "react";
import { gui, PlayerInventory, ScreenItemSlot, ScreenPanel } from "@tennantite/ui";
import type { IfMachineKey, IfMycelialGeneratorVariant } from "../if-machine-layout";
import type { IfRedstoneMode } from "../if-markers";
import type { IfFaceMode } from "../if-metrics";

import { IfAugmentPanel } from "../if-augment-panel/index";
import { IfEnergyBar } from "../if-energy-bar/index";
import { resolveIfMachineLayout } from "../if-machine-layout";
import { ifNextRedstone } from "../if-markers";
import {
  IF_DONATE,
  IF_DONATE_FOOT,
  IF_DONATE_ICON,
  IF_GENERATOR_FRAME,
  IF_GENERATOR_ICON,
  IF_ITEM_SIZE,
  IF_PANEL_HEIGHT,
  IF_PANEL_LEFT,
  IF_PANEL_WIDTH,
  IF_PLAYER,
  IF_SCREEN_WIDTH,
  IF_TEXT_COLOR,
  IF_TITLE_TOP,
} from "../if-metrics";
import { IfProgress } from "../if-progress/index";
import { IfRedstoneButton } from "../if-redstone-button/index";
import { IfSprite } from "../if-sprite/index";
import { IfTankPanel } from "../if-tank-panel/index";
import {
  IfAreaToggles,
  IfButtonList,
  IfFaceList,
  IfFilterSlots,
  IfLabelList,
  IfOverlayList,
  IfTankList,
  IfTextFieldList,
} from "./sections";
import { IfSlotGroupGrid } from "./slot-group";

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
  const progressStates = progress ?? {};

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
          && <IfEnergyBar max={energy?.max ?? 1} value={energy?.value ?? 0} />}

        {resolved.bar
          && (
            <IfProgress
              color={resolved.bar.color}
              kind={resolved.bar.kind}
              label="进度"
              left={resolved.bar.x}
              max={1}
              top={resolved.bar.y}
              value={progressStates.bar ?? 0}
            />
          )}

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

        {spec.slots.map((group, index) => (
          <IfSlotGroupGrid
            group={group}
            items={items}
            key={`${group.name}-${index}`}
            onActivate={onSlotActivate}
          />
        ))}

        <IfFilterSlots items={items} onActivate={onSlotActivate} specs={spec.filterSlots} />
        <IfTankList fluids={fluids} specs={spec.tanks} />
        <IfOverlayList onActivate={onSlotActivate} overlays={overlays} specs={spec.overlays} />

        {machine === "mycelialGenerator"
          && (
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
          )}

        <IfLabelList labelValues={labelValues} specs={spec.labels} />
        <IfTextFieldList onChange={onTextFieldChange} specs={spec.textFields} values={textFieldValues} />
        <IfButtonList locked={locked} onActivate={onButtonActivate} specs={spec.buttons} states={buttons} />
        <IfFaceList faces={faces} onActivate={onFaceActivate} specs={resolved.faces} />

        {resolved.areaButtons
          && <IfAreaToggles area={area} onChange={onAreaChange} />}

        {resolved.redstone
          && (
            <IfRedstoneButton
              onClick={onRedstoneChange
                ? () => { onRedstoneChange(ifNextRedstone(redstone)); }
                : undefined}
              value={redstone}
            />
          )}

        {resolved.augments
          && (
            <IfAugmentPanel items={[0, 1, 2, 3].map(index => items?.[`augment-${index}`])} />
          )}

        {resolved.tankPanel
          && (
            <IfTankPanel
              input={items?.["fluid-input"]}
              output={items?.["fluid-output"]}
              progress={progressStates["fluid-transfer"] ?? 0}
            />
          )}

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
