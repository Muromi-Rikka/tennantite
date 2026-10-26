// 生产启动入口（TanStack Start v1.169：dist/server/server.js 为 fetch-handler，
// 见官方 Hosting 指南 —— 本验证应用用 srvx 直接承载 SSR 请求；
// 静态资源在生产部署中由 CDN / 静态主机服务 dist/client）
import { serve } from "srvx";

// 该文件就是生产构建的 fetch-handler 产物，此导入为包装启动的既定方式
// eslint-disable-next-line antfu/no-import-dist -- 生产入口包装器
import handler from "./dist/server/server.js";

serve(
  { fetch: handler.fetch },
  { port: Number(process.env.PORT) || 3300 },
);
