# 🏗️ 项目架构说明

## 📁 项目结构

```
svg-generator/
├── app/                          # Next.js App Router 目录
│   ├── api/                      # API 路由
│   │   └── generate-svg/
│   │       └── route.ts          # SVG 生成 API（后端）
│   ├── globals.css               # 全局样式
│   ├── layout.tsx                # 根布局组件
│   └── page.tsx                  # 主页面（前端）
│
├── components/                   # React 组件
│   ├── Header.tsx                # 页头组件
│   ├── InputSection.tsx          # 输入表单组件
│   └── SvgPreview.tsx           # SVG 预览组件
│
├── types.ts                      # TypeScript 类型定义
│
├── .env.local                    # 环境变量（本地，不提交）
├── .env.local.example           # 环境变量示例
├── .gitignore                    # Git 忽略文件
│
├── next.config.ts                # Next.js 配置
├── tsconfig.json                 # TypeScript 配置
├── tailwind.config.ts            # Tailwind CSS 配置
├── postcss.config.mjs            # PostCSS 配置
│
├── package.json                  # 依赖和脚本
├── vercel.json                   # Vercel 部署配置
│
└── 文档/
    ├── README.md                 # 项目介绍
    ├── QUICKSTART.md            # 快速开始指南
    ├── DEPLOYMENT.md            # 部署指南
    ├── ENV_SETUP.md             # 环境配置说明
    ├── SECURITY.md              # 安全检查清单
    └── ARCHITECTURE.md          # 本文件
```

## 🔄 数据流

### SVG 生成流程

```
用户输入
    ↓
[前端] InputSection.tsx
    ↓ (用户点击生成)
[前端] page.tsx (handleGenerate)
    ↓ (HTTP POST /api/generate-svg)
────────────────────────────────────
[后端] app/api/generate-svg/route.ts
    ↓ (验证输入)
    ↓ (使用 GOOGLE_API_KEY)
[AI] Google Gemini API
    ↓ (返回 SVG 内容)
[后端] route.ts (清理和验证)
    ↓ (返回 JSON)
────────────────────────────────────
[前端] page.tsx (接收响应)
    ↓ (更新状态)
[前端] SvgPreview.tsx
    ↓
显示 SVG 给用户
```

### 安全边界

```
┌─────────────────────────────────────┐
│         前端（浏览器）                 │
│  - 用户界面                           │
│  - 状态管理                           │
│  - HTTP 请求                         │
│  ❌ 无法访问 API Key                  │
└─────────────────────────────────────┘
            ↕️  HTTPS
┌─────────────────────────────────────┐
│      后端（服务器/Serverless）        │
│  - API 路由                          │
│  - 环境变量                           │
│  - Gemini AI 调用                    │
│  ✅ 拥有 API Key                      │
└─────────────────────────────────────┘
```

## 🎯 核心组件说明

### 1. 前端组件

#### `app/page.tsx` (主页面)
- **职责**: 应用主入口，状态管理
- **状态**:
  - `status`: 生成状态（IDLE/LOADING/SUCCESS/ERROR）
  - `currentSvg`: 当前生成的 SVG 数据
  - `error`: 错误信息
- **关键方法**:
  - `handleGenerate()`: 调用 API 生成 SVG

#### `components/InputSection.tsx` (输入组件)
- **职责**: 接收用户输入
- **功能**:
  - 文本输入框
  - 快速建议按钮
  - 加载状态显示
  - 表单验证

#### `components/SvgPreview.tsx` (预览组件)
- **职责**: 显示生成的 SVG
- **功能**:
  - SVG 渲染（使用 `dangerouslySetInnerHTML`）
  - 下载 SVG 文件
  - 复制 SVG 代码
  - 元数据显示

#### `components/Header.tsx` (页头组件)
- **职责**: 应用顶部导航
- **功能**:
  - 品牌展示
  - 外部链接

### 2. 后端 API

#### `app/api/generate-svg/route.ts`
- **类型**: Next.js API Route (Serverless Function)
- **方法**: `POST`
- **输入**:
  ```typescript
  {
    prompt: string  // 用户的描述
  }
  ```
- **输出**:
  ```typescript
  {
    svgContent: string,  // 生成的 SVG 代码
    prompt: string       // 原始提示词
  }
  ```
- **错误处理**:
  - 400: 无效输入
  - 500: API Key 未配置或 Gemini API 错误

### 3. 类型定义 (`types.ts`)

```typescript
// SVG 数据结构
interface GeneratedSvg {
  id: string;
  content: string;
  prompt: string;
  timestamp: number;
}

// 生成状态enum GenerationStatus {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR
}

// 错误信息
interface ApiError {
  message: string;
  details?: string;
}
```

## 🔌 API 集成

### Google Gemini AI 配置

```typescript
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ 
  apiKey: process.env.GOOGLE_API_KEY 
});

const response = await ai.models.generateContent({
  model: 'gemini-2.0-flash-exp',
  contents: prompt,
  config: {
    systemInstruction: '...',  // SVG 专家提示词
    temperature: 0.4,           // 降低随机性
    topP: 0.95,
    topK: 40,
  },
});
```

### 系统提示词策略

精心设计的系统提示词确保：
- 输出纯 SVG 代码（不包含 markdown）
- 高质量的视觉效果
- 包含 viewBox 属性
- 自包含（无外部依赖）

## 🎨 样式架构

### Tailwind CSS 工作流

1. **全局样式** (`app/globals.css`)
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   
   /* 自定义基础样式 */
   body {
     background: linear-gradient(...);
   }
   ```

2. **组件样式**
   - 使用 Tailwind 实用类
   - 动态类名基于状态
   - 响应式设计（`sm:`, `md:`, `lg:`）

3. **设计系统**
   - 颜色: zinc 调色板为主
   - 渐变: indigo/purple/pink
   - 圆角: rounded-xl, rounded-2xl
   - 阴影: shadow-lg, shadow-2xl

## 🚀 构建和部署

### 开发模式

```bash
npm run dev
```
- 启动 Next.js 开发服务器
- 热重载
- 源代码映射
- 详细错误信息

### 生产构建

```bash
npm run build
```

构建产物：
- `.next/server/`: 服务器端代码
- `.next/static/`: 静态资源
- API Routes → Serverless Functions

### 部署（Vercel）

1. **自动检测**: Vercel 自动识别 Next.js
2. **环境变量**: 在 Vercel Dashboard 配置
3. **函数**: API Routes 自动部署为 Edge Functions
4. **CDN**: 静态资源通过 CDN 分发

## 🔒 安全架构

### 层级防护

1. **环境变量层**
   - `.env.local` (开发)
   - 平台环境变量 (生产)
   - 绝不提交到 Git

2. **代码层**
   - API Key 只在 API Route 中使用
   - 前端无法访问 `process.env.GOOGLE_API_KEY`
   - TypeScript 类型检查

3. **网络层**
   - HTTPS 加密传输
   - Same-origin API 调用
   - 无 CORS 暴露

4. **输入验证层**
   - 后端验证所有输入
   - 类型检查
   - 边界检查

## 📊 性能优化

### Next.js 优化

- **自动代码分割**: 每个页面独立打包
- **图片优化**: （本项目未使用，但可添加）
- **字体优化**: 使用 next/font
- **预渲染**: 静态页面预生成

### 运行时优化

- **React 18**: 并发渲染
- **Memoization**: 使用 `useCallback`
- **懒加载**: 动态导入（可扩展）

## 🧪 可扩展性

### 未来可添加功能

1. **用户认证**
   ```typescript
   // app/api/generate-svg/route.ts
   // 添加认证中间件
   const session = await getSession(request);
   if (!session) return unauthorized();
   ```

2. **历史记录**
   ```typescript
   // 使用数据库存储
   const history = await db.svgs.create({
     userId: session.userId,
     content: svgContent,
     prompt: prompt,
   });
   ```

3. **速率限制**
   ```typescript
   // 添加 rate limiting
   import { rateLimit } from '@/lib/rate-limit';
   await rateLimit(request);
   ```

4. **SVG 编辑器**
   - 集成在线 SVG 编辑工具
   - 允许用户微调生成的 SVG

5. **批量生成**
   - 支持一次生成多个变体
   - 队列系统

## 📈 监控和日志

### 推荐集成

```typescript
// app/api/generate-svg/route.ts

// 添加监控
import * as Sentry from '@sentry/nextjs';

try {
  // ... API 逻辑
} catch (error) {
  Sentry.captureException(error);
  // ...
}

// 添加分析
import { Analytics } from '@vercel/analytics';
```

## 📚 技术决策

### 为什么选择 Next.js?

- ✅ 内置 API Routes（后端支持）
- ✅ 优秀的开发体验
- ✅ 零配置部署（Vercel）
- ✅ TypeScript 原生支持
- ✅ 性能优化自动化

### 为什么使用 App Router?

- ✅ 最新的 Next.js 架构
- ✅ 更好的性能
- ✅ Server Components支持
- ✅ 简化的数据获取

### 为什么使用 Tailwind CSS?

- ✅ 开发速度快
- ✅ 一致的设计系统
- ✅ 优秀的生产优化
- ✅ 响应式设计简单

## 🔗 依赖说明

### 核心依赖

| 包名 | 版本 | 用途 |
|------|------|------|
| `next` | ^15.1.0 | 框架核心 |
| `react` | ^19.0.0 | UI 库 |
| `@google/genai` | ^1.29.1 | Gemini AI SDK |
| `lucide-react` | ^0.553.0 | 图标库 |

### 开发依赖

| 包名 | 版本 | 用途 |
|------|------|------|
| `typescript` | ~5.8.2 | 类型检查 |
| `tailwindcss` | ^3.4.0 | CSS 框架 |
| `eslint` | ^9.0.0 | 代码检查 |

## 🎓 学习资源

- [Next.js 文档](https://nextjs.org/docs)
- [React 文档](https://react.dev)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Google AI SDK](https://ai.google.dev/docs)

---

**本架构设计注重**：
- 🔒 **安全性**: API Key 保护
- ⚡ **性能**: 优化的构建和加载
- 🎨 **用户体验**: 流畅的交互
- 🚀 **可部署性**: 一键部署
- 📈 **可扩展性**: 易于添加新功能

有问题？查看其他文档或提交 Issue！
