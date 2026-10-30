import { iconNames } from "@tennantite/textures";
import { mcColors } from "@tennantite/tokens";
import { Icon } from "@tennantite/ui";

/**
 * L0 出口验收：令牌、字体、纹理、图标在 playground 正确渲染（规格 §9 M0）
*/
export function L0Page() {
  return (
    <div>
      <h1 className="mb-12 font-mc mc-text text-white mc-text-shadow">
        L0 · Design Tokens &amp; Textures
      </h1>

      <Section title="Color Palette (Minecraft 26.3)">
        <div className="grid grid-cols-2 gap-x-16 gap-y-4">
          {Object.entries(mcColors).map(([name, value]) => (
            <Swatch key={name} name={`mc-${name}`} value={value} />
          ))}
        </div>
      </Section>

      <Section title="Minecraft Font (OFL)">
        <div className="flex flex-col gap-4">
          <div className="font-mc mc-text">Minecraft — The quick brown fox 0123</div>
          <div className="font-mc mc-text font-bold">Minecraft Bold — The quick brown fox 0123</div>
          <div className="font-mc mc-text text-mc-text-dim">
            --font-mc · 9 GUI px 字号 / 9 GUI px 行高 · 中文回退无衬线
          </div>
        </div>
      </Section>

      <Section title="Nine-slice Textures">
        <div className="flex flex-wrap items-center gap-12">
          <div className="mc-tex-btn px-4 font-mc mc-text">Button</div>
          <div className="mc-tex-btn mc-tex-btn--hover px-4 font-mc mc-text">Hover</div>
          <div className="mc-tex-btn px-4 font-mc mc-text text-mc-text-dim">
            <span aria-hidden="true">Disabled</span>
          </div>
          <div className="mc-tex-btn mc-tex-btn--disabled px-4 font-mc mc-text text-mc-text-dim">
            Disabled
          </div>
          <div className="mc-tex-btn-success px-4 font-mc mc-text">Success</div>
        </div>
        <div className="mt-8 flex flex-wrap items-start gap-12">
          <div className="mc-tex-panel w-120 p-6">Panel（窗口，四角切角）</div>
          <div className="mc-tex-panel-dark w-120 bg-linear-to-br from-[#5b3] to-[#357] p-6 text-white">
            Panel dark（半透明，观察底色透出）
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-12">
          <div className="mc-tex-slot size-18" />
          <div className="mc-tex-slot size-26" />
          <div className="mc-tex-text-field h-20 w-100 px-4 font-mc mc-text">Text field</div>
          <div className="mc-tex-checkbox size-20" />
          <div className="mc-tex-tab h-24 px-4 font-mc mc-text">Tab</div>
        </div>
        <div className="mt-8 flex flex-wrap items-end gap-12">
          <div className="mc-tex-hotbar h-22 w-182" />
          <div className="mc-tex-hotbar relative h-22 w-182">
            <div className="mc-tex-hotbar-selection absolute" style={{ left: 0, top: 0 }} />
          </div>
          <div className="mc-tex-xp-bg h-5 w-182">
            <div className="mc-tex-xp-fill h-full w-1/2" />
          </div>
          <div className="mc-tex-tooltip p-4 font-mc mc-text mc-text-shadow">
            Tooltip
          </div>
        </div>
      </Section>

      <Section title="Slot Bevel">
        <div className="flex gap-2">
          {Array.from({ length: 4 }, (_, index) => (
            <div className="mc-tex-slot size-18" key={index} />
          ))}
        </div>
      </Section>

      <Section title="Hard Shadows (tokens)">
        <div className="flex gap-12">
          <div className="size-24 bg-mc-stone shadow-mc-1" />
          <div className="size-24 bg-mc-stone shadow-mc-2" />
          <div className="size-24 bg-mc-stone shadow-mc-raised" />
          <div className="size-24 bg-mc-stone-darker shadow-mc-sunken" />
        </div>
      </Section>

      <Section title="Pixel Icon Set (starter)">
        <div className="flex flex-wrap gap-12">
          {iconNames.map(name => (
            <div className="flex flex-col items-center gap-2" key={name}>
              <Icon name={name} size={32} />
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
    <section className="mb-16">
      <h2 className="mb-6 font-mc mc-text text-mc-gold mc-text-shadow">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="size-16 border-(length:--mc-gui) border-black"
        style={{ backgroundColor: value }}
      />
      <div>
        <div className="font-mc mc-text">{name}</div>
        <div className="font-mc mc-text text-mc-text-dim">{value}</div>
      </div>
    </div>
  );
}
