import { rentonReact } from "@renton/eslint-config-react";
import pnpmPlugin from "eslint-plugin-pnpm";
import { fileURLToPath } from "node:url";

// 插件按被 lint 文件目录解析相对路径，这里固定为仓库根的绝对路径
const tokensCssPath = fileURLToPath(
  new URL("packages/tokens/css/tokens.css", import.meta.url),
);

export default rentonReact(
  {
    next: true,
    tailwindcss: true,
    tailwindcssConfigPath: tokensCssPath,
    tanstackQuery: false,
    tanstackRouter: true,
  },
  // @renton/eslint-config-frontend 传的设置键为 cssConfig，
  // 而 eslint-plugin-tailwindcss v4 读取的是 cssConfigPath，此处补齐覆盖
  {
    // next 预设全局生效，App Router 项目无 pages 目录，关闭该规则
    // （renton 将 @next/eslint-plugin-next 注册为裸名 next）
    rules: {
      "next/no-html-link-for-pages": "off",
      // mc-tex-* 为本库自有纹理类（textures.css），非 Tailwind 工具类
      "tailwindcss/no-custom-classname": "off",
    },
    settings: {
      tailwindcss: {
        cssConfigPath: tokensCssPath,
      },
    },
  },
  // renton 默认强制 trustPolicy: no-downgrade，但该策略会把 semver@6.3.1 等
  // 发布于 provenance 机制之前的经典包误判为"信任降级"，导致所有增量安装失败
  // （pnpm discussion #10706）。本项目改为 off，保留 minimumReleaseAge 检查。
  {
    files: ["pnpm-workspace.yaml"],
    plugins: { pnpm: pnpmPlugin },
    rules: {
      "pnpm/yaml-enforce-settings": [
        "error",
        {
          settings: {
            minimumReleaseAgeExcludePrune: true,
            shellEmulator: true,
            trustPolicy: "off",
          },
        },
      ],
    },
  },
);
