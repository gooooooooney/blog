import { Client } from "@notionhq/client"
export const dbId = process.env.NOTION_DATABASE_ID as string
export const notion = new Client({ auth: process.env.NOTION_KEY })
