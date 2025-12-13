# 🔐 认证功能快速设置

## 立即设置（3 步）

### 步骤 1: 配置密码

编辑你的 `.env.local` 文件（或创建新的）：

```env
# Google API Key（已设置）
GOOGLE_API_KEY=AIzaSyCS9KSD5C8TqMNw8x0vH0rkP9BUNBbKv-A

# 🔑 设置访问密码（必需）
AUTH_PASSWORD=YourSecurePassword123!

# 🔐 设置 Session 密钥（必需）
SESSION_SECRET=RandomSecretString123456789
```

**密码建议**:
- 至少 12 个字符
- 包含大小写字母、数字
- 示例：`MySecure@SVG2024!`

**Session Secret 建议**:
- 随机字符串
- 至少 32 个字符
- 可以使用工具生成（见下方）

---

### 步骤 2: 生成 Session Secret（可选）

**方法 1: 使用 PowerShell**
```powershell
# 生成随机字符串
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
```

**方法 2: 使用在线工具**
- 访问: https://randomkeygen.com/
- 复制 "CodeIgniter Encryption Keys" 或类似的随机字符串

**方法 3: 简单随机**
```
随便敲键盘，例如: asd8f7a9sd8f7a9sd8f7a9sd8f7a9sd
```

---

### 步骤 3: 重启服务器

```bash
# 停止当前服务器（Ctrl+C）
# 重新启动
npm run dev
```

---

## ✅ 验证设置

1. 访问 http://localhost:3000
2. 应该看到登录页面
3. 输入你设置的密码
4. 成功登录后可以使用应用

---

## 🚨 故障排除

### 问题 1: 找不到 .env.local 文件

**解决方案**:
```bash
# 复制示例文件
copy .env.local.example .env.local

# 或手动创建
New-Item -Path .env.local -ItemType File
```

### 问题 2: 登录后立即退出

**原因**: SESSION_SECRET 未设置

**解决方案**:
确保 `.env.local` 中有 `SESSION_SECRET=...`

### 问题 3: 密码正确但提示错误

**解决方案**:
1. 检查密码中是否有空格或特殊字符
2. 确保 `.env.local` 格式正确（无引号）
3. 重启开发服务器

---

## 📝 配置模板

复制以下内容到你的 `.env.local`:

```env
# ===========================================
# SVG Generator 环境配置
# ===========================================

# Google Gemini API Key
# 从 https://aistudio.google.com/apikey 获取
GOOGLE_API_KEY=your_google_api_key_here

# 访问密码
# 设置一个强密码保护你的应用
AUTH_PASSWORD=YourStrongPassword123!

# Session 密钥
# 用于加密 session，随机字符串即可
SESSION_SECRET=your_random_secret_32_chars_minimum

# ===========================================
# 配置完成后记得保存并重启服务器
# ===========================================
```

---

## 🚀 准备部署？

部署到 Vercel/Netlify 时：

1. **在平台添加环境变量**:
   - `GOOGLE_API_KEY`
   - `AUTH_PASSWORD`
   - `SESSION_SECRET`

2. **推送代码到 Git**

3. **触发部署**

4. **测试**:
   - 访问部署的 URL
   - 使用你设置的密码登录
   - 测试 SVG 生成功能

---

## 💡 实用提示

### 分享给团队成员

只需告诉他们：
1. 应用 URL
2. 访问密码

**不要分享**:
- Google API Key
- Session Secret

### 更改密码

1. 修改 `.env.local` 中的 `AUTH_PASSWORD`
2. 重启服务器
3. 所有用户需要使用新密码重新登录

### 安全提醒

- ✅ 使用强密码
- ✅ 不要将 `.env.local` 提交到 Git
- ✅ 生产环境使用 HTTPS
- ❌ 不要在聊天/邮件中明文发送密码

---

**现在就设置吧！** 🎉

有问题？查看 [AUTH_GUIDE.md](./AUTH_GUIDE.md) 了解详细文档。
