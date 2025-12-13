# SVG Generator - Powered by Gemini AI

一个使用 Next.js 和 Google Gemini AI 构建的 SVG 图形生成器。通过简单的文字描述，即可生成精美的矢量图形。

## ✨ 特性

- 🎨 **AI 驱动生成**: 使用 Google Gemini AI 根据文字描述生成高质量 SVG 图形
- 🔒 **安全的 API Key 管理**: API Key 存储在后端，绝不暴露到前端
- 📱 **响应式设计**: 完美适配各种设备尺寸
- ⚡ **快速部署**: 支持一键部署到 Vercel、Netlify 等平台
- 💾 **下载与复制**: 支持下载 SVG 文件和复制源代码

## 🚀 快速开始

### 前置要求

- Node.js 18.x 或更高版本
- npm 或 yarn
- Google Gemini API Key ([获取 API Key](https://aistudio.google.com/apikey))

### 本地运行

1. **克隆项目**
   ```bash
   git clone <your-repo-url>
   cd svg-generator
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置环境变量**
   
   复制 `.env.local.example` 为 `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
   
   编辑 `.env.local` 文件，添加你的 Google API Key:
   ```env
   GOOGLE_API_KEY=your_actual_api_key_here
   ```

4. **启动开发服务器**
   ```bash
   npm run dev
   ```

5. **访问应用**
   
   打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 📦 部署

### 部署到 Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repo-url>)

1. 点击上方按钮或访问 [Vercel](https://vercel.com)
2. 导入你的 Git 仓库
3. 在环境变量设置中添加 `GOOGLE_API_KEY`
4. 点击 "Deploy" 按钮
5. 完成！你的应用已经部署成功

### 部署到 Netlify

1. 访问 [Netlify](https://netlify.com)
2. 点击 "New site from Git"
3. 选择你的仓库
4. 配置构建设置:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. 在环境变量中添加 `GOOGLE_API_KEY`
6. 点击 "Deploy site"

## 🏗️ 项目结构

```
svg-generator/
├── app/
│   ├── api/
│   │   └── generate-svg/
│   │       └── route.ts          # API 路由，处理 Gemini AI 调用
│   ├── globals.css               # 全局样式
│   ├── layout.tsx                # 根布局组件
│   └── page.tsx                  # 主页面
├── components/
│   ├── InputSection.tsx          # 输入组件
│   ├── SvgPreview.tsx           # SVG 预览组件
│   └── Header.tsx               # 页头组件
├── types.ts                      # TypeScript 类型定义
├── .env.local.example           # 环境变量示例文件
├── next.config.ts               # Next.js 配置
├── tailwind.config.ts           # Tailwind CSS 配置
└── package.json
```

## 🔐 安全性

本项目采用了以下安全措施：

- ✅ API Key 仅存储在服务器端环境变量中
- ✅ 前端通过 API 路由与 Gemini AI 通信
- ✅ 没有客户端代码可以访问 API Key
- ✅ 所有 AI 调用都在服务器端进行

## 🛠️ 技术栈

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini AI (gemini-2.0-flash-exp)
- **Icons**: Lucide React
- **Deployment**: Vercel / Netlify

## 📝 环境变量

| 变量名 | 说明 | 必需 |
|--------|------|------|
| `GOOGLE_API_KEY` | Google Gemini API Key | ✅ 是 |

## 📄 License

Apache-2.0

## 🤝 贡献

欢迎提交 Issues 和 Pull Requests！

## 📧 联系

如有问题，请通过 Issues 联系我们。
