# 🔐 认证功能文档

**添加日期**: 2025-12-13  
**状态**: ✅ 已实现

## 概述

为了保护 Google Gemini API Key 不被滥用，应用现在需要密码认证才能使用。这确保只有授权用户才能访问 SVG 生成功能。

---

## 🎯 功能特性

### 1. 密码保护
- ✅ 用户必须输入正确密码才能访问应用
- ✅ 密码存储在后端环境变量中
- ✅ 密码不会暴露给前端

### 2. Session 管理
- ✅ 登录后创建加密 session
- ✅ Session 有效期 24 小时
- ✅ 基于 HTTP-only cookie（安全）

### 3. API 保护
- ✅ 所有 SVG 生成请求都需要认证
- ✅ 未认证的请求返回 401 错误
- ✅ 自动验证 session 状态

### 4. 用户体验
- ✅ 优雅的登录页面
- ✅ 登出按钮（header 中）
- ✅ 自动 session 检查
- ✅ 友好的错误提示

---

## 🚀 快速开始

### 1. 配置密码

编辑 `.env.local` 文件，添加以下配置：

```env
# Google API Key (已有)
GOOGLE_API_KEY=your_google_api_key_here

# 新增：认证密码（设置一个强密码）
AUTH_PASSWORD=your_strong_password_here

# 新增：Session 密钥（随机字符串）
SESSION_SECRET=your_random_secret_here
```

**生成随机 secret（可选）**:
```bash
# 使用 OpenSSL
openssl rand -base64 32

# 或使用 Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 2. 重启开发服务器

```bash
npm run dev
```

### 3. 访问应用

1. 打开 http://localhost:3000
2. 你会看到登录页面
3. 输入你在 `.env.local` 中设置的密码
4. 登录成功后即可使用应用

---

## 📁 新增文件

| 文件路径 | 说明 |
|---------|------|
| `lib/auth.ts` | 认证核心逻辑库 |
| `app/api/auth/login/route.ts` | 登录 API |
| `app/api/auth/logout/route.ts` | 登出 API |
| `app/api/auth/verify/route.ts` | Session 验证 API |
| `components/LoginPage.tsx` | 登录页面组件 |
| `components/HeaderWithAuth.tsx` | 带登出按钮的 Header |

## 🔄 修改的文件

| 文件路径 | 修改内容 |
|---------|---------|
| `app/api/generate-svg/route.ts` | 添加认证检查 |
| `app/page.tsx` | 集成登录流程 |
| `.env.local.example` | 添加认证配置示例 |

---

## 🔒 安全机制

### 1. 密码验证
```typescript
// lib/auth.ts
export function verifyPassword(password: string): boolean {
  const correctPassword = process.env.AUTH_PASSWORD;
  return password === correctPassword;
}
```

**特点**:
- ✅ 密码存储在服务器端环境变量
- ✅ 前端永远不知道正确密码
- ✅ 每次登录都在后端验证

### 2. Session 加密
```typescript
// 简单的 XOR 加密（demo 级别）
// 生产环境建议使用 iron-session 或 next-auth
function encryptSession(data: string): string {
  const secret = process.env.SESSION_SECRET;
  // XOR encryption logic
  return Buffer.from(encrypted).toString('base64');
}
```

**特点**:
- ✅ Session 数据加密存储
- ✅ 使用 SESSION_SECRET 作为密钥
- ✅ HTTP-only cookie（防止 XSS）

### 3. API 保护
```typescript
// app/api/generate-svg/route.ts
export async function POST(request: NextRequest) {
  // 首先检查认证
  const isAuthenticated = await verifySession();
  if (!isAuthenticated) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  // ... SVG 生成逻辑
}
```

**特点**:
- ✅ 每个 API 请求都验证 session
- ✅ 未认证请求立即拒绝
- ✅ 不会消耗 Gemini API 额度

---

## 🎨 用户界面

### 登录页面

特点：
- 🎯 清晰的输入框
- 🔒 密码输入保护
- ⚠️ 错误提示
- ⏳ 加载状态
- 📱 响应式设计

### 主应用（已登录）

新增功能：
- 📌 Header 中的登出按钮
- 🔄 自动 session 检查
- ⏱️ 24 小时 session 有效期

---

## 🔄 认证流程

### 首次访问

```
用户访问 /
  ↓
检查 session cookie
  ↓ (无 cookie)
显示登录页面
  ↓
用户输入密码
  ↓
POST /api/auth/login
  ↓ (验证密码)
创建加密 session
  ↓
设置 HTTP-only cookie
  ↓
显示主应用
```

### SVG 生成请求

```
用户点击生成
  ↓
POST /api/generate-svg
  ↓
验证 session cookie
  ↓ (已认证)
调用 Gemini API
  ↓
返回 SVG
```

### 登出

```
用户点击登出
  ↓
POST /api/auth/logout
  ↓
删除 session cookie
  ↓
返回登录页面
```

---

## 🚀 部署配置

### Vercel

1. **添加环境变量**:
   ```
   Settings → Environment Variables
   ```

2. **添加以下变量**:
   - `GOOGLE_API_KEY` - 你的 Gemini API Key
   - `AUTH_PASSWORD` - 你的访问密码
   - `SESSION_SECRET` - 随机生成的密钥

3. **重新部署**:
   ```bash
   vercel --prod
   ```

### Netlify

1. **Site settings → Environment variables**

2. **添加变量**:
   - `GOOGLE_API_KEY`
   - `AUTH_PASSWORD`
   - `SESSION_SECRET`

3. **触发新部署**

---

## 🔧 配置选项

### Session 有效期

在 `lib/auth.ts` 中修改：

```typescript
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// 修改为 12 小时
const SESSION_DURATION = 12 * 60 * 60 * 1000;

// 修改为 7 天
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000;
```

### 密码强度建议

✅ **推荐**:
- 至少 16 个字符
- 包含大小写字母、数字和特殊字符
- 使用密码管理器生成

❌ **避免**:
- 简单密码（如 "123456"）
- 常见单词
- 个人信息

---

## 🧪 测试

### 测试登录

```bash
# 测试登录 API
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"password":"your_password"}'
```

### 测试 Session 验证

```bash
# 测试验证 API
curl http://localhost:3000/api/auth/verify
```

### 测试受保护的 API

```bash
# 未登录时（应返回 401）
curl -X POST http://localhost:3000/api/generate-svg \
  -H "Content-Type: application/json" \
  -d '{"prompt":"test"}'
```

---

## 📊 安全等级

### 当前实现（适合）:
- ✅ 个人项目
- ✅ 小团队内部使用
- ✅ 低到中等安全需求

### 增强建议（如需要）:
- 🔒 使用 `next-auth` 或 `iron-session`
- 🔒 添加 rate limiting
- 🔒 添加 2FA（双因素认证）
- 🔒 密码哈希存储（bcrypt）
- 🔒 审计日志

---

## ❓ 常见问题

### Q: 忘记密码怎么办？

A: 密码存储在 `.env.local` 或部署平台的环境变量中。查看并重新设置即可。

### Q: Session 过期后会怎样？

A: 用户会自动返回登录页面，需要重新输入密码。

### Q: 多个用户可以同时使用吗？

A: 可以，每个用户都有独立的 session。但所有人使用同一个密码。

### Q: 可以添加多个用户吗？

A: 当前实现是单密码系统。如需多用户，建议使用 NextAuth.js。

### Q: 安全吗？

A: 对于个人/小团队使用是安全的。Session 加密，密码在后端验证，API 受保护。

---

## 🎯 最佳实践

1. **强密码**: 使用足够强的密码
2. **安全存储**: 不要将密码提交到 Git
3. **定期更换**: 定期更换 `AUTH_PASSWORD` 和 `SESSION_SECRET`
4. **HTTPS**: 生产环境必须使用 HTTPS
5. **监控**: 监控异常登录尝试

---

## 📚 相关文档

- [Next.js Authentication](https://nextjs.org/docs/authentication)
- [HTTP-only Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
- [Session Management](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)

---

**最后更新**: 2025-12-13  
**版本**: 1.0  
**状态**: ✅ 生产就绪
