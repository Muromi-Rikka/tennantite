import { IeSpriteButton } from "./index";

export function IeSpriteButtonDemo() {
  return (
    <div className="relative size-16">
      <IeSpriteButton
        label="两态按钮"
        left={0}
        name="sprites/arc_furnace/distribute"
        nameOn="sprites/arc_furnace/distribute_hover"
        pressed
        top={0}
      />
      <IeSpriteButton
        hoverName="sprites/arc_furnace/distribute_hover"
        label="悬停按钮"
        left={24}
        name="sprites/arc_furnace/distribute"
        top={0}
      />
    </div>
  );
}
