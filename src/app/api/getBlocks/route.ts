import { getBlocks } from "@/lib/notion/getBlocks";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const blockId = searchParams.get('blockId')
  const blocks = await getBlocks(blockId!)
  return NextResponse.json(blocks)
}


