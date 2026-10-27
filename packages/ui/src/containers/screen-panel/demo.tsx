import { gui } from "../../lib/utils";
import { Slot } from "../slot/index";
import { ScreenPanel } from "./index";

export function ScreenPanelDemo() {
  return (
    <ScreenPanel height={166} title="容器面板" width={176}>
      <p
        className="absolute font-mc mc-text"
        style={{ left: gui(8), top: gui(24) }}
      >
        176×166 GUI px
      </p>
      <Slot className="absolute" style={{ left: gui(8), top: gui(40) }} />
      <Slot
        className="absolute"
        selected
        style={{ left: gui(26), top: gui(40) }}
      />
    </ScreenPanel>
  );
}
