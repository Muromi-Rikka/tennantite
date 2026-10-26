import { rentonReact } from "@renton/eslint-config-react";

export default rentonReact(
  {
    next: true,
    tailwindcss: true,
    tailwindcssConfigPath: "./packages/tokens/css/tokens.css",
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
    },
    settings: {
      tailwindcss: {
        cssConfigPath: "./packages/tokens/css/tokens.css",
      },
    },
  },
);
