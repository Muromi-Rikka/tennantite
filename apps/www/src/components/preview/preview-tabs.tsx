import { Tabs, TabsList, TabsPanel, TabsTab } from "@verdigris/ui";
import { useState } from "react";

import { Demo } from "./demo";

type CopyState = "复制" | "复制失败" | "已复制";

interface Props {
  code: string;
  name: string;
}

export function PreviewTabs({ code, name }: Props) {
  const [copyState, setCopyState] = useState<CopyState>("复制");

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopyState("已复制");
    }
    catch {
      setCopyState("复制失败");
    }
    setTimeout(() => setCopyState("复制"), 2000);
  }

  return (
    <Tabs className="border-site-border mt-16 border" defaultValue="preview">
      <div className="border-site-border flex items-center justify-between border-b px-4">
        <TabsList aria-label="预览与代码">
          <TabsTab value="preview">预览</TabsTab>
          <TabsTab value="code">代码</TabsTab>
        </TabsList>
        <button
          className="border-site-border text-site-muted hover:text-site-fg border px-4 py-2 text-xs"
          onClick={copy}
          type="button"
        >
          {copyState}
        </button>
      </div>
      <TabsPanel className="flex min-h-[240px] items-center justify-center overflow-x-auto bg-[#0d0d0d] p-16" keepMounted value="preview">
        <Demo name={name} />
      </TabsPanel>
      <TabsPanel className="max-h-[480px] overflow-auto bg-[#080808] p-8" keepMounted value="code">
        <pre className="text-site-fg font-mono text-[13px] leading-11"><code>{code}</code></pre>
      </TabsPanel>
    </Tabs>
  );
}

export default PreviewTabs;
