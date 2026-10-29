import { gui } from "@tennantite/ui";

import { EioGrindingBall } from "./index";

export function EioGrindingBallDemo() {
  return (
    <div style={{ height: gui(16), position: "relative", width: gui(4) }}>
      <EioGrindingBall durability={0.7} left={0} top={0} />
    </div>
  );
}
