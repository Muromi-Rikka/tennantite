import type { CollectionEntry } from "astro:content";
import type { Locale } from "../i18n";
import { ui } from "../i18n";
import {
  blockHref,
  catalogDescription,
  componentHref,
  componentTitle,
  commonComponents,
  coreComponents,
  modCatalog,
  modIds,
  primaryBlocks,
  type ModTarget,
} from "./catalog";
import { docHref, filterDocs, sortDocs } from "./docs";

export function buildLlmsText(docs: CollectionEntry<"docs">[], locale: Locale, site: URL): string {
  const text = ui[locale];
  const lines = [
    "# Tennantite",
    "",
    `> ${text.home.metaDescription}`,
    "",
    `## ${text.nav.docs}`,
    ...sortDocs(filterDocs(docs, locale)).map(entry =>
      `- [${entry.data.title}](${new URL(docHref(entry.id), site).href}): ${entry.data.description}`,
    ),
    "",
    `## ${text.nav.components}`,
    ...coreComponents.map(component =>
      `- [${componentTitle(component, locale)}](${new URL(componentHref(component.slug, locale), site).href}): ${catalogDescription(component, locale)}`,
    ),
    "",
    `## ${text.nav.blocks}`,
    ...primaryBlocks.map(block =>
      `- [${componentTitle(block, locale)}](${new URL(blockHref(block.slug, locale), site).href}): ${catalogDescription(block, locale)}`,
    ),
    "",
    ...modIds.flatMap(id => [
      `## ${text.modsPage.mods[id as ModTarget].title}`,
      ...modCatalog[id].blocks.map(block =>
        `- [${componentTitle(block, locale)}](${new URL(blockHref(block.slug, locale), site).href}): ${catalogDescription(block, locale)}`,
      ),
      ...modCatalog[id].components.map(component =>
        `- [${componentTitle(component, locale)}](${new URL(componentHref(component.slug, locale), site).href}): ${catalogDescription(component, locale)}`,
      ),
      "",
    ]),
    ...(commonComponents.length > 0
      ? [
          `## ${text.modsPage.common.title}`,
          ...commonComponents.map(component =>
            `- [${componentTitle(component, locale)}](${new URL(componentHref(component.slug, locale), site).href}): ${catalogDescription(component, locale)}`,
          ),
          "",
        ]
      : []),
  ];
  return lines.join("\n");
}
