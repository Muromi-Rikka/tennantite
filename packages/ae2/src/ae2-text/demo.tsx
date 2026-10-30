import { Ae2Text } from "./index";

export function Ae2TextDemo() {
  return (
    <div className="relative h-16 w-48">
      <Ae2Text left={8} top={8}>默认 5.4px</Ae2Text>
      <Ae2Text left={8} size={7} top={24}>7px 小字</Ae2Text>
    </div>
  );
}
