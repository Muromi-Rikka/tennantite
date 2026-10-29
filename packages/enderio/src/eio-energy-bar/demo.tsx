import { gui } from "@tennantite/ui";

import { EioEnergyBar } from "./index";

export function EioEnergyBarDemo() {
  return (
    <div style={{ height: gui(52), position: "relative", width: gui(120) }}>
      <EioEnergyBar height={52} left={0} max={100000} top={0} value={65000} variant="capacitor" width={18} />
      <EioEnergyBar capacitorInstalled={false} height={52} left={24} max={100000} top={0} value={0} variant="capacitor" width={18} />
      <EioEnergyBar height={42} left={54} max={100000} top={0} value={48000} variant="legacy" width={9} />
    </div>
  );
}
