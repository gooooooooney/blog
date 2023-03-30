import { to } from "../utils";
import {notion } from "./notion";
import { errorHandler } from "./error";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export async function getPage(pageId: string) {
  const [err, data] = await to(notion.pages.retrieve({
    page_id: pageId,
  }))
  if (err) {
    errorHandler(err)
    return
  }
  return (data as PageObjectResponse)
}