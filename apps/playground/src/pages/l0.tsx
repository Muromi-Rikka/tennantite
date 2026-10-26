import { pixelIcons } from "@verdigris/textures";
import { mcColors } from "@verdigris/tokens";

/**
 * L0 出口验收：令牌、字体、纹理、图标在 playground 正确渲染（规格 §9 M0）
*/
export function L0Page() {
  return (
    <div>
      <h1 className="mb-24 font-pixel text-mc-lg text-white mc-text-shadow">
        L0 · Design Tokens &amp; Textures
      </h1>

      <Section title="Color Palette (§3.1)">
        <div className="grid grid-cols-2 gap-x-32 gap-y-8">
          {Object.entries(mcColors).map(([name, value]) => (
            <Swatch key={name} name={`mc-${name}`} value={value} />
          ))}
        </div>
      </Section>

      <Section title="Pixel Fonts (OFL)">
        <div className="flex flex-col gap-16">
          <div>
            <div className="font-pixel text-mc-pixel">Press Start 2P — ABC 0123</div>
            <div className="text-mc-text-dim">--font-pixel · 8px native</div>
          </div>
          <div>
            <div className="font-readable text-mc-lg">VT323 — The quick brown fox 0123</div>
            <div className="text-mc-text-dim">--font-readable · 16px base</div>
          </div>
        </div>
      </Section>

      <Section title="Nine-slice Textures">
        <div className="flex flex-wrap items-center gap-24">
          <div className="mc-tex-btn px-16 py-8 font-readable text-mc">Button</div>
          <div className="mc-tex-btn--hover px-16 py-8 font-readable text-mc">Hover</div>
          <div className="mc-tex-btn--active px-16 py-8 font-readable text-mc">Active</div>
          <div className="mc-tex-btn--disabled px-16 py-8 font-readable text-mc text-mc-text-dim">
            Disabled
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-start gap-24">
          <div className="mc-tex-panel p-16" style={{ width: 240 }}>
            Panel（窗口）
          </div>
          <div
            className="mc-tex-panel-dark p-16 text-white"
            style={{ background: "linear-gradient(135deg,#5b3, #357)", width: 240 }}
          >
            Panel dark（半透明，观察底色透出）
          </div>
        </div>
        <div className="mt-16 flex items-center gap-24">
          <div className="mc-tex-slider-track" style={{ height: 8, width: 200 }} />
          <div className="mc-tex-slider-thumb" style={{ height: 24, width: 16 }} />
        </div>
      </Section>

      <Section title="Slot Bevel">
        <div className="flex gap-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div className="mc-tex-slot size-48" key={index} />
          ))}
        </div>
      </Section>

      <Section title="Hard Shadows (tokens)">
        <div className="flex gap-24">
          <div className="size-48 bg-mc-stone shadow-mc-1" />
          <div className="size-48 bg-mc-stone shadow-mc-2" />
          <div className="size-48 bg-mc-stone shadow-mc-raised" />
          <div className="size-48 bg-mc-stone-darker shadow-mc-sunken" />
        </div>
      </Section>

      <Section title="Pixel Icon Set (starter)">
        <div className="flex flex-wrap gap-24">
          {Object.entries(pixelIcons).map(([name, svg]) => (
            <div className="flex flex-col items-center gap-4" key={name}>
              <div
                className="size-64 pixelated"
                // eslint-disable-next-line react/dom-no-dangerously-set-innerhtml -- 静态内置 SVG 精灵
                dangerouslySetInnerHTML={{ __html: svg }}
              />
              <span className="text-mc-text-dim">{name}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <section className="mb-32">
      <h2 className="mb-12 font-pixel text-mc-pixel text-mc-gold mc-text-shadow">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex items-center gap-8">
      <div
        className="size-32 border border-black"
        style={{ backgroundColor: value }}
      />
      <div>
        <div className="font-readable text-mc">{name}</div>
        <div className="font-readable text-mc text-mc-text-dim">{value}</div>
      </div>
    </div>
  );
}
