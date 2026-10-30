import { EioCombustionGeneratorScreen } from "./index";

/**
 * CombustionGenerator 预览。
 */
export function EioCombustionGeneratorScreenDemo() {
  return (
    <EioCombustionGeneratorScreen
      energy={{ max: 100000, value: 48000 }}
    />
  );
}
