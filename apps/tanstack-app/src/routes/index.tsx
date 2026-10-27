import { createFileRoute } from "@tanstack/react-router";
import {
  Badge,
  Button,
  Checkbox,
  Input,
  Progress,
  ScrollArea,
  Slider,
  Switch,
} from "@verdigris/ui";

const SERVERS = [
  "Hypixel — mc.hypixel.net",
  "Mineplex — mineplex.com",
  "CubeCraft — cubecraft.net",
  "The Hive — hivemc.eu",
] as const;

// eslint-disable-next-line react-refresh/only-export-components -- TanStack Router 要求 Route 与页面组件同文件注册。
function App() {
  return (
    <main className="mc-tex-panel mx-auto my-8 w-240 p-12">
      <h1 className="font-mc mc-text text-mc-gold mc-text-shadow">
        VERDIGRIS · TanStack Start SSR
      </h1>

      <section className="mt-8 flex flex-col gap-4">
        <Button variant="success">SSR 渲染的按钮</Button>
        <Input placeholder="SSR 渲染的输入框" />
        <Slider aria-label="SSR 滑条" defaultValue={40} />
        <Checkbox aria-label="SSR 复选框" defaultChecked />
        <Switch aria-label="SSR 开关" />
        <Progress aria-label="SSR 经验条" value={64} />
      </section>

      <section className="mt-8">
        <ScrollArea className="mc-tex-slot h-50 p-4">
          <ul>
            {SERVERS.map(name => (
              <li className="font-mc mc-text" key={name}>
                {name}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </section>

      <section className="mt-8 flex items-center gap-8">
        <Badge>64</Badge>
        <Badge variant="gold">SSR OK</Badge>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/")({
  component: App,
});
