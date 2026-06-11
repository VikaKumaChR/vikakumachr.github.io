# VkC's blog 

一个使用 React + Fluent UI v9 制作的个人角色博客，用于展示原创角色、人设档案和个人贴文。主题色为 `#c6bae0`，支持亮色和暗色切换。

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

构建产物会生成在 `dist/`，可以部署到 GitHub Pages。

## GitHub Pages

推荐将仓库接入 GitHub Actions，执行 `npm run build` 后发布 `dist/` 目录。`vite.config.ts` 已使用 `base: "./"`，适配项目页路径。

## 主要文件

- `src/App.tsx`: React 页面组件、Fluent UI v9 主题和交互
- `src/App.css`: 全局基础样式
- `Image/hero-character-blog.png`: 首页视觉图
- `vite.config.ts`: Vite 和 GitHub Pages 路径配置
