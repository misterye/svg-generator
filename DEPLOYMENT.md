# 部署指南 | Deployment Guide

本文档详细说明如何将 SVG Generator 部署到各个平台。

## 📋 部署前准备

1. **获取 Google Gemini API Key**
   - 访问 [Google AI Studio](https://aistudio.google.com/apikey)
   - 登录你的 Google 账号
   - 创建并复制 API Key

2. **准备代码仓库**
   - 将代码推送到 GitHub/GitLab/Bitbucket
   - 确保 `.env.local` 已添加到 `.gitignore`（已默认配置）

---

## 🚀 Vercel 部署（推荐）

Vercel 是 Next.js 的官方托管平台，部署最简单。

### 方法一：通过 Vercel CLI

1. **安装 Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署项目**
   ```bash
   vercel
   ```

4. **设置环境变量**
   ```bash
   vercel env add GOOGLE_API_KEY
   ```
   粘贴你的 API Key

5. **重新部署（应用环境变量）**
   ```bash
   vercel --prod
   ```

### 方法二：通过 Vercel 网站

1. 访问 [vercel.com](https://vercel.com)
2. 点击 "New Project"
3. 从 GitHub 导入你的仓库
4. 配置环境变量：
   - Name: `GOOGLE_API_KEY`
   - Value: 你的 API Key
5. 点击 "Deploy"

✅ **部署完成！** 你会得到一个 `.vercel.app` 域名

---

## 🌐 Netlify 部署

### 方法一：通过 Netlify CLI

1. **安装 Netlify CLI**
   ```bash
   npm install netlify-cli -g
   ```

2. **登录 Netlify**
   ```bash
   netlify login
   ```

3. **初始化并部署**
   ```bash
   netlify init
   ```

4. **设置环境变量**
   ```bash
   netlify env:set GOOGLE_API_KEY your_api_key_here
   ```

5. **部署到生产环境**
   ```bash
   netlify deploy --prod
   ```

### 方法二：通过 Netlify 网站

1. 访问 [netlify.com](https://netlify.com)
2. 点击 "Add new site" → "Import an existing project"
3. 选择你的 Git 提供商并授权
4. 选择仓库
5. 配置构建设置：
   - Build command: `npm run build`
   - Publish directory: `.next`
6. 添加环境变量：
   - 点击 "Site settings" → "Environment variables"
   - 添加 `GOOGLE_API_KEY`
7. 点击 "Deploy site"

---

## ☁️ 其他平台

### Railway

1. 访问 [railway.app](https://railway.app)
2. 创建新项目，从 GitHub 导入
3. 添加环境变量 `GOOGLE_API_KEY`
4. Railway 会自动检测并部署 Next.js 应用

### Render

1. 访问 [render.com](https://render.com)
2. 创建 "New Web Service"
3. 连接 Git 仓库
4. 配置：
   - Environment: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
5. 添加环境变量 `GOOGLE_API_KEY`

---

## 🔧 环境变量配置

所有部署平台都需要配置以下环境变量：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `GOOGLE_API_KEY` | 你的 Gemini API Key | 必需，用于调用 Google AI |

### ⚠️ 重要提示

- **永远不要**将 API Key 提交到代码仓库
- **永远不要**在前端代码中硬编码 API Key
- 使用 `.env.local` 进行本地开发
- 在部署平台的环境变量设置中配置生产环境的 API Key

---

## ✅ 部署后验证

部署完成后，执行以下检查：

1. **访问你的网站**
   - 确保页面正常加载
   
2. **测试 SVG 生成功能**
   - 输入一个描述（如 "a red apple"）
   - 点击生成
   - 检查是否成功生成 SVG

3. **检查 API Key 安全性**
   - 打开浏览器开发者工具 → Network
   - 生成一个 SVG
   - 检查网络请求，确保 API Key **没有**出现在任何请求中
   - API Key 应该只在服务器端使用

---

## 🐛 常见问题

### 问题 1: 部署成功但无法生成 SVG

**解决方案：**
- 检查环境变量是否正确配置
- 确认 API Key 有效且有足够的配额
- 查看部署平台的日志

### 问题 2: 环境变量不生效

**解决方案：**
- 在添加环境变量后重新部署
- 确保变量名完全一致（区分大小写）
- Vercel: 使用 `vercel --prod` 重新部署
- Netlify: 触发新的部署

### 问题 3: 构建失败

**解决方案：**
```bash
# 在本地测试构建
npm run build

# 如果本地构建成功，清除部署缓存
# Vercel: 在项目设置中清除缓存
# Netlify: 在部署设置中清除缓存并重新部署
```

---

## 📊 性能优化建议

1. **启用边缘函数**（Vercel/Netlify）
   - API 路由会自动部署为 Serverless Functions

2. **配置 CDN 缓存**
   - 静态资源自动通过 CDN 分发

3. **监控 API 使用**
   - 在 [Google AI Studio](https://aistudio.google.com) 监控 API 配额

---

## 📞 获取帮助

- 查看 [Next.js 部署文档](https://nextjs.org/docs/deployment)
- 查看 [Vercel 文档](https://vercel.com/docs)
- 查看 [Netlify 文档](https://docs.netlify.com)

---

**祝部署顺利！** 🎉
