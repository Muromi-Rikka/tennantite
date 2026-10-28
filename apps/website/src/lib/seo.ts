import type { Locale } from "../i18n";
import { localeHref, ui } from "../i18n";

type JsonLd = Record<string, unknown>;

const DESCRIPTION: Record<Locale, string> = {
  en: "A Minecraft-style React UI library: 70 components and 36 full-screen interfaces; copy the source, inject data, stay SSR-safe.",
  zh: "Minecraft 风格 React UI 组件库：70 个组件、36 个整屏界面；源码可复制，数据可注入，SSR 安全。",
};

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

export function softwareApplication(site: URL, locale: Locale): JsonLd {
  return {
    "@type": "SoftwareApplication",
    "applicationCategory": "DeveloperApplication",
    "description": DESCRIPTION[locale],
    "name": "Verdigris",
    "operatingSystem": "Web",
    "softwareVersion": "0.1.0",
    "url": new URL(localeHref(locale, "/"), site).href,
  };
}

export function techArticle({
  description,
  locale,
  path,
  site,
  title,
}: {
  description: string;
  locale: Locale;
  path: string;
  site: URL;
  title: string;
}): JsonLd {
  return {
    "@type": "TechArticle",
    description,
    "headline": title,
    "inLanguage": ui[locale].htmlLang,
    "isPartOf": { "@id": `${site.origin}/#website` },
    "url": new URL(path, site).href,
  };
}

export function website(site: URL, locale: Locale): JsonLd {
  return {
    "@id": `${site.origin}/#website`,
    "@type": "WebSite",
    "description": DESCRIPTION[locale],
    "inLanguage": ui[locale].htmlLang,
    "name": "Verdigris",
    "url": new URL(localeHref(locale, "/"), site).href,
  };
}
