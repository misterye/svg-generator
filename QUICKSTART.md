# 🚀 快速开始

欢迎使用 SVG Generator！按照以下步骤快速启动项目。

## 📋 前置条件检查

- [x] Node.js 已安装（18.x 或更高版本）
- [x] npm 已安装
- [ ] 获取 Google Gemini API Key

## 🔑 第一步：配置 API Key

### 1. 获取 API Key

访问 [Google AI Studio](https://aistudio.google.com/apikey) 并：
1. 使用 Google 账号登录
2. 点击 "Create API Key"
3. 复制生成的 API Key

### 2. 配置环境变量

项目已经自动创建了 `.env.local` 文件。

**编辑 `.env.local` 文件：**

```bash
# 使用你喜欢的编辑器打开
notepad .env.local      # Windows
# 或
code .env.local         # VS Code
```

**替换 API Key：**

```env
GOOGLE_API_KEY=你刚才复制的API_Key
```

示例（请使用你自己的 Key）：
```env
GOOGLE_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## ▶️ 第二步：启动开发服务器

```bash
npm run dev
```

服务器启动后，你会看到：

```
  ▲ Next.js 15.x.x
  - Local:        http://localhost:3000
  
✓ Ready in 2.1s
```

## 🎨 第三步：测试应用

1. 打开浏览器访问 http://localhost:3000
2. 在输入框中输入描述，例如：
   - "a red apple with a green leaf"
   - "a futuristic rocket ship"
   - "a cute robot with blue eyes"
3. 点击 "Generate" 按钮
4. 等待几秒，查看生成的 SVG！

## ✅ 验证安全性

打开浏览器开发者工具（F12）：
1. 切换到 "Network" 标签
2. 生成一个 SVG
3. 检查 `/api/generate-svg` 请求
4. 确认请求体中**没有** API Key（✅ 安全）

API Key 只在服务器端使用，永远不会暴露到前端！

## 📦 其他命令

```bash
# 构建生产版本
npm run build

# 启动生产服务器（需先构建）
npm run start

# 代码检查
npm run lint
```

## 🔧 故障排除

### 问题：提示 "API key not configured"

**解决方案：**
1. 确认 `.env.local` 文件存在
2. 确认文件中有 `GOOGLE_API_KEY=...`
3. 重启开发服务器（Ctrl+C 然后重新运行 `npm run dev`）

### 问题：API 调用失败

**可能原因：**
- API Key 无效或已过期
- API 配额用完
- 网络连接问题

**解决方案：**
1. 检查 API Key 是否正确
2. 访问 [Google AI Studio](https://aistudio.google.com) 检查配额
3. 查看浏览器控制台的错误信息

### 问题：端口 3000 已被占用

**解决方案：**
```bash
# 使用其他端口
PORT=3001 npm run dev

# 或者关闭占用 3000 端口的程序
```

## 🌟 下一步

- 📖 阅读 [README.md](./README.md) 了解更多功能
- 🚀 查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 学习如何部署
- 💡 尝试不同的描述，探索 AI 的创造力！

## 🆘 需要帮助？

- 查看 [ENV_SETUP.md](./ENV_SETUP.md) 了解环境变量配置详情
- 在 GitHub 上提交 Issue
- 查看 [Next.js 文档](https://nextjs.org/docs)

---

**祝你使用愉快！** 🎉

如果成功生成了你的第一个 SVG，不要忘记：
- ⭐ 给项目点个 Star
- 📢 分享给你的朋友
- 🎨 创造更多精彩的设计！
