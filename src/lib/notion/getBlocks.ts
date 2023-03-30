import { to } from "../utils";
import {notion } from "./notion";
import { errorHandler } from "./error";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export async function getBlocks(pageId: string) {
  const [err, data] = await to(notion.blocks.children.list({
    block_id: pageId,
  }))
  if (err) {
    errorHandler(err)
    return
  }
  return data.results as BlockObjectResponse[]
}