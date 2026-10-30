import { IE_MACHINES } from "../ie-machine-layout";
import { IeFluidTank } from "./index";

const layout = IE_MACHINES.cokeOven;

/**
 * IeFluidTank 预览用例：焦炉木焦油罐 3600 / 8000，20×51 overlay 居中叠加。
 */
export function IeFluidTankDemo() {
  return (
    <div className="relative size-24">
      <IeFluidTank
        height={layout.tank.fill.height}
        label="木焦油罐"
        left={10}
        max={8000}
        overlayName={layout.tank.overlayName}
        tint="#6e5530"
        top={10}
        value={3600}
        width={layout.tank.fill.width}
      />
    </div>
  );
}
