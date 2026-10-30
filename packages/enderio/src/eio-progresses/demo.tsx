import { EIO_MACHINES } from "../eio-machine-layout";
import { EioProgresses } from "./index";

export function EioProgressesDemo() {
  return (
    <div className="relative h-[80px] w-[176px]">
      <EioProgresses
        label="合金炉进度"
        labels={["合金炉进度 1", "合金炉进度 2"]}
        progresses={EIO_MACHINES.alloySmelter.progresses}
        progress={0.5}
      />
    </div>
  );
}
