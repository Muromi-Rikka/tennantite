import type { MekanismFactoryScreenProps } from "./index";
import { MekanismFactoryScreen } from "./index";

export interface MekanismFactoryPresetProps extends Omit<MekanismFactoryScreenProps, "factory"> {}

export function MekanismCombiningFactoryScreen(props: MekanismFactoryPresetProps) {
  return <MekanismFactoryScreen factory="combining" {...props} />;
}
export function MekanismCompressingFactoryScreen(props: MekanismFactoryPresetProps) {
  return <MekanismFactoryScreen factory="compressing" {...props} />;
}
export function MekanismCrushingFactoryScreen(props: MekanismFactoryPresetProps) {
  return <MekanismFactoryScreen factory="crushing" {...props} />;
}
export function MekanismEnrichingFactoryScreen(props: MekanismFactoryPresetProps) {
  return <MekanismFactoryScreen factory="enriching" {...props} />;
}
export function MekanismInfusingFactoryScreen(props: MekanismFactoryPresetProps) {
  return <MekanismFactoryScreen factory="infusing" {...props} />;
}
export function MekanismInjectingFactoryScreen(props: MekanismFactoryPresetProps) {
  return <MekanismFactoryScreen factory="injecting" {...props} />;
}
export function MekanismPurifyingFactoryScreen(props: MekanismFactoryPresetProps) {
  return <MekanismFactoryScreen factory="purifying" {...props} />;
}
export function MekanismSawingFactoryScreen(props: MekanismFactoryPresetProps) {
  return <MekanismFactoryScreen factory="sawing" {...props} />;
}
export function MekanismSmeltingFactoryScreen(props: MekanismFactoryPresetProps) {
  return <MekanismFactoryScreen factory="smelting" {...props} />;
}
