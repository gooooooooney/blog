<div align="center">
 <h1>Notion-Blog-NextJS</h1>
 This is the source code for my personal blog, built with Notion API and Next.js.
</div>
English / [简体中文](https://xianbai.me/learn-md/article/syntax/links.html)

## Why use Notion API and Next.js?

Building your own blog is a common requirement for many people learning React. Using Next.js 13's brand new routing system and Notion API can help you achieve this goal and bring many additional benefits.

First, using Next.js 13's brand new routing system can bring more flexible and excellent routing definition methods. The previous routing system required creating files in the pages directory to define the routing, but now you can define the routing anywhere in the project. This approach can make the project structure clearer and the routing definition more flexible. This is also one of the reasons why many people choose to use Next.js 13 to build their own blogs.

In addition, using Notion API can easily display Notion's page data as the content of the blog. This feature is very practical because Notion is a powerful document and database tool that can help you manage and organize blog content. Using Notion API can easily display this content in the blog without the need for manual copying and pasting.

Finally, building your own blog can also help you better learn React and Next.js. By building a blog yourself, you can more deeply understand the characteristics and advantages of these technologies, and can discover and solve some problems in practice. This is very helpful for learning React and Next.js and can also lay a good foundation for your future work.

In short, using Next.js 13's brand new routing system and Notion API to build your own blog is a very good choice. This can not only realize your blog dream but also help you better learn and master React and Next.js.


## Main features

- Build a blog using Next.js 13's brand new routing system, flexibly define routing, and make the project structure clearer;
- Use Notion API to display Notion's page data as the content of the blog, which is convenient for managing and organizing blog content;
- The homepage of the blog displays a list of articles, and clicking the article title takes you to the article details page;
- The article details page displays the title, release time, and body content of the article;
- The blog page is beautifully designed and responsive, adapting to different devices and screen sizes;
- Deploy using Vercel, customizable domain name, and easy to share and access.

These functions cover the basic requirements of the blog and use some features of Next.js 13 and Notion API. If you have other requirements, you can also modify and extend them as needed.

## Installation

1. Clone this project:

```
git clone <https://github.com/gooooooooney/blog.git>

```

1. Enter the project directory and install dependencies:

```
cd blog
pnpm install

```

1. Add Notion API token and database ID to the `.env` file:

```
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_notion_database_id

```

1. Start the development server:

```
pnpm dev

```

1. Access [http://localhost:3000](http://localhost:3000/) to view the blog page.

## How to deploy to Vercel

This blog can be easily deployed to Vercel, a cloud platform for static sites and serverless functions. To deploy the blog, follow these steps:

1. Create an account on Vercel and link it to your GitHub account.
2. Import the repository into Vercel.
3. Set the environment variables in Vercel by going to `Settings` > `Environment Variables` and adding the NOTION_API_KEY secret and the database ID NOTION_DATABASE_ID.
4. Deploy the project to Vercel.

## How to change the custom domain name in Vercel

To change the custom domain name in Vercel, follow these steps:

1. In Vercel, go to `Settings` > `Domains`.
2. Click the `Add` button and follow the instructions to add a custom domain name.
3. Go to your domain registrar and set up a CNAME record that points to the Vercel domain name.
4. Wait for the DNS changes to propagate, which may take up to 24 hours. After the changes propagate, your custom domain name should be in effect.

## File structure

- `/app`: This directory contains all Next.js pages, including the home page and article pages.
- `/public`: This directory contains all static assets, such as images and CSS files.
- `/lib`: This directory contains tool libraries for getting data from the Notion API, processing search results, and other useful functions.
- `/components`: This directory contains all React components used to render different parts of the blog.

## Contribution

If you want to contribute to this project, feel free to fork the repository and submit a pull request. Any form of contribution is welcome, whether it's fixing typos or adding new features.

## License

This project is released under the MIT license - see the [LICENSE](https://github.com/gooooooooney/blog/blob/main/LICENSE) file for details.

## Contact

If you have any questions or comments about this project, feel free to contact me through my [website](https://gooney-blog.vercel.app/) or [GitHub](https://github.com/gooooooooney).

This README.md was generated by ChatGPT.
