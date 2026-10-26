import { useState } from "react";

import { Slider } from "./index";

/**
 * Slider 预览用例：受控音量滑条
*/
export function SliderDemo() {
  const [volume, setVolume] = useState(70);

  return (
    <div className="flex w-320 flex-col gap-16">
      <label className="flex flex-col gap-8">
        <span className="font-readable text-mc">
          音乐音量：
          {volume}
          %
        </span>
        <Slider
          aria-label="音乐音量"
          onValueChange={(value) => {
            setVolume(Array.isArray(value) ? (value[0] ?? 30) : value);
          }}
          value={volume}
        />
      </label>
      <Slider aria-label="默认值滑条" defaultValue={30} />
    </div>
  );
}
