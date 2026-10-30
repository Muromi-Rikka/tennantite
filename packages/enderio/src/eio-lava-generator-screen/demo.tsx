import { EioLavaGeneratorScreen } from "./index";

/**
 * LavaGenerator 预览。
 */
export function EioLavaGeneratorScreenDemo() {
  return (
    <EioLavaGeneratorScreen
      energy={{ max: 100000, value: 48000 }}
    />
  );
}
