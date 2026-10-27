type JsonLd = Record<string, unknown>;

const DESCRIPTION = "Minecraft 风格 React UI 组件库：48 个组件、19 个整屏界面；源码可复制，数据可注入，SSR 安全。";

export function breadcrumb({ items, site }: { items: { label: string; path?: string }[]; site: URL }): JsonLd {
  return {
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "name": item.label,
      "position": index + 1,
      ...(item.path && { item: new URL(item.path, site).href }),
    })),
  };
}

export function softwareApplication(site: URL): JsonLd {
  return {
    "@type": "SoftwareApplication",
    "applicationCategory": "DeveloperApplication",
    "description": DESCRIPTION,
    "name": "Verdigris",
    "operatingSystem": "Web",
    "softwareVersion": "0.1.0",
    "url": new URL("/", site).href,
  };
}

export function techArticle({ description, path, site, title }: { description: string; path: string; site: URL; title: string }): JsonLd {
  return {
    "@type": "TechArticle",
    description,
    "headline": title,
    "inLanguage": "zh-CN",
    "isPartOf": { "@id": `${site.origin}/#website` },
    "url": new URL(path, site).href,
  };
}

export function website(site: URL): JsonLd {
  return {
    "@id": `${site.origin}/#website`,
    "@type": "WebSite",
    "description": DESCRIPTION,
    "inLanguage": "zh-CN",
    "name": "Verdigris",
    "url": new URL("/", site).href,
  };
}
