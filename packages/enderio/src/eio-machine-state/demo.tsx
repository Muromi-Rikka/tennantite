import { gui } from "@tennantite/ui";

import { EioMachineState } from "./index";

export function EioMachineStateDemo() {
  return (
    <div style={{ height: gui(16), position: "relative", width: gui(72) }}>
      <EioMachineState left={0} state="active" top={0} />
      <EioMachineState left={18} state="idle" top={0} />
      <EioMachineState left={36} state="disabled" top={0} />
      <EioMachineState left={54} state="error" top={0} />
    </div>
  );
}
