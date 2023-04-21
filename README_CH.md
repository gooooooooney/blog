# Notion-Blog-NextJS


<div align="center">
 <h1>Notion-Blog-NextJS</h1>
 [English](./README.md) / 简体中文
 这是我个人博客的源代码，使用了 Notion API 和 Next.js 构建。
</div>
## 为什么使用 Notion API 和 Next.js？

搭建自己的博客是很多人学习 React 的一个常见需求。而使用 Next.js 13 的全新路由系统和 Notion API 可以帮助你实现这个目标，而且带来了许多额外的好处。

首先，使用 Next.js 13 的全新路由系统可以带来更加灵活和优秀的路由定义方式。以往的路由系统需要在 pages 目录下创建文件来定义路由，而现在你可以在项目中任意定义路由。这种方式既可以使项目的结构更加清晰，也可以让路由的定义更加灵活。这也是很多人选择使用 Next.js 13 搭建自己博客的原因之一。

另外，使用 Notion API 可以让你轻松地将 Notion 中的页面数据作为博客的内容进行展示。这个功能非常实用，因为 Notion 是一个功能强大的文档和数据库工具，可以帮助你管理和组织博客的内容。使用 Notion API 可以让你轻松地将这些内容展示在博客中，而不需要手动进行复制和粘贴。

最后，搭建自己的博客还可以帮助你更好地学习 React 和 Next.js。通过自己动手搭建一个博客，你可以更加深入地了解这些技术的特点和优势，并且可以在实践中发现并解决一些问题。这对于学习 React 和 Next.js 是非常有帮助的，同时也可以为你以后的工作打下一个良好的基础。

总之，使用 Next.js 13 的全新路由系统和 Notion API 来搭建自己的博客是一个非常不错的选择。这不仅可以实现你的博客梦想，还可以帮助你更好地学习和掌握 React 和 Next.js。

## 主要功能

- 使用 Next.js 13 的全新路由系统搭建博客，灵活定义路由，使项目结构更加清晰；
- 使用 Notion API 将 Notion 中的页面数据作为博客的内容进行展示，方便管理和组织博客内容；
- 博客首页展示文章列表，点击文章标题可进入文章详情页；
- 文章详情页展示文章的标题、发布时间和正文内容；
- 博客页面美观、响应式设计，适配不同的设备和屏幕大小；
- 使用 Vercel 进行部署，可自定义域名，方便分享和访问。

这些功能覆盖了博客的基本需求，同时使用了 Next.js 13 和 Notion API 的一些特性。如果你有其他的需求，也可以根据需要进行修改和扩展。


## 安装

1. 克隆该项目：

```bash
git clone https://github.com/gooooooooney/blog.git
```

2. 进入项目目录并安装依赖：

```bash
cd blog
pnpm install
```

1. 在 `.env` 文件中添加 Notion API 的 token 和数据库 ID：

```bash
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_notion_database_id
```

4. 启动开发服务器：

```bash
pnpm dev
```

5. 访问 http://localhost:3000 即可查看博客页面。

## 如何部署到 Vercel

此博客可以轻松部署到 Vercel，这是一个用于静态站点和无服务器功能的云平台。要部署博客，请按照以下步骤操作：

1. 在 Vercel 上创建帐户并将其链接到您的 GitHub 帐户。
2. 将存储库导入到 Vercel。
3. 通过转到 `Settings` > `Environment Variables` 并添加 NOTION_API_KEY 密钥和数据库ID NOTION_DATABASE_ID 来设置 Vercel 中的环境变量。
4. 将项目部署到 Vercel。

## 如何在 Vercel 更改自定义域名

要在 Vercel 中更改自定义域名，请按照以下步骤操作：

1. 在 Vercel 中，转到 `Settings` > `Domains`。
2. 单击 `Add` 按钮并按照说明添加自定义域名。
3. 转到您的域名注册商并设置指向 Vercel 域名的 CNAME 记录。
4. 等待 DNS 更改传播，可能需要最多 24 小时。更改传播后，您的自定义域名应该已经生效。

## 文件结构

- `/app`：此目录包含所有 Next.js 页面，包括首页、文章页面。
- `/public`：此目录包含所有静态资产，例如图像和 CSS 文件。
- `/lib`：此目录包含用于从 Notion API 中获取数据、处理搜索结果以及其他实用功能的工具库。
- `/components`：此目录包含所有 React 组件，用于呈现博客的不同部分。


## 贡献

如果您想为此项目做出贡献，请随时 fork 存储库并提交 pull request。欢迎任何形式的贡献，无论是修正错别字还是添加新功能。

## 许可证

本项目基于 MIT 许可证发布 - 详见 [LICENSE](https://github.com/gooooooooney/blog/blob/main/LICENSE) 文件。

## 联系方式

如果您对此项目有任何疑问或意见，请随时通过我的[网站](https://gooney-blog.vercel.app)或 [GitHub](https://github.com/gooooooooney) 联系我。

说明: 这个 README.md 是由 ChatGPT 生成的.