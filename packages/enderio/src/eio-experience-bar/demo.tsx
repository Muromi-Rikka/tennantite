import { gui } from "@tennantite/ui";

import { EioExperienceBar } from "./index";

export function EioExperienceBarDemo() {
  return (
    <div style={{ height: gui(16), position: "relative", width: gui(65) }}>
      <EioExperienceBar left={0} level={30} progress={0.6} top={8} />
    </div>
  );
}
