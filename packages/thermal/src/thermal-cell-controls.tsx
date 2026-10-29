import { gui } from "@tennantite/ui";
import { THERMAL_CELL_CONTROLS } from "./thermal-metrics";
import { ThermalSprite } from "./thermal-sprite/index";

export function ThermalCellRateText({ center, label, value }: {
  center: number;
  /**
   * 可访问名称（进料/出料、存入/取出随界面而异）
   */
  label: string;
  value: number;
}) {
  return (
    <span
      aria-label={label}
      className="absolute font-mc mc-text text-mc-thermal-text"
      role="status"
      style={{ left: gui(center), top: gui(THERMAL_CELL_CONTROLS.amountTextTop), transform: "translateX(-50%)" }}
    >
      {value}
    </span>
  );
}

export function ThermalCellStepButton({ delta, disabled, label, left, onRateChange, rate, side = "input", sprite, top }: {
  delta: number;
  disabled: boolean;
  label: string;
  left: number;
  onRateChange?: (rate: number) => void;
  rate: number;
  side?: "input" | "output";
  sprite: "elements/button_decrement" | "elements/button_increment";
  top: number;
}) {
  return (
    <button
      aria-label={label}
      className="absolute cursor-pointer border-0 bg-transparent p-0 disabled:cursor-default"
      data-thermal-cell-side={side}
      disabled={disabled}
      onClick={disabled ? undefined : () => onRateChange?.(rate + delta)}
      style={{
        height: gui(THERMAL_CELL_CONTROLS.button.height),
        left: gui(left),
        top: gui(top),
        width: gui(THERMAL_CELL_CONTROLS.button.width),
      }}
      title={label}
      type="button"
    >
      <ThermalSprite
        crop={{ height: 14, width: 14, x: 0, y: 0 }}
        height={14}
        name={sprite}
        style={disabled ? { opacity: 0.4 } : undefined}
        width={14}
      />
    </button>
  );
}
