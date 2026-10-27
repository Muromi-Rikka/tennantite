import { Grid } from "../grid/index";
import { Icon } from "../icon/index";
import { Slot } from "./index";

/**
 * Slot / Grid 预览用例（规格 §5 #2）
*/
export function SlotDemo() {
  return (
    <div className="mc-tex-panel inline-block p-6">
      <Grid columns={4}>
        <Slot selected>
          <Icon name="grass-block" />
        </Slot>
        <Slot />
        <Slot />
        <Slot />
        <Slot />
        <Slot />
        <Slot />
        <Slot />
      </Grid>
    </div>
  );
}
