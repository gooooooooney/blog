import { to } from "../utils";
import { notion, dbId } from "./notion";
import { errorHandler } from "./error";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { PAGE_TYPES } from "@/constants/notion/pageTypes";

export async function getPages() {
  const [err, data] = await to(notion.databases.query({
    database_id: dbId,
  }))
  if (err) {
    errorHandler(err)
    return
  }
  return data.results as PageObjectResponse[]
}

export const getPublicPages = async () => {
  const data = await getPages();
  // filter out the pages that are not public
  return data?.filter(page => page.properties.hidden.type === PAGE_TYPES.STATUS && page.properties.hidden.status?.name === 'public')
}