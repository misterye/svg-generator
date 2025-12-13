# API Key 诊断脚本

## ✅ 已修复的问题

1. **模型更新为稳定版本**: `gemini-2.5-flash`
   - 从 `gemini-3-pro-preview` 改为更稳定的生产版本
   - 这个版本自2025年6月起普遍可用（GA）
   - 不需要特殊权限

2. **代码已自动重新加载**
   - Next.js 开发服务器会自动检测文件更改

## 🔍 现在请检查你的 API Key

根据错误信息 "API key not valid"，问题可能出在 API Key 配置上。

### 步骤 1: 检查 .env.local 文件

打开 `.env.local` 文件，确保格式正确：

```env
GOOGLE_API_KEY=你的API密钥
```

**常见错误（请避免）**：

❌ 错误 1: 有引号
```env
GOOGLE_API_KEY="AIzaSy..."  # 不要加引号！
```

❌ 错误 2: 有空格
```env
GOOGLE_API_KEY = AIzaSy...  # 等号两边不要空格！
```

❌ 错误 3: 有换行或特殊字符
```env
GOOGLE_API_KEY=AIzaSy...
[额外的空行或字符]
```

✅ 正确格式:
```env
GOOGLE_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 步骤 2: 验证 API Key

1. **访问 Google AI Studio**: https://aistudio.google.com/apikey

2. **检查你的 API Key**:
   - 确保 API Key 状态是"启用"
   - 检查是否有使用配额
   - 确认 API Key 没有被撤销

3. **如果需要，创建新的 API Key**:
   - 点击 "Create API Key"
   - 复制新的 Key
   - 更新到 `.env.local`

### 步骤 3: 重启开发服务器

如果修改了 `.env.local`，必须重启服务器：

```powershell
# 在终端按 Ctrl+C 停止服务器
# 然后重新启动
npm run dev
```

### 步骤 4: 测试

1. 刷新浏览器页面
2. 输入描述（如 "a simple red circle"）
3. 点击生成

## 🔧 快速修复命令

在 PowerShell 中运行以下命令检查配置：

```powershell
# 1. 检查 .env.local 是否存在
Test-Path .env.local

# 2. 检查文件内容（会显示但不会记录到 Git）
Get-Content .env.local

# 3. 如果需要重新创建文件
@"
GOOGLE_API_KEY=your_actual_api_key_here
"@ | Out-File -FilePath .env.local -Encoding utf8
```

替换 `your_actual_api_key_here` 为你的实际 API Key。

## 📋 诊断检查清单

完成以下检查：

- [ ] `.env.local` 文件存在
- [ ] 文件中有 `GOOGLE_API_KEY=...` 这一行
- [ ] API Key 格式正确（无引号、无空格）
- [ ] API Key 有效且未过期
- [ ] API Key 有权限访问 Gemini API
- [ ] 已重启开发服务器
- [ ] 浏览器已刷新

## 🆘 如果仍然失败

### 选项 1: 验证 API Key 基本功能

使用 PowerShell 直接测试 API：

```powershell
$apiKey = "你的API密钥"
$headers = @{
    "Content-Type" = "application/json"
}
$body = @{
    contents = @(
        @{
            parts = @(
                @{ text = "Say hello" }
            )
        }
    )
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=$apiKey" -Method Post -Headers $headers -Body $body
```

如果这个也失败，说明 API Key 本身有问题。

### 选项 2: 检查 Next.js 环境变量加载

创建测试 API 路由检查环境变量：

```bash
# 创建临时测试文件
# app/api/test-env/route.ts
```

查看终端输出，确认 API Key 是否被正确加载。

### 选项 3: 清除缓存并重建

```powershell
# 停止开发服务器（Ctrl+C）
Remove-Item -Path .next -Recurse -Force
npm run dev
```

## ✨ 成功标志

当一切正常时，你应该看到：

1. ✅ 终端没有 "API key not valid" 错误
2. ✅ 生成请求返回 `200 OK`
3. ✅ 浏览器显示生成的 SVG
4. ✅ 页面显示 "Powered by Gemini 2.5 Flash"

---

**修改了配置后，记得重启开发服务器！**

有问题随时告诉我！🚀
