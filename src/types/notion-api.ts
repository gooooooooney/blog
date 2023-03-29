import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export type NotionQueryRichTextRes = {
  type: "rich_text";
  rich_text: Array<RichTextItemResponse>;
  id: string;
}

export type NotionQueryTitleRes = {
  type: "title";
  title: Array<RichTextItemResponse>;
  id: string;
}