# SVG Generator - Powered by Gemini AI

一个使用 Next.js 和 Google Gemini AI 构建的 SVG 图形生成器。通过简单的文字描述，即可生成精美的矢量图形。

## ✨ 特性

- 🎨 **AI 驱动生成**: 使用 Google Gemini AI 根据文字描述生成高质量 SVG 图形
- 🔒 **安全的 API Key 管理**: API Key 存储在后端，绝不暴露到前端
- 🔐 **登录认证保护**: 密码保护防止 API Key 被滥用，适合公开部署
- 📱 **响应式设计**: 完美适配各种设备尺寸
- ⚡ **快速部署**: 支持一键部署到 Vercel、Netlify 等平台
- 💾 **下载与复制**: 支持下载 SVG 文件和复制源代码
- ⏱️ **Session 管理**: 24小时有效期，自动登出保护

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
   
   编辑 `.env.local` 文件，添加配置：
   ```env
   # Google Gemini API Key
   GOOGLE_API_KEY=your_actual_api_key_here
   
   # 访问密码（保护你的应用）
   AUTH_PASSWORD=your_strong_password_here
   
   # Session 密钥（随机字符串）
   SESSION_SECRET=your_random_secret_string
   ```
   
   **详细设置指南**: 查看 [AUTH_SETUP.md](./AUTH_SETUP.md)

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

- ✅ **API Key 保护**: 仅存储在服务器端环境变量中
- ✅ **后端隔离**: 前端通过 API 路由与 Gemini AI 通信
- ✅ **登录认证**: 密码保护防止未授权访问
- ✅ **Session 加密**: 使用加密 session 管理登录状态
- ✅ **HTTP-only Cookie**: 防止 XSS 攻击
- ✅ **所有 AI 调用都在服务器端进行**

**详细安全说明**: 查看 [SECURITY.md](./SECURITY.md) 和 [AUTH_GUIDE.md](./AUTH_GUIDE.md)

## 🛠️ 技术栈

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini AI (gemini-2.5-flash)
- **Authentication**: Custom session-based auth
- **Icons**: Lucide React
- **Deployment**: Vercel / Netlify

## 📝 环境变量

| 变量名 | 说明 | 必需 |
|--------|------|------|
| `GOOGLE_API_KEY` | Google Gemini API Key | ✅ 是 |
| `AUTH_PASSWORD` | 访问应用的密码 | ✅ 是 |
| `SESSION_SECRET` | Session 加密密钥 | ✅ 是 |

**配置帮助**: 查看 [AUTH_SETUP.md](./AUTH_SETUP.md)

## 📚 文档

- [快速开始](./QUICKSTART.md) - 新手入门指南
- [认证设置](./AUTH_SETUP.md) - 3分钟完成认证配置
- [认证指南](./AUTH_GUIDE.md) - 详细的认证功能说明
- [部署指南](./DEPLOYMENT.md) - 多平台部署教程
- [安全检查](./SECURITY.md) - 安全最佳实践
- [架构说明](./ARCHITECTURE.md) - 项目技术架构
- [故障排除](./TROUBLESHOOTING.md) - 常见问题解决

## 📄 License

Apache-2.0

## 🤝 贡献

欢迎提交 Issues 和 Pull Requests！

## 📧 联系

如有问题，请通过 Issues 联系我们。
