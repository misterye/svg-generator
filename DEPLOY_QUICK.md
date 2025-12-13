# 🚀 快速部署到 Vercel

## 3 步完成部署

### 步骤 1: 准备环境变量

你需要 3 个环境变量：

1. **GOOGLE_API_KEY** - 从 https://aistudio.google.com/apikey 获取
2. **AUTH_PASSWORD** - 你的访问密码（自己设置）
3. **SESSION_SECRET** - 随机字符串（32字符以上）

**生成 SESSION_SECRET**:
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
```

---

### 步骤 2: 部署到 Vercel

**选项 A: 通过 GitHub（推荐）**

1. 将代码推送到 GitHub
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. 访问 https://vercel.com
3. 点击 "New Project"
4. 导入你的 GitHub 仓库
5. Vercel 自动检测 Next.js 配置 ✅

**选项 B: 通过 Vercel CLI**

```bash
# 安装 CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel
```

---

### 步骤 3: 配置环境变量

在 Vercel Dashboard:

1. 进入项目 Settings
2. 选择 Environment Variables
3. 添加3个变量：
   - `GOOGLE_API_KEY`: 你的API密钥
   - `AUTH_PASSWORD`: 你的访问密码
   - `SESSION_SECRET`: 生成的随机字符串

4. Environment: 选择 **Production** 和 **Preview**

5. 保存后重新部署

---

## ✅ 验证部署

1. 访问 Vercel 提供的 URL（如 `https://your-app.vercel.app`）
2. 看到登录页面 ✓
3. 输入密码登录 ✓
4. 测试生成 SVG ✓
5. 测试语言切换 ✓

**成功！** 🎉

---

## 🔧 问题排查

### 登录失败？
➡️ 检查 Vercel 环境变量中的 `AUTH_PASSWORD` 和 `SESSION_SECRET`

### API 错误？
➡️ 检查 `GOOGLE_API_KEY` 是否正确设置

### 重新部署
```bash
vercel --prod
```

---

**完整文档**: 查看 [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md)
