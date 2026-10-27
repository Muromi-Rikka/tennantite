import { Icon } from "../icon/index";
import { Slot } from "../slot/index";
import { Grid } from "./index";

export function GridDemo() {
  return (
    <div className="mc-tex-panel inline-block p-6">
      <Grid columns={9}>
        {Array.from({ length: 27 }, (_, index) => (
          <Slot key={index} selected={index === 4}>
            {index === 4 ? <Icon name="diamond" /> : null}
          </Slot>
        ))}
      </Grid>
    </div>
  );
}
