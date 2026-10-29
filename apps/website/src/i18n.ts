import type { PixelIconName } from "@tennantite/textures";

export type DocSection = "architecture" | "design" | "distribution" | "start";
export type Locale = "en" | "zh";

export const DEFAULT_LOCALE: Locale = "zh";
export const LOCALES: Locale[] = ["zh", "en"];

export interface FooterColumn {
  links: readonly FooterLink[];
  title: string;
}

export interface FooterLink {
  external?: boolean;
  href: string;
  label: string;
}

export interface UIDictionary {
  blockPage: {
    breadcrumb: string;
    code: string;
    composition: string;
    compositionNote: string;
    fullPreview: string;
    metaDescriptionSuffix: string;
    metaTitleSuffix: string;
    unindexed: string;
  };
  blocksPage: {
    breadcrumb: string;
    description: string;
    groups: {
      menus: { description: string; title: string };
      screens: { description: string; title: string };
    };
    metaTitle: string;
    title: string;
  };
  componentPage: {
    breadcrumb: string;
    codeLabel: string;
    exports: string;
    install: string;
    installNote: string;
    metaDescriptionSuffix: string;
    metaTitleSuffix: string;
    previewLabel: string;
    source: string;
    sourceNote: string;
    tabsLabel: string;
  };
  componentsPage: {
    breadcrumb: string;
    description: string;
    listLabel: string;
    metaTitle: string;
    title: string;
  };
  copied: string;
  copy: string;
  copyFailed: string;
  docsChrome: {
    breadcrumb: string;
    metaSuffix: string;
    mobileNav: string;
    sections: Record<DocSection, string>;
    toc: string;
  };
  footer: {
    assets: string;
    columns: readonly FooterColumn[];
    copyright: string;
    description: string;
    notice: string;
  };
  home: {
    blocks: {
      all: string;
      crafting: string;
      description: string;
      eyebrow: string;
      inventory: string;
      mods: string;
      title: string;
    };
    cta: {
      browse: string;
      description: string;
      install: string;
      title: string;
    };
    features: readonly { body: string; icon: PixelIconName; title: string }[];
    hero: {
      browse: string;
      counts: string;
      description: string;
      headingHighlight: string;
      headingLine1: string;
      headingLine2Prefix: string;
      headingSuffix: string;
      install: string;
      installNote: string;
      previewLabel: string;
      view: string;
    };
    metaDescription: string;
    metaTitle: string;
    primitiveCode: string;
    primitives: {
      all: string;
      description: string;
      eyebrow: string;
      title: string;
    };
  };
  htmlLang: string;
  modsPage: {
    breadcrumb: string;
    common: { description: string; title: string };
    components: { description: string; title: string };
    description: string;
    metaTitle: string;
    mods: Record<"ae2" | "create" | "enderio" | "ic2" | "ie" | "mekanism" | "thermal", { description: string; title: string }>;
    screens: { description: string; title: string };
    title: string;
  };
  nav: {
    blocks: string;
    components: string;
    docs: string;
    github: string;
    mods: string;
  };
  notFound: {
    body: string;
    components: string;
    description: string;
    heading: string;
    home: string;
    title: string;
  };
  ogLocale: string;
  pager: {
    next: string;
    previous: string;
  };
  preview: {
    back: string;
    backMods: string;
    metaSuffix: string;
  };
  search: {
    close: string;
    groups: {
      ae2: string;
      blocks: string;
      components: string;
      create: string;
      docs: string;
      enderio: string;
      ic2: string;
      ie: string;
      mekanism: string;
      mods: string;
      thermal: string;
    };
    label: string;
    noResults: string;
    open: string;
    placeholder: string;
    select: string;
    trigger: string;
  };
  skipToContent: string;
  switchLabel: string;
}

const zh: UIDictionary = {
  blockPage: {
    breadcrumb: "整屏界面",
    code: "代码",
    composition: "组成",
    compositionNote: "这些是可直接组合的组件；Block 只是把它们按原版坐标放在一起。",
    fullPreview: "全屏预览",
    metaDescriptionSuffix: "查看 {name} 的整屏预览、组成与示例源码。",
    metaTitleSuffix: "整屏 · Tennantite",
    unindexed: "预览页不进入搜索引擎索引",
  },
  blocksPage: {
    breadcrumb: "整屏界面",
    description: "{count} 个原版整屏。容器与菜单界面由 L1–L3 组件拼装，数据由使用方注入；Mod 整屏集中在独立区域。",
    groups: {
      menus: { description: "标题、设置、聊天等全屏菜单与遮罩。", title: "菜单界面" },
      screens: { description: "按原版容器坐标拼装的 176–276 GUI px 面板。", title: "容器界面" },
    },
    metaTitle: "整屏界面 · Tennantite",
    title: "整屏界面",
  },
  componentPage: {
    breadcrumb: "Components",
    codeLabel: "代码",
    exports: "导出",
    install: "安装",
    installNote: "仓库内使用 workspace 依赖；npm 尚未发布。",
    metaDescriptionSuffix: "查看 {name} 的实时预览、导出与源码。",
    metaTitleSuffix: "组件 · Tennantite",
    previewLabel: "预览",
    source: "源码",
    sourceNote: "npm 包保留源码目录，可直接复制改造。",
    tabsLabel: "预览与代码",
  },
  componentsPage: {
    breadcrumb: "Components",
    description: "{count} 个原版与通用组件，按层级分组。每个页面提供实时预览与示例源码；Mod 组件集中在独立区域。",
    listLabel: "组件列表",
    metaTitle: "Components 组件 · Tennantite",
    title: "Components",
  },
  copied: "已复制",
  copy: "复制",
  copyFailed: "复制失败",
  docsChrome: {
    breadcrumb: "Docs",
    metaSuffix: "文档 · Tennantite",
    mobileNav: "文档目录",
    sections: {
      architecture: "架构",
      design: "设计系统",
      distribution: "分发",
      start: "开始",
    },
    toc: "本页目录",
  },
  footer: {
    assets: "GUI 纹理取自原版 26.4-snapshot-3 · 物品/状态图标取自原版 26.3 · 字体 SIL OFL 1.1",
    columns: [
      {
        links: [
          { href: "/docs/", label: "介绍" },
          { href: "/docs/installation/", label: "安装" },
          { href: "/docs/tokens/", label: "设计令牌" },
          { href: "/docs/textures/", label: "纹理" },
          { href: "/docs/theming/", label: "主题" },
        ],
        title: "文档",
      },
      {
        links: [
          { href: "/components/", label: "Components" },
          { href: "/blocks/", label: "整屏界面" },
          { href: "/mods/", label: "Mod 界面" },
          { href: "/components/#primitives", label: "原语" },
          { href: "/components/#containers", label: "容器" },
          { href: "/components/#hud", label: "HUD" },
        ],
        title: "组件",
      },
      {
        links: [
          { href: "/docs/ssr/", label: "SSR / RSC" },
          { href: "/docs/accessibility/", label: "可访问性" },
          { href: "/docs/registry/", label: "Registry" },
          { external: true, href: "https://github.com/Muromi-Rikka/verdigris", label: "GitHub" },
        ],
        title: "资源",
      },
    ],
    copyright: "© 2026 Tennantite",
    description: "按 shadcn 哲学分发的 Minecraft 风格 React 组件库。",
    notice: "非 Mojang 官方产品。",
  },
  home: {
    blocks: {
      all: "全部 {count} 个原版整屏",
      crafting: "工作台 · 容器界面",
      description: "24 个容器界面 + 9 个 Mod 机器界面 + 3 个菜单/覆盖层。每个整屏界面都是可运行示例，也可以拆回组件自行组合。",
      eyebrow: "L3 · 整屏界面",
      inventory: "物品栏 · 容器界面",
      mods: "Mod 界面（{count}）",
      title: "整屏界面，复制即用",
    },
    cta: {
      browse: "浏览整屏界面",
      description: "从安装开始，或者先浏览一个完整的容器界面。所有纹理、图标与字体都可替换。",
      install: "开始安装",
      title: "复制、粘贴、改造。",
    },
    features: [
      { body: "每个组件都是独立目录，改哪行由你决定。", icon: "stone-block", title: "源码可复制" },
      { body: "颜色、字体、间距、阴影都在 @theme；覆盖变量即可换肤。", icon: "diamond", title: "令牌驱动" },
      { body: "Next.js App Router 与 TanStack Start 双框架验证，服务端不触达浏览器 API。", icon: "heart", title: "SSR 就绪" },
      { body: "按原版 GUI 坐标采样：1 GUI px = 2 CSS px，九宫格纹理无模糊缩放。", icon: "experience-bottle", title: "像素级还原" },
    ],
    hero: {
      browse: "浏览组件",
      counts: "{components} 个组件 · {blocks} 个整屏界面",
      description: "按 shadcn 哲学分发的像素级 GUI 组件：复制源码、注入数据、双框架 SSR 验证。GUI 精灵取自原版 26.4-snapshot-3，物品与状态图标取自 26.3。",
      headingHighlight: "搬进 React",
      headingLine1: "把 Minecraft 的",
      headingLine2Prefix: "界面，",
      headingSuffix: "。",
      install: "开始安装",
      installNote: "v0.1.0 预览：npm 尚未发布，仓库内使用 workspace 依赖。",
      previewLabel: "菜单界面 · MainMenu",
      view: "查看 →",
    },
    metaDescription: "71 个可复制的 Minecraft 风格 React 组件与 37 个整屏界面。基于 Base UI 与 Tailwind v4，SSR 安全；GUI 精灵取自原版 26.4-snapshot-3。",
    metaTitle: "Tennantite · Minecraft 风格 React 组件库",
    primitiveCode: `import { Button, Panel } from "@tennantite/ui";

export function Start() {
  return (
    <Panel className="p-12">
      <Button variant="success">开始游戏</Button>
    </Panel>
  );
}`,
    primitives: {
      all: "全部 {count} 个核心组件",
      description: "原语只依赖 Base UI 与令牌。它们不读取游戏状态，也没有隐藏的全局样式；复制单个组件不会拖进整座框架。",
      eyebrow: "L1 · Primitives",
      title: "从一行 import 开始",
    },
  },
  htmlLang: "zh-CN",
  modsPage: {
    breadcrumb: "Mod",
    common: {
      description: "Mekanism、IC2、AE2 共用的进度条、按钮、槽位网格等通用子件。",
      title: "跨 mod 通用",
    },
    components: {
      description: "各 mod 可复制的组件级部件，按 mod 维度归档。",
      title: "组件",
    },
    description: "Mekanism、IC2、AE2、Create、Thermal Expansion、Immersive Engineering 与 Ender IO 的整屏界面与组件：全部使用上游原始 GUI 贴图（固定版本 + 校验），数据注入、无游戏逻辑。",
    metaTitle: "Mod 界面 · Tennantite",
    mods: {
      ae2: {
        description: "应用能源 2 界面（原版 GUI 贴图切片）：ME 终端、合成终端、压印器、ME 驱动器与 ME 箱子。",
        title: "应用能源 2",
      },
      create: {
        description: "Create（机械动力）界面（1.21.1 原版图集）：磨石 / 粉碎机、过滤器、工具箱、蓝图桌与数值配置面板。",
        title: "Create",
      },
      enderio: {
        description: "Ender IO（末影接口）界面（26.3 原版贴图）：合金炉、SAG 磨粉机、斯特林发电机、灵魂绑定器与电容组。",
        title: "Ender IO",
      },
      ic2: {
        description: "工业时代 2 界面（1.12.2 原始 GUI 贴图）：磨矿机、电炉、提取机、压缩机、储电箱与 EU 能量表。",
        title: "工业时代 2",
      },
      ie: {
        description: "Immersive Engineering（沉浸工程）界面（1.21.1 原版贴图）：焦炉、金属压机、电弧炉与高压电容。",
        title: "Immersive Engineering",
      },
      mekanism: {
        description: "Mekanism 26.3 界面（手绘复刻贴图）：26 台机器共用布局表，另有储罐、能量立方、感应矩阵与全套窗口部件。",
        title: "Mekanism",
      },
      thermal: {
        description: "Thermal Expansion（热力膨胀）界面（1.20.x 原版贴图）：红石炉、储能仓与物品缓存仓。",
        title: "Thermal Expansion",
      },
    },
    screens: {
      description: "按游戏内屏幕定义复刻尺寸与槽位坐标。",
      title: "整屏界面",
    },
    title: "Mod 界面",
  },
  nav: {
    blocks: "整屏界面",
    components: "组件",
    docs: "文档",
    github: "GitHub",
    mods: "Mod",
  },
  notFound: {
    body: "这个坐标没有生成地形。可以回到首页，或直接浏览组件。",
    components: "浏览组件",
    description: "这个页面不存在。",
    heading: "区块未找到",
    home: "返回首页",
    title: "区块未找到 · Tennantite",
  },
  ogLocale: "zh_CN",
  pager: { next: "下一页", previous: "上一页" },
  preview: {
    back: "← 返回整屏界面",
    backMods: "← 返回 Mod 界面",
    metaSuffix: "预览 · Tennantite",
  },
  search: {
    close: "Esc 关闭",
    groups: { ae2: "AE2", blocks: "整屏界面", components: "组件", create: "Create", docs: "文档", enderio: "Ender IO", ic2: "IC2", ie: "IE", mekanism: "Mekanism", mods: "Mod", thermal: "Thermal" },
    label: "搜索文档",
    noResults: "没有匹配结果",
    open: "Enter 打开",
    placeholder: "搜索文档、组件、整屏界面…",
    select: "↑↓ 选择",
    trigger: "搜索文档…",
  },
  skipToContent: "跳到主要内容",
  switchLabel: "EN",
};

const en: UIDictionary = {
  blockPage: {
    breadcrumb: "Blocks",
    code: "Code",
    composition: "Composition",
    compositionNote: "These are the composable components; the Block only places them at vanilla coordinates.",
    fullPreview: "Full-screen preview",
    metaDescriptionSuffix: "See the full-screen preview, composition and example source for {name}.",
    metaTitleSuffix: "Block · Tennantite",
    unindexed: "Preview pages are excluded from search indexes",
  },
  blocksPage: {
    breadcrumb: "Blocks",
    description: "{count} vanilla full-screen interfaces. Container and menu screens are assembled from L1–L3 components and accept injected data; mod screens live in their own area.",
    groups: {
      menus: { description: "Full-screen menus and overlays for title, settings, chat and more.", title: "Menu screens" },
      screens: { description: "176–276 GUI px panels laid out with vanilla container coordinates.", title: "Container screens" },
    },
    metaTitle: "Blocks · Tennantite",
    title: "Blocks",
  },
  componentPage: {
    breadcrumb: "Components",
    codeLabel: "Code",
    exports: "Exports",
    install: "Install",
    installNote: "Use a workspace dependency in this repo; npm is not published yet.",
    metaDescriptionSuffix: "See the live preview, exports and source for {name}.",
    metaTitleSuffix: "component · Tennantite",
    previewLabel: "Preview",
    source: "Source",
    sourceNote: "The npm package keeps the source tree, so you can copy and adapt it directly.",
    tabsLabel: "Preview and code",
  },
  componentsPage: {
    breadcrumb: "Components",
    description: "{count} vanilla and shared components grouped by layer. Every page includes a live preview and example source; mod components have their own area.",
    listLabel: "Component list",
    metaTitle: "Components · Tennantite",
    title: "Components",
  },
  copied: "Copied",
  copy: "Copy",
  copyFailed: "Copy failed",
  docsChrome: {
    breadcrumb: "Docs",
    metaSuffix: "Docs · Tennantite",
    mobileNav: "Documentation",
    sections: {
      architecture: "Architecture",
      design: "Design system",
      distribution: "Distribution",
      start: "Start",
    },
    toc: "On this page",
  },
  footer: {
    assets: "Redrawn GUI textures · vanilla 26.3 item/status icons · SIL OFL 1.1 font",
    columns: [
      {
        links: [
          { href: "/en/docs/", label: "Introduction" },
          { href: "/en/docs/installation/", label: "Installation" },
          { href: "/en/docs/tokens/", label: "Design tokens" },
          { href: "/en/docs/textures/", label: "Textures" },
          { href: "/en/docs/theming/", label: "Theming" },
        ],
        title: "Docs",
      },
      {
        links: [
          { href: "/en/components/", label: "Components" },
          { href: "/en/blocks/", label: "Blocks" },
          { href: "/en/mods/", label: "Mod screens" },
          { href: "/en/components/#primitives", label: "Primitives" },
          { href: "/en/components/#containers", label: "Containers" },
          { href: "/en/components/#hud", label: "HUD" },
        ],
        title: "Components",
      },
      {
        links: [
          { href: "/en/docs/ssr/", label: "SSR / RSC" },
          { href: "/en/docs/accessibility/", label: "Accessibility" },
          { href: "/en/docs/registry/", label: "Registry" },
          { external: true, href: "https://github.com/Muromi-Rikka/verdigris", label: "GitHub" },
        ],
        title: "Resources",
      },
    ],
    copyright: "© 2026 Tennantite",
    description: "A Minecraft-style React component library distributed with shadcn philosophy.",
    notice: "Not an official Mojang product.",
  },
  home: {
    blocks: {
      all: "All {count} vanilla screens",
      crafting: "Crafting table · Container screen",
      description: "24 container screens, 9 mod machine screens and 3 menu screens. Every Block runs as-is, or you can take it apart and compose the pieces yourself.",
      eyebrow: "L3 · Blocks",
      inventory: "Inventory · Container screen",
      mods: "Mod screens ({count})",
      title: "Full screens, ready to copy",
    },
    cta: {
      browse: "Browse Blocks",
      description: "Start with installation, or open a complete container screen first. Every texture, icon and font can be replaced.",
      install: "Get started",
      title: "Copy. Paste. Make it yours.",
    },
    features: [
      { body: "Every component is its own directory. Change whatever line you need.", icon: "stone-block", title: "Source you can own" },
      { body: "Colors, type, spacing and shadows live in @theme. Override variables to reskin.", icon: "diamond", title: "Token-driven" },
      { body: "Verified with Next.js App Router and TanStack Start; no browser APIs during render.", icon: "heart", title: "SSR ready" },
      { body: "Sampled from vanilla GUI coordinates: 1 GUI px = 2 CSS px, nine-slice textures stay crisp.", icon: "experience-bottle", title: "Pixel-accurate" },
    ],
    hero: {
      browse: "Browse components",
      counts: "{components} components · {blocks} full screens",
      description: "Pixel-accurate GUI components distributed the shadcn way: copy the source, inject data, verify under two SSR frameworks. GUI nine-slices are redrawn; item and status icons come from vanilla Minecraft 26.3 assets.",
      headingHighlight: "React",
      headingLine1: "Bring Minecraft's",
      headingLine2Prefix: "interface into ",
      headingSuffix: ".",
      install: "Get started",
      installNote: "v0.1.0 preview: not on npm yet; use a workspace dependency in this repo.",
      previewLabel: "Menu · MainMenu",
      view: "View →",
    },
    metaDescription: "71 copy-ready Minecraft-style React components and 37 full-screen interfaces. Base UI + Tailwind v4, SSR-safe; GUI textures redrawn, item icons from vanilla 26.3.",
    metaTitle: "Tennantite · Minecraft-style React components",
    primitiveCode: `import { Button, Panel } from "@tennantite/ui";

export function Start() {
  return (
    <Panel className="p-12">
      <Button variant="success">Start game</Button>
    </Panel>
  );
}`,
    primitives: {
      all: "All {count} core components",
      description: "Primitives depend only on Base UI and tokens. They read no game state and hide no global styles; copying one component does not drag in the whole framework.",
      eyebrow: "L1 · Primitives",
      title: "Start with one import",
    },
  },
  htmlLang: "en",
  modsPage: {
    breadcrumb: "Mods",
    common: {
      description: "Progress bars, buttons, slot grids and other primitives shared across mods.",
      title: "Cross-mod shared",
    },
    components: {
      description: "Copy-ready component-level parts, archived per mod.",
      title: "Components",
    },
    description: "Full-screen interfaces and components for Mekanism, IndustrialCraft 2, Applied Energistics 2, Create, Thermal Expansion, Immersive Engineering and Ender IO — all from the original upstream GUI textures (pinned versions, verified); data-injected, no game logic.",
    metaTitle: "Mod screens · Tennantite",
    mods: {
      ae2: {
        description: "Applied Energistics 2 screens (slices of the original GUI textures): ME terminal, crafting terminal, inscriber, ME drive and ME chest.",
        title: "Applied Energistics 2",
      },
      create: {
        description: "Create screens (1.21.1 original atlases): millstone / crusher, filter, toolbox, schematic table and value settings panel.",
        title: "Create",
      },
      enderio: {
        description: "Ender IO screens (26.3 original textures): alloy smelter, SAG mill, Stirling generator, soul binder and capacitor bank.",
        title: "Ender IO",
      },
      ic2: {
        description: "IndustrialCraft 2 screens (original 1.12.2 GUI textures): macerator, electric furnace, extractor, compressor, batbox and the EU energy gauge.",
        title: "IndustrialCraft 2",
      },
      ie: {
        description: "Immersive Engineering screens (1.21.1 original textures): coke oven, metal press, arc furnace and HV capacitor.",
        title: "Immersive Engineering",
      },
      mekanism: {
        description: "Mekanism 26.3 screens (hand-drawn textures): 26 machines share one layout table, plus tanks, energy cubes, the induction matrix and the full window kit.",
        title: "Mekanism",
      },
      thermal: {
        description: "Thermal Expansion screens (1.20.x original textures): redstone furnace, energy cell and item cache.",
        title: "Thermal Expansion",
      },
    },
    screens: {
      description: "Screen dimensions and slot coordinates matched to the in-game screens.",
      title: "Full screens",
    },
    title: "Mod screens",
  },
  nav: {
    blocks: "Blocks",
    components: "Components",
    docs: "Docs",
    github: "GitHub",
    mods: "Mods",
  },
  notFound: {
    body: "No terrain generated at these coordinates. Go home or browse the components.",
    components: "Browse components",
    description: "This page does not exist.",
    heading: "Page not found",
    home: "Go home",
    title: "Page not found · Tennantite",
  },
  ogLocale: "en_US",
  pager: { next: "Next", previous: "Previous" },
  preview: {
    back: "← Back to Blocks",
    backMods: "← Back to mod screens",
    metaSuffix: "Preview · Tennantite",
  },
  search: {
    close: "Esc close",
    groups: { ae2: "AE2", blocks: "Blocks", components: "Components", create: "Create", docs: "Docs", enderio: "Ender IO", ic2: "IC2", ie: "IE", mekanism: "Mekanism", mods: "Mods", thermal: "Thermal" },
    label: "Search documentation",
    noResults: "No results",
    open: "Enter open",
    placeholder: "Search docs, components, Blocks…",
    select: "↑↓ select",
    trigger: "Search docs…",
  },
  skipToContent: "Skip to content",
  switchLabel: "中文",
};

export const ui: Record<Locale, UIDictionary> = { en, zh };

export function fill(template: string, values: Record<string, number | string>): string {
  return template.replaceAll(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}

export function localeHref(locale: Locale, path: string): string {
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  if (locale === "zh") {
    return withSlash;
  }
  return withSlash === "/" ? "/en/" : `/en${withSlash}`;
}

export function stripLocalePrefix(pathname: string): string {
  if (pathname === "/en" || pathname === "/en/") {
    return "/";
  }
  return pathname.startsWith("/en/") ? pathname.slice(3) : pathname;
}

export function switchLocalePath(pathname: string, locale: Locale): string {
  return localeHref(locale, stripLocalePrefix(pathname));
}
