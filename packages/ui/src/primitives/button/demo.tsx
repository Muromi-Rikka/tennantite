import { useState } from "react";

import { Button } from "./index";

/**
 * Button 预览用例（规格 §10：story / 示例可运行）
*/
export function ButtonDemo() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button onClick={() => setCount(c => c + 1)} className="w-100">
        默认（已点
        {count}
        {" "}
        次）
      </Button>
      <Button variant="success" className="w-100">Success</Button>
      <Button variant="ghost" className="w-60">Ghost</Button>
      <Button disabled className="w-100">Disabled</Button>
    </div>
  );
}
