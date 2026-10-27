import type { Metadata } from "next";

import "./global.css";

// eslint-disable-next-line react-refresh/only-export-components -- Next.js 要求在 layout 文件中导出 metadata。
export const metadata: Metadata = {
  description: "Minecraft 风格 UI 组件库 — Next.js App Router / RSC 验证应用",
  title: "Verdigris · Next.js SSR 验证",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
