import { ThermalCellRateText, ThermalCellStepButton } from "../thermal-cell-controls";
import { THERMAL_CELL_CONTROLS } from "../thermal-metrics";

const { buttons, textCenters } = THERMAL_CELL_CONTROLS;

/**
 * ThermalCellRateText / ThermalCellStepButton 预览用例：进料 80、出料 160，
 * 四枚 ± 步进按钮（增按钮在速率到顶时禁用）。
 */
export function ThermalCellRateTextDemo() {
  return (
    <div className="relative h-[80px] w-[176px]">
      <ThermalCellRateText center={textCenters.input} label="进料速率" value={80} />
      <ThermalCellRateText center={textCenters.output} label="出料速率" value={160} />
      <ThermalCellStepButton
        delta={-4}
        disabled={false}
        label="降低进料速率"
        left={buttons.inputDecrement.left}
        onRateChange={() => {}}
        rate={80}
        side="input"
        sprite="elements/button_decrement"
        top={buttons.inputDecrement.top}
      />
      <ThermalCellStepButton
        delta={4}
        disabled={false}
        label="提高进料速率"
        left={buttons.inputIncrement.left}
        onRateChange={() => {}}
        rate={80}
        side="input"
        sprite="elements/button_increment"
        top={buttons.inputIncrement.top}
      />
      <ThermalCellStepButton
        delta={-4}
        disabled={false}
        label="降低出料速率"
        left={buttons.outputDecrement.left}
        onRateChange={() => {}}
        rate={160}
        side="output"
        sprite="elements/button_decrement"
        top={buttons.outputDecrement.top}
      />
      <ThermalCellStepButton
        delta={4}
        disabled
        label="提高出料速率"
        left={buttons.outputIncrement.left}
        onRateChange={() => {}}
        rate={160}
        side="output"
        sprite="elements/button_increment"
        top={buttons.outputIncrement.top}
      />
    </div>
  );
}
