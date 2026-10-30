import type { MekanismMachineScreenProps } from "./index";
import { MekanismMachineScreen } from "./index";

export interface MekanismMachinePresetProps extends Omit<MekanismMachineScreenProps, "machine"> {}

export function MekanismAntiprotonicNucleosynthesizerScreen(props: MekanismMachinePresetProps) {
  return <MekanismMachineScreen machine="antiprotonic-nucleosynthesizer" {...props} />;
}
export function MekanismChemicalCrystallizerScreen(props: MekanismMachinePresetProps) {
  return <MekanismMachineScreen machine="chemical-crystallizer" {...props} />;
}
export function MekanismChemicalDissolutionChamberScreen(props: MekanismMachinePresetProps) {
  return <MekanismMachineScreen machine="chemical-dissolution-chamber" {...props} />;
}
export function MekanismChemicalInfuserScreen(props: MekanismMachinePresetProps) {
  return <MekanismMachineScreen machine="chemical-infuser" {...props} />;
}
export function MekanismChemicalInjectionChamberScreen(props: MekanismMachinePresetProps) {
  return <MekanismMachineScreen machine="chemical-injection-chamber" {...props} />;
}
export function MekanismChemicalOxidizerScreen(props: MekanismMachinePresetProps) {
  return <MekanismMachineScreen machine="chemical-oxidizer" {...props} />;
}
export function MekanismChemicalWasherScreen(props: MekanismMachinePresetProps) {
  return <MekanismMachineScreen machine="chemical-washer" {...props} />;
}
export function MekanismCombinerScreen(props: MekanismMachinePresetProps) {
  return <MekanismMachineScreen machine="combiner" {...props} />;
}
export function MekanismCrusherScreen(props: MekanismMachinePresetProps) {
  return <MekanismMachineScreen machine="crusher" {...props} />;
}
export function MekanismElectrolyticSeparatorScreen(props: MekanismMachinePresetProps) {
  return <MekanismMachineScreen machine="electrolytic-separator" {...props} />;
}
export function MekanismEnergizedSmelterScreen(props: MekanismMachinePresetProps) {
  return <MekanismMachineScreen machine="energized-smelter" {...props} />;
}
export function MekanismEnrichmentChamberScreen(props: MekanismMachinePresetProps) {
  return <MekanismMachineScreen machine="enrichment-chamber" {...props} />;
}
export function MekanismFormulaicAssemblicatorScreen(props: MekanismMachinePresetProps) {
  return <MekanismMachineScreen machine="formulaic-assemblicator" {...props} />;
}
export function MekanismFuelwoodHeaterScreen(props: MekanismMachinePresetProps) {
  return <MekanismMachineScreen machine="fuelwood-heater" {...props} />;
}
export function MekanismIsotopicCentrifugeScreen(props: MekanismMachinePresetProps) {
  return <MekanismMachineScreen machine="isotopic-centrifuge" {...props} />;
}
export function MekanismMetallurgicInfuserScreen(props: MekanismMachinePresetProps) {
  return <MekanismMachineScreen machine="metallurgic-infuser" {...props} />;
}
export function MekanismNutritionalLiquifierScreen(props: MekanismMachinePresetProps) {
  return <MekanismMachineScreen machine="nutritional-liquifier" {...props} />;
}
export function MekanismOsmiumCompressorScreen(props: MekanismMachinePresetProps) {
  return <MekanismMachineScreen machine="osmium-compressor" {...props} />;
}
export function MekanismPaintingMachineScreen(props: MekanismMachinePresetProps) {
  return <MekanismMachineScreen machine="painting-machine" {...props} />;
}
export function MekanismPigmentExtractorScreen(props: MekanismMachinePresetProps) {
  return <MekanismMachineScreen machine="pigment-extractor" {...props} />;
}
export function MekanismPigmentMixerScreen(props: MekanismMachinePresetProps) {
  return <MekanismMachineScreen machine="pigment-mixer" {...props} />;
}
export function MekanismPrecisionSawmillScreen(props: MekanismMachinePresetProps) {
  return <MekanismMachineScreen machine="precision-sawmill" {...props} />;
}
export function MekanismPressurizedReactionChamberScreen(props: MekanismMachinePresetProps) {
  return <MekanismMachineScreen machine="pressurized-reaction-chamber" {...props} />;
}
export function MekanismPurificationChamberScreen(props: MekanismMachinePresetProps) {
  return <MekanismMachineScreen machine="purification-chamber" {...props} />;
}
export function MekanismResistiveHeaterScreen(props: MekanismMachinePresetProps) {
  return <MekanismMachineScreen machine="resistive-heater" {...props} />;
}
export function MekanismRotaryCondensentratorScreen(props: MekanismMachinePresetProps) {
  return <MekanismMachineScreen machine="rotary-condensentrator" {...props} />;
}
export function MekanismSolarNeutronActivatorScreen(props: MekanismMachinePresetProps) {
  return <MekanismMachineScreen machine="solar-neutron-activator" {...props} />;
}
