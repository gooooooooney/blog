import { to } from "../utils";
import {notion } from "./notion";
import { errorHandler } from "./error";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";



export async function getBlocks(block_id: string, start_cursor?: string) {
  const [err, data] = await to(notion.blocks.children.list({
    block_id,
    start_cursor,
  }))
  if (err) {
    errorHandler(err)
    return
  }
  let results =  data.results as BlockObjectResponse[]
  if (data.has_more) {
    const moreResults = await getBlocks(block_id, data.next_cursor!)
    results = [...results, ...moreResults!]
  }
  return results
}