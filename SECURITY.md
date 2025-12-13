# 🔐 安全检查清单

本项目已实现的安全措施和最佳实践。

## ✅ 已实现的安全措施

### 1. API Key 保护

- [x] **后端存储**: API Key 仅存储在服务器端环境变量中
- [x] **环境变量**: 使用 `.env.local` 文件，已添加到 `.gitignore`
- [x] **前端隔离**: 前端代码无法访问 API Key
- [x] **API 路由**: 通过 Next.js API Routes 间接调用 Gemini AI

### 2. 代码安全

- [x] **类型安全**: 使用 TypeScript 进行类型检查
- [x] **输入验证**: API 路由验证用户输入
- [x] **错误处理**: 适当的错误处理，不暴露敏感信息
- [x] **依赖更新**: 使用最新稳定版本的依赖

### 3. Git 安全

- [x] **`.gitignore`**: 包含所有敏感文件
  - `.env.local`
  - `.env*.local`
  - `node_modules/`
  - `.next/`
- [x] **示例文件**: 提供 `.env.local.example` 模板

### 4. 部署安全

- [x] **环境变量隔离**: 生产环境使用平台环境变量
- [x] **构建时检查**: 不在构建产物中包含敏感信息
- [x] **Serverless**: API 路由作为无服务器函数运行

## 📋 部署前安全检查

在部署前，请确认：

- [ ] `.env.local` 已添加到 `.gitignore`
- [ ] 代码仓库中没有提交真实的 API Key
- [ ] 部署平台已正确配置环境变量
- [ ] API 路由不返问敏感信息
- [ ] 前端代码不包含硬编码的凭据

## 🔍 验证 API Key 安全性

### 方法 1: 检查网络请求

1. 打开浏览器开发者工具（F12）
2. 切换到 "Network"（网络）标签
3. 生成一个 SVG
4. 查看 `/api/generate-svg` 请求：
   - ✅ 请求体应该只包含 `{ "prompt": "..." }`
   - ❌ 不应该包含任何 API Key 或凭据
   - ✅ 响应只包含生成的 SVG 内容

### 方法 2: 检查页面源代码

1. 访问应用页面
2. 右键点击 → "查看页面源代码"
3. 搜索 "AIza"（Google API Key 前缀）
4. ✅ 应该找不到任何匹配项

### 方法 3: 检查构建产物

```bash
npm run build

# 在 .next 目录中搜索 API Key
# 应该找不到任何匹配项
```

## 🚨 如果 API Key 泄露

如果你意外地将 API Key 提交到了代码仓库：

### 立即行动：

1. **撤销泄露的 Key**
   - 访问 [Google AI Studio](https://aistudio.google.com/apikey)
   - 删除泄露的 API Key
   - 创建新的 API Key

2. **清理 Git 历史**
   ```bash
   # 使用 git-filter-repo 清理历史
   # 或者重新创建仓库（如果是私有项目）
   ```

3. **更新配置**
   - 更新 `.env.local` 使用新的 Key
   - 更新部署平台的环境变量
   - 重新部署应用

4. **监控使用情况**
   - 在 Google AI Studio 中监控 API 使用情况
   - 设置使用配额限制

### 预防措施：

- 使用 `git-secrets` 或类似工具防止提交敏感信息
- 配置 pre-commit hook 检查敏感数据
- 定期审查代码库

## 📝 安全最佳实践

### 开发环境

```bash
# ✅ 正确：使用环境变量
const apiKey = process.env.GOOGLE_API_KEY;

# ❌ 错误：硬编码 API Key
const apiKey = "AIza...";
```

### 代码审查

在提交代码前检查：
- [ ] 没有硬编码的 API Key
- [ ] 没有 console.log 敏感信息
- [ ] 环境变量使用正确的前缀（Next.js 要求服务器端变量不需要 `NEXT_PUBLIC_` 前缀）

### 环境变量命名

```bash
# ✅ 服务器端（安全，不暴露给前端）
GOOGLE_API_KEY=...

# ❌ 前端可访问（会暴露到浏览器）
NEXT_PUBLIC_GOOGLE_API_KEY=...
```

**重要**: 本项目的 `GOOGLE_API_KEY` **没有** `NEXT_PUBLIC_` 前缀，这意味着它只能在服务器端（API 路由）访问。

## 🔒 额外安全建议

### 1. 设置 API 配额

在 Google Cloud Console 中：
- 设置每日请求限制
- 设置预算警告
- 限制 API Key 的使用范围

### 2. 启用速率限制

考虑添加速率限制中间件：
```typescript
// 未来可以添加
import rateLimit from 'express-rate-limit';
```

### 3. 启用 CORS

Next.js API Routes 默认同源，如果需要跨域访问：
```typescript
// 在 API 路由中显式设置 CORS
export async function POST(request: NextRequest) {
  // ... 设置适当的 CORS headers
}
```

### 4. 监控和日志

- 在生产环境启用错误监控（如 Sentry）
- 记录 API 使用情况
- 设置异常使用警报

## ✅ 安全检查通过

本项目已通过以下安全检查：

- [x] API Key 不在前端代码中
- [x] API Key 不在 Git 历史中
- [x] 环境变量正确配置
- [x] API 路由有输入验证
- [x] 错误信息不泄露敏感数据
- [x] 生产构建不包含敏感信息

---

## 📚 参考资源

- [Next.js 环境变量安全](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#environment-variable-load-order)
- [Google API Key 最佳实践](https://cloud.google.com/docs/authentication/api-keys)
- [OWASP API 安全](https://owasp.org/www-project-api-security/)

---

**记住：安全是一个持续的过程，而不是一次性的任务！** 🔐
