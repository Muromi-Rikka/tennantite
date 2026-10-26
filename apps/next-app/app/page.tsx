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

/**
 * SSR / RSC 验证页（规格 §1.1 硬约束）：
 * 本页为 Server Component —— 直接 import 组件包并渲染，
 * 交互组件（Base UI 封装层）经 "use client" 边界水合增强。
 */
const SERVERS = [
  "Hypixel — mc.hypixel.net",
  "Mineplex — mineplex.com",
  "CubeCraft — cubecraft.net",
  "The Hive — hivemc.eu",
] as const;

export default function Home() {
  return (
    <main className="mc-tex-panel mx-auto my-16 w-480 p-24">
      <h1 className="font-pixel text-mc-pixel text-mc-gold mc-text-shadow">
        VERDIGRIS · Next.js SSR
      </h1>

      <section className="mt-16 flex flex-col gap-8">
        <Button variant="success">SSR 渲染的按钮</Button>
        <Input placeholder="SSR 渲染的输入框" />
        <Slider aria-label="SSR 滑条" defaultValue={40} />
        <Checkbox aria-label="SSR 复选框" defaultChecked />
        <Switch aria-label="SSR 开关" />
        <Progress aria-label="SSR 经验条" value={64} />
      </section>

      <section className="mt-16">
        <ScrollArea className="mc-tex-slot h-100 p-8">
          <ul>
            {SERVERS.map(name => (
              <li className="font-readable text-mc" key={name}>
                {name}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </section>

      <section className="mt-16 flex items-center gap-16">
        <Badge>64</Badge>
        <Badge variant="gold">SSR OK</Badge>
      </section>
    </main>
  );
}
