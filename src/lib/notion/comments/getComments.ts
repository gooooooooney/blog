import { to } from "@/lib/utils"
import { notion } from "../notion"
import { errorHandler } from "../error"
import { ListCommentsParameters } from "@notionhq/client/build/src/api-endpoints"


export async function getPage(reqBody: ListCommentsParameters) {
  const [err, data] = await to(notion.comments.list(reqBody))
  if (err) {
    errorHandler(err)
    return
  }
  return (data )
}