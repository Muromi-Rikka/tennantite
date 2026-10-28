import type { Locale } from "../i18n";
import type { DocEntry } from "./docs";
import { ui } from "../i18n";
import { blockHref, catalogDescription, componentHref, componentTitle, coreComponents, modEntries, primaryBlocks } from "./catalog";
import { docHref, filterDocs, sortDocs } from "./docs";

export interface SearchItem {
  description: string;
  group: string;
  href: string;
  title: string;
}

export function buildSearchItems(docs: DocEntry[], locale: Locale): SearchItem[] {
  const text = ui[locale].search.groups;
  return [
    ...sortDocs(filterDocs(docs, locale)).map(entry => ({
      description: entry.data.description,
      group: text.docs,
      href: docHref(entry.id),
      title: entry.data.title,
    })),
    ...coreComponents.map(item => ({
      description: catalogDescription(item, locale),
      group: text.components,
      href: componentHref(item.slug, locale),
      title: componentTitle(item, locale),
    })),
    ...primaryBlocks.map(item => ({
      description: catalogDescription(item, locale),
      group: text.blocks,
      href: blockHref(item.slug, locale),
      title: componentTitle(item, locale),
    })),
    ...modEntries.map(item => ({
      description: catalogDescription(item, locale),
      group: text.mods,
      href: componentHref(item.slug, locale),
      title: componentTitle(item, locale),
    })),
  ];
}
