import { EIO_MACHINES } from "../eio-machine-layout";
import { EioMachineScreen } from "./index";

export function EioMachineScreenDemo() {
  const layout = EIO_MACHINES.stirlingGenerator;
  return (
    <EioMachineScreen
      background={layout.background}
      backgroundHeight={layout.backgroundHeight}
      height={layout.height}
      machine="stirlingGenerator"
      player={layout.player}
      width={layout.width}
    />
  );
}
