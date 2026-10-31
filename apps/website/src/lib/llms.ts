import type { CollectionEntry } from "astro:content";
import type { Locale } from "../i18n";
import type { ModTarget } from "./catalog";
import { ui } from "../i18n";
import {
  blockHref,
  catalogDescription,
  commonComponents,
  componentHref,
  componentTitle,
  coreComponents,
  modCatalog,
  modIds,

  primaryBlocks,
} from "./catalog";
import { docHref, filterDocs, sortDocs } from "./docs";

export function buildLlmsFullText(docs: CollectionEntry<"docs">[], locale: Locale, site: URL): string {
  const sections = sortDocs(filterDocs(docs, locale)).map((entry) => {
    const body = (entry.body ?? "").replaceAll(/^import\s.+$/gm, "").replaceAll(/\n{3,}/g, "\n\n").trim();
    return [`### ${entry.data.title}`, "", entry.data.description, "", body].join("\n");
  });
  return [...headerLines(locale), "", ...sections, "---", "", ...indexLines(docs, locale, site)].join("\n");
}

export function buildLlmsText(docs: CollectionEntry<"docs">[], locale: Locale, site: URL): string {
  const fullHref = new URL(locale === "en" ? "/en/llms-full.txt" : "/llms-full.txt", site).href;
  return [...headerLines(locale), "", `- [Full docs (llms-full.txt)](${fullHref})`, "", ...indexLines(docs, locale, site)].join("\n");
}

function headerLines(locale: Locale): string[] {
  const text = ui[locale];
  return ["# Tennantite", "", `> ${text.home.metaDescription}`];
}

function indexLines(docs: CollectionEntry<"docs">[], locale: Locale, site: URL): string[] {
  const text = ui[locale];
  return [
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
}
