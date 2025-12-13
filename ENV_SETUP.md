# 🔐 本地开发设置说明

## 快速开始

1. **复制环境变量模板**
   ```bash
   cp .env.local.example .env.local
   ```

2. **编辑 `.env.local` 文件**
   
   打开 `.env.local` 文件，将 `your_google_gemini_api_key_here` 替换为你的实际 API Key：
   
   ```env
   GOOGLE_API_KEY=AIzaSy...你的实际API密钥
   ```

3. **获取 API Key**
   
   如果还没有 API Key：
   - 访问: https://aistudio.google.com/apikey
   - 登录 Google 账号
   - 点击 "Create API Key"
   - 复制生成的 API Key

4. **启动开发服务器**
   ```bash
   npm run dev
   ```

## ⚠️ 重要安全提醒

- ✅ `.env.local` 已经在 `.gitignore` 中，不会被提交
- ❌ **永远不要**将真实的 API Key 提交到 Git 仓库
- ❌ **永远不要**在代码中硬编码 API Key
- ✅ 只在 `.env.local` 中存储敏感信息

## 📝 环境变量说明

| 变量名 | 必需 | 说明 |
|--------|------|------|
| `GOOGLE_API_KEY` | ✅ | Google Gemini API 密钥，用于生成 SVG |

## 🔍 验证配置

启动开发服务器后：

1. 访问 http://localhost:3000
2. 输入一个描述（如 "a blue cat"）
3. 点击生成按钮
4. 如果成功生成 SVG，说明配置正确！

## 🐛 常见问题

### Q: 提示 "API key not configured"
A: 确保 `.env.local` 文件存在且 `GOOGLE_API_KEY` 已正确设置

### Q: API Key 无效
A: 
- 检查 API Key 是否完整复制
- 确认 API Key 在 Google AI Studio 中是有效的
- 检查是否有空格或特殊字符

### Q: 修改了 `.env.local` 但不生效
A: 重启开发服务器（按 Ctrl+C 停止，然后再次运行 `npm run dev`）

## 📚 更多信息

- [Google AI Studio](https://aistudio.google.com)
- [Next.js 环境变量文档](https://nextjs.org/docs/basic-features/environment-variables)
