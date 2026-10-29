import { gui } from "@tennantite/ui";

import { EioIconButton } from "./index";

export function EioIconButtonDemo() {
  return (
    <div style={{ height: gui(40), position: "relative", width: gui(40) }}>
      <EioIconButton
        icon="sprites/buttons/io_config"
        label="IO 配置"
        left={12}
        onClick={() => {}}
        top={12}
      />
    </div>
  );
}
