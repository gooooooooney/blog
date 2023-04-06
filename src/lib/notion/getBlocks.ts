import { to } from "../utils";
import {notion } from "./notion";
import { errorHandler } from "./error";
import { BlockObjectResponseWithChildren } from "@/types/notion-api";



export async function getBlocks(block_id: string) {
  const [err, data] = await to(notion.blocks.children.list({
    block_id,
  }))
  if (err) {
    errorHandler(err)
    return
  }
  let blocks = data.results as BlockObjectResponseWithChildren[]
  // Recursively get children
  for await (const block of blocks) {
    if (block.has_children) {
      const children = (await getBlocks(block.id))
      block.children = children
    }
  }
  return blocks
}