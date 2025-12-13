# 🔧 故障排除指南

## 刚刚修复的问题

### ❌ 错误：Access to storage is not allowed from this context

**原因**：`crypto.randomUUID()` 在某些浏览器环境或安全上下文中受限。

**解决方案**：✅ 已修复！我已经将 `crypto.randomUUID()` 替换为一个兼容所有浏览器的自定义 UUID 生成器。

**你需要做的**：
1. 保存所有文件（应该已自动保存）
2. 刷新浏览器页面（按 F5 或 Ctrl+R）
3. 再次尝试生成 SVG

---

## 常见问题和解决方案

### 1. API Key 相关错误

#### 错误：API key not configured

**检查步骤**：

```bash
# 1. 确认 .env.local 文件存在
dir .env.local

# 2. 查看文件内容（应该包含你的 API Key）
type .env.local
```

**正确的格式**：
```env
GOOGLE_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**注意事项**：
- ❌ 不要有引号：`GOOGLE_API_KEY="AIza..."` 
- ✅ 直接写值：`GOOGLE_API_KEY=AIza...`
- ❌ 不要有空格：`GOOGLE_API_KEY = AIza...`
- ✅ 等号两边无空格：`GOOGLE_API_KEY=AIza...`

**如果修改了 .env.local**：
1. 停止开发服务器（Ctrl+C）
2. 重新启动：`npm run dev`
3. 刷新浏览器

---

### 2. 网络请求失败

#### 错误：Failed to fetch 或 Network error

**可能原因**：
- API Key 无效或过期
- Google API 配额用完
- 网络连接问题

**检查步骤**：

1. **验证 API Key 有效性**
   - 访问：https://aistudio.google.com/apikey
   - 检查 API Key 状态
   - 如果需要，创建新的 API Key

2. **检查 API 配额**
   - 在 Google AI Studio 中查看使用情况
   - 确认还有可用配额

3. **查看详细错误**
   - 打开浏览器开发者工具（F12）
   - 切换到 "Console" 标签
   - 查看红色错误信息
   - 切换到 "Network" 标签
   - 找到失败的请求，查看响应

---

### 3. 页面加载问题

#### 错误：页面空白或样式错乱

**解决方案**：

```bash
# 清除构建缓存
Remove-Item -Path .next -Recurse -Force

# 重新启动
npm run dev
```

#### 错误：模块未找到

**解决方案**：

```bash
# 重新安装依赖
Remove-Item -Path node_modules -Recurse -Force
npm install
npm run dev
```

---

### 4. 浏览器兼容性问题

#### 推荐的浏览器

- ✅ Chrome 90+
- ✅ Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+

#### 如果使用旧浏览器

尝试更新到最新版本，或使用 Chrome。

---

### 5. 端口占用问题

#### 错误：Port 3000 is already in use

**方法 1：使用其他端口**
```bash
# PowerShell
$env:PORT=3001; npm run dev

# 或在 package.json 中修改脚本
"dev": "next dev -p 3001"
```

**方法 2：关闭占用 3000 端口的程序**
```powershell
# 查找占用端口的进程
netstat -ano | findstr :3000

# 结束进程（替换 PID 为实际进程 ID）
taskkill /PID [PID] /F
```

---

### 6. TypeScript 错误

#### 如果看到类型错误

```bash
# 重新生成类型定义
npm run build

# 或重启 VS Code
# Ctrl+Shift+P → "Reload Window"
```

---

### 7. Gemini AI 响应问题

#### 生成的 SVG 不符合预期

**解决方案**：
- 使用更详细的描述
- 指定样式（如 "flat design", "realistic", "minimalist"）
- 指定颜色（如 "blue and white", "colorful"）
- 多试几次（AI 生成有随机性）

#### 生成时间过长

**正常情况**：
- 通常需要 3-10 秒
- 复杂图形可能需要更长时间

**如果超过 30 秒**：
- 刷新页面重试
- 检查网络连接
- 查看控制台错误

---

## 🔍 调试技巧

### 查看详细日志

**浏览器端（前端）**：
1. 打开开发者工具（F12）
2. 切换到 "Console" 标签
3. 查看错误和警告

**服务器端（后端）**：
1. 查看运行 `npm run dev` 的终端
2. 查找红色错误信息
3. API 路由的错误会显示在这里

**网络请求**：
1. 开发者工具 → "Network" 标签
2. 找到 `generate-svg` 请求
3. 查看请求详情、响应和时间

### 测试 API 路由

使用 PowerShell 测试：

```powershell
# 测试 API 端点
$body = @{
    prompt = "a simple circle"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/generate-svg" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

如果成功，应该返回 SVG 内容。

---

## 📊 健康检查清单

运行以下检查确保一切正常：

- [ ] `.env.local` 文件存在且包含有效的 API Key
- [ ] 开发服务器正在运行（`npm run dev`）
- [ ] 浏览器可以访问 http://localhost:3000
- [ ] 页面正常加载，没有白屏
- [ ] 控制台没有红色错误
- [ ] 可以输入文本并点击生成按钮
- [ ] 生成后显示 SVG（即使第一次失败，重试应该成功）

---

## 🆘 仍然遇到问题？

### 收集信息

请提供以下信息：

1. **错误截图**
   - 浏览器界面
   - 开发者工具控制台
   - 开发者工具网络标签

2. **环境信息**
   ```bash
   node --version
   npm --version
   ```

3. **错误日志**
   - 浏览器控制台的完整错误
   - 终端中的服务器错误

4. **步骤**
   - 详细描述你做了什么
   - 预期发生什么
   - 实际发生了什么

### 重置项目

如果问题持续，尝试完全重置：

```bash
# 1. 停止开发服务器（Ctrl+C）

# 2. 清理所有构建文件
Remove-Item -Path .next -Recurse -Force
Remove-Item -Path node_modules -Recurse -Force

# 3. 重新安装
npm install

# 4. 确认 .env.local 配置正确
type .env.local

# 5. 重新启动
npm run dev
```

---

## ✅ 修复确认

修复问题后，验证：

1. ✅ 页面正常加载
2. ✅ 可以生成 SVG
3. ✅ 控制台无错误
4. ✅ 下载功能正常
5. ✅ 复制功能正常

---

**如果以上都无法解决问题，请在 GitHub 提交 Issue，附上详细信息。**

最后更新：2025-12-13
