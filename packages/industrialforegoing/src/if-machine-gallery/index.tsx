import { IF_MACHINE_KEYS, IF_MACHINES } from "../if-machine-layout";
import { IfMachineScreen } from "../if-machine-screen/index";

export interface IfMachineGalleryProps {
  className?: string;
}

/**
 * 全部 48 台机器布局画廊（1× GUI 比例）。
 */
export function IfMachineGallery({ className }: IfMachineGalleryProps) {
  return (
    <div className={className} data-if-gallery="">
      {IF_MACHINE_KEYS.map((key) => {
        const spec = IF_MACHINES[key];
        return (
          <div className="flex flex-col gap-2" key={key}>
            <IfMachineScreen machine={key} />
            <div className="text-center font-mc mc-text" style={{ fontSize: "0.75rem" }}>
              <div>{spec.title}</div>
              <div className="opacity-60">{spec.block}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
