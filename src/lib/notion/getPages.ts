import { APIErrorCode, ClientErrorCode, isNotionClientError } from "@notionhq/client";
import { to } from "../utils";
import {notion, pageId } from "./notion";

export async function getPages() {
  const [err, data] = await to(notion.databases.query({
    database_id: pageId,
  }))
  if (err) {
    if (isNotionClientError(err)) {
      {
        switch (err.code) {
          case ClientErrorCode.RequestTimeout:
            console.error("Request timeout")
            break
          case APIErrorCode.ObjectNotFound:
            console.error("Object not found")
            break
          case APIErrorCode.Unauthorized:
            console.error("Unauthorized")
            break
          // ...
          default:
          // you could even take advantage of exhaustiveness checking
          console.error("Unknown error")
        }
      }
      return
    }
  }
  return data
}