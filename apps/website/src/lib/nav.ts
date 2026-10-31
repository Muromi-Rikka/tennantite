import { getCollection } from "astro:content";

import type { Locale } from "../i18n";
import type { DocEntry, DocsNavGroup } from "./docs";
import { localeHref, ui } from "../i18n";
import {
  blockHref,
  catalogDescription,
  componentHref,
  componentTitle,
  coreComponents,
  modIds,
  primaryBlocks,
} from "./catalog";
import { buildDocsNav, filterDocs } from "./docs";

/**
 * shadcn 式单一全局侧栏：docs 四组 + 组件 + HUD 与界面 + Mod 界面。
 * docs 部分仍以 content collection frontmatter（section + order）为来源。
 */
export async function buildSiteNav(locale: Locale): Promise<DocsNavGroup[]> {
  const docs: DocEntry[] = filterDocs(await getCollection("docs"), locale);
  const docGroups = buildDocsNav(docs, locale);
  const text = ui[locale];
  const sidebarGroups = text.docsChrome.sidebarGroups;

  const componentGroup: DocsNavGroup = {
    items: coreComponents.map(entry => ({
      description: catalogDescription(entry, locale),
      href: componentHref(entry.slug, locale),
      id: entry.slug,
      title: componentTitle(entry, locale),
    })),
    title: sidebarGroups.components,
  };

  const hudGroup: DocsNavGroup = {
    items: primaryBlocks.map(entry => ({
      description: catalogDescription(entry, locale),
      href: blockHref(entry.slug, locale),
      id: entry.slug,
      title: componentTitle(entry, locale),
    })),
    title: sidebarGroups.hud,
  };

  const modsGroup: DocsNavGroup = {
    items: modIds.map(id => ({
      description: "",
      href: localeHref(locale, `/mods/${id}/`),
      id,
      title: text.modsPage.mods[id].title,
    })),
    title: sidebarGroups.mods,
  };

  return [...docGroups, componentGroup, hudGroup, modsGroup];
}
