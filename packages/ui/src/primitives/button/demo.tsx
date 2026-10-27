import { useState } from "react";

import { Button } from "./index";

/**
 * Button 预览用例（规格 §10：story / 示例可运行）
*/
export function ButtonDemo() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button className="w-100" onClick={() => setCount(c => c + 1)}>
        默认（已点
        {count}
        {" "}
        次）
      </Button>
      <Button className="w-100" variant="success">Success</Button>
      <Button className="w-60" variant="ghost">Ghost</Button>
      <Button className="w-100" disabled>Disabled</Button>
    </div>
  );
}
