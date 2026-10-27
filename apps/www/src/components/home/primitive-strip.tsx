import type { ReactNode } from "react";
import { Badge, Button, Checkbox, Input, Progress, Slider, Switch } from "@verdigris/ui";

export function PrimitiveStrip() {
  return (
    <div className="grid gap-16 sm:grid-cols-2">
      <Labeled label="Button">
        <Button>默认</Button>
        <Button variant="success">主行动</Button>
      </Labeled>
      <Labeled label="Input">
        <Input aria-label="玩家名" placeholder="Steve" />
      </Labeled>
      <Labeled label="Slider">
        <Slider aria-label="音量" defaultValue={60} />
      </Labeled>
      <Labeled label="Switch / Checkbox">
        <Switch aria-label="显示云" defaultChecked />
        <Checkbox aria-label="受击抖动" />
      </Labeled>
      <Labeled label="Progress">
        <Progress aria-label="经验" value={64} />
      </Labeled>
      <Labeled label="Badge">
        <Badge>64</Badge>
        <Badge variant="gold">史诗</Badge>
        <Badge variant="dim">v0.1.0</Badge>
      </Labeled>
    </div>
  );
}

function Labeled({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-site-muted text-xs tracking-wider uppercase">{label}</span>
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </div>
  );
}

export default PrimitiveStrip;
