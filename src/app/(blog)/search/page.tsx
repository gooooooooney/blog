import Cards from "@/components/Cards"
import { getPagesByTitle, getPublicPages } from "@/lib/notion/getPages"
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"




type Props = {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function Page({searchParams}: Props) {
  const { query, tag } = searchParams || {}
  let data:PageObjectResponse[] | undefined = undefined
  let filter = undefined
  if (tag) {
    filter = {
      and: [
        {
          property: 'category',
          multi_select: {
            contains: tag as string || 'all',
          },
        },
      ]
    }
    data = await getPublicPages({
      filter
    });
  }
  if (query) {
    data = await getPagesByTitle(typeof query === 'string' ? query : undefined);
  }
  

  return (
    <main  className="overflow-y-scroll h-screen min-h-screen pb-32 pt-14">
      <div className="flex  flex-col  px-4 md:mx-auto md:max-w-[80%]  md:px-40  ">
        {
          data?.length ? <Cards results={data!}/> : <div className="text-center">No results found</div>
        }
      </div>
    </main>
  )
}
