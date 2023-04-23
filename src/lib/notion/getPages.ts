import { to } from "../utils";
import { notion, dbId } from "./notion";
import { errorHandler } from "./error";
import { PageObjectResponse, QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";

export async function getPages(body?: Omit<QueryDatabaseParameters, 'database_id'>) {
  const [err, data] = await to(notion.databases.query({
    database_id: dbId,
    ...body
  }))
  if (err) {
    errorHandler(err)
    return
  }
  return data.results as PageObjectResponse[]
}

export const getPublicPages = async (body?: Omit<QueryDatabaseParameters, 'database_id'>) => {
  // // filter out the pages that are not public
  return await getPages({
    filter: Object.assign({
      property: 'hidden',
      status: {
        equals: "public"
      }
    }, body?.filter),
    ...body
  })
}

export const getPagesByTitle = async (query?: string) => {
  const [err, data] = await to(notion.search({
    query,
    filter: {
      value: 'page',
      property: 'object'
    },
    sort: {
      direction: 'ascending',
      timestamp: 'last_edited_time'
    },
  }));
  if (err) {
    errorHandler(err)
    return
  }
  return data.results as PageObjectResponse[]
}