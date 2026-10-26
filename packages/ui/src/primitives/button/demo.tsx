import { useState } from "react";

import { Button } from "./index";

/**
 * Button 预览用例（规格 §10：story / 示例可运行）
*/
export function ButtonDemo() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col gap-24">
      <div className="flex flex-wrap items-center gap-16">
        <Button onClick={() => setCount(c => c + 1)}>
          默认（已点
          {count}
          {" "}
          次）
        </Button>
        <Button variant="success">Success</Button>
        <Button variant="ghost">Ghost</Button>
        <Button disabled>Disabled</Button>
      </div>
      <div className="flex flex-wrap items-center gap-16">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    </div>
  );
}
