# 🤝 贡献指南

感谢你对 SVG Generator 项目的关注！我们欢迎所有形式的贡献。

## 📋 贡献方式

### 1. 报告问题 (Bug Reports)

发现了问题？请：
- 在 GitHub Issues 中搜索是否已有相同问题
- 如果没有，创建新 Issue
- 包含以下信息：
  - 问题描述
  - 复现步骤
  - 预期行为
  - 实际行为
  - 截图（如适用）
  - 环境信息（浏览器、Node.js 版本等）

### 2. 功能建议 (Feature Requests)

有好想法？请：
- 创建 Issue 并标记为 "enhancement"
- 描述功能的用例和价值
- 如果可能，提供设计草图或示例

### 3. 提交代码 (Pull Requests)

#### 开始之前

1. **Fork 项目**
   ```bash
   # 在 GitHub 上点击 Fork 按钮
   ```

2. **克隆你的 Fork**
   ```bash
   git clone https://github.com/你的用户名/svg-generator.git
   cd svg-generator
   ```

3. **设置上游仓库**
   ```bash
   git remote add upstream https://github.com/原作者/svg-generator.git
   ```

4. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/bug-description
   ```

#### 开发流程

1. **安装依赖**
   ```bash
   npm install
   ```

2. **配置环境变量**
   ```bash
   cp .env.local.example .env.local
   # 编辑 .env.local 添加你的 API Key
   ```

3. **开发**
   ```bash
   npm run dev
   ```

4. **遵循代码规范**
   - 使用 TypeScript
   - 遵循现有的代码风格
   - 添加适当的注释
   - 保持组件小而专注

5. **测试你的更改**
   - 确保应用正常运行
   - 测试所有相关功能
   - 检查不同浏览器的兼容性

6. **构建测试**
   ```bash
   npm run build
   npm run start
   ```

7. **代码检查**
   ```bash
   npm run lint
   ```

#### 提交代码

1. **提交更改**
   ```bash
   git add .
   git commit -m "类型: 简短描述"
   ```

   提交信息格式：
   - `feat: 添加新功能`
   - `fix: 修复问题`
   - `docs: 更新文档`
   - `style: 代码格式化`
   - `refactor: 代码重构`
   - `perf: 性能优化`
   - `test: 添加测试`
   - `chore: 构建/工具变更`

2. **推送到你的 Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

3. **创建 Pull Request**
   - 访问你的 Fork 在 GitHub 上的页面
   - 点击 "New Pull Request"
   - 填写 PR 描述：
     - 更改内容
     - 相关 Issue（如果有）
     - 测试说明
     - 截图（如适用）

## 📝 代码规范

### TypeScript

```typescript
// ✅ 正确：明确的类型定义
interface Props {
  title: string;
  onSubmit: (value: string) => void;
}

// ❌ 错误：any 类型
const handleData = (data: any) => { ... }
```

### React 组件

```typescript
// ✅ 正确：函数组件 + TypeScript
export const MyComponent: React.FC<Props> = ({ title, onSubmit }) => {
  return <div>{title}</div>;
};

// ✅ 正确：使用 hooks
const [state, setState] = useState<string>('');
```

### 样式

```typescript
// ✅ 正确：使用 Tailwind 类
<div className="flex items-center justify-between p-4 bg-zinc-900 rounded-xl">

// ❌ 避免：内联样式（除非必要）
<div style={{ padding: '16px' }}>
```

### API 路由

```typescript
// ✅ 正确：输入验证
if (!input || typeof input !== 'string') {
  return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
}

// ✅ 正确：错误处理
try {
  // ... 业务逻辑
} catch (error) {
  console.error('Error:', error);
  return NextResponse.json({ error: 'Internal error' }, { status: 500 });
}
```

## 🎯 优先级领域

我们特别欢迎以下方面的贡献：

### 高优先级

- 🐛 Bug 修复
- 📱 响应式设计改进
- ♿ 可访问性（a11y）增强
- 🚀 性能优化
- 🔒 安全性改进

### 中优先级

- ✨ 新功能
- 🎨 UI/UX 改进
- 📚 文档完善
- 🌐 国际化（i18n）

### 欢迎讨论

- 🧪 测试框架集成
- 📊 分析和监控
- 🔄 CI/CD 改进
- 🎭 动画效果

## 🚫 不接受的贡献

- 破坏性更改（除非有充分理由）
- 大规模重构（请先讨论）
- 添加不必要的依赖
- 移除核心功能
- 降低安全性的更改

## 🔍 代码审查

所有 PR 将经过审查，可能会：

- 请求更改
- 提出建议
- 要求测试
- 要求文档更新

请耐心等待，并积极响应反馈。

## 📄 许可证

贡献代码即表示你同意：
- 代码在 Apache-2.0 许可下发布
- 你拥有代码的版权或有权贡献

## 🌟 贡献者

感谢所有贡献者！

（这里可以添加贡献者列表）

## 💬 交流

- GitHub Issues: 技术讨论和问题报告
- GitHub Discussions: 一般讨论和问答

## ✅ PR 检查清单

提交 PR 前，请确认：

- [ ] 代码遵循项目风格
- [ ] 已测试所有更改
- [ ] 构建成功（`npm run build`）
- [ ] Lint 通过（`npm run lint`）
- [ ] 更新了相关文档
- [ ] PR 描述清晰完整
- [ ] 提交信息格式正确
- [ ] 没有提交敏感信息（API Keys等）
- [ ] 分支基于最新的 main 分支

## 🎓 学习资源

不熟悉某些技术？这些资源可以帮助你：

- [Next.js 教程](https://nextjs.org/learn)
- [React 文档](https://react.dev/learn)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [如何贡献开源项目](https://opensource.guide/how-to-contribute/)

## 💖 致谢

再次感谢你的贡献！每一个 PR、Issue 和建议都让这个项目变得更好。

---

**Happy Coding!** 🚀
