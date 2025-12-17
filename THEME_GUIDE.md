# 主题切换功能使用指南

## 🌓 如何使用主题切换

### 在主应用中
1. 登录后，在页面右上角可以看到主题切换按钮
2. 按钮显示：
   - **暗色模式下**：显示太阳 ☀️ 图标（点击切换到亮色）
   - **亮色模式下**：显示月亮 🌙 图标（点击切换到暗色）
3. 点击按钮即可在明暗主题间切换

### 在登录页面
1. 右上角第一个按钮就是主题切换
2. 可以在登录前体验不同主题

## 🎨 主题特点

### 暗色主题（Dark Mode）
- 适合夜间使用，保护眼睛
- 深色背景，浅色文字
- 现代感强，专业氛围

### 亮色主题（Light Mode）
- 适合白天使用，清晰明亮
- 浅色背景，深色文字
- 简洁清爽，易于阅读

## 💾 自动保存

- 您的主题选择会自动保存
- 下次访问时自动应用上次的主题
- 无需重新设置

## ⚡ 性能优化

- 平滑的过渡动画
- 无页面闪烁
- 响应迅速

## 📱 移动端支持

- 完全响应式设计
- 在所有设备上都能完美切换
- 触摸友好的按钮大小

## 🔧 对开发者

### 如何在代码中使用主题

```typescript
import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
  const { theme, setTheme, toggleTheme } = useTheme();
  
  // 获取当前主题
  console.log(theme); // 'light' 或 'dark'
  
  // 切换主题
  toggleTheme();
  
  // 设置特定主题
  setTheme('dark');
}
```

### 使用 Tailwind 类名

```tsx
// 为不同主题设置不同样式
<div className="bg-white dark:bg-zinc-900 light:bg-gray-50">
  <p className="text-gray-900 dark:text-white light:text-gray-900">
    这段文字在不同主题下有不同颜色
  </p>
</div>
```

### 主题颜色变量

可以在 CSS 中使用主题变量：
```css
.my-element {
  background: hsl(var(--background));
  color: hsl(var(--foreground));
}
```

## 🐛 故障排除

### 问题：主题切换后没有变化
- 清除浏览器缓存
- 刷新页面
- 检查浏览器控制台是否有错误

### 问题：主题选择没有保存
- 检查浏览器是否允许 localStorage
- 确保没有在隐私模式下浏览

### 问题：某些元素颜色不对
- 这可能是 bug，请报告给开发者
- 临时解决：尝试切换主题两次

## 📞 获取帮助

如果遇到任何问题，请：
1. 查看浏览器控制台错误
2. 尝试清除缓存并刷新
3. 联系开发团队

---

**享受您的主题切换体验！** 🎉
