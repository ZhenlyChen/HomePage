# HomePage

主页生成器

根据配置文件生成自己的个人主页，展示个人信息。

## Function

- 多种主题、自定义主题(基于 EJS 模板)
- 识别并编译 Less 文件为 CSS
- 多语言支持
- 支持开发模式(实时刷新预览)

## Usage

### Step 1

编辑配置文件 `config.json`

### Step 2

```bash
npm run dev # 开发模式

npm run build # 生成静态文件
```

## Themes

### green-mountain

经典主题，翠绿山峦

- 根据 RSS 资源动态渲染博客最新文章
- 展示个人项目

## Change Log

### V0.1.1

- 新增开发模式
- 添加主题默认配置
- 支持自定义资源

### V0.1

- 初始版本发布

## RoadMap

- 支持开发模式增量更新
- 完善错误提示
