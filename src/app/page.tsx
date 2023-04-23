import Cards from "@/components/Cards"
import { getPublicPages } from "@/lib/notion/getPages"

// The default is static rendering, but you can set the default revalidation frequency of a layout or page to n seconds.
// see https://beta.nextjs.org/docs/api-reference/segment-config#revalidate for more info on revalidate
export const revalidate = 10;



type Props = {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function Home({searchParams}: Props) {
   const { title, category } = searchParams || {}
   let filter = undefined
   if (category) {
    filter = {
      filter: {
        and: [
          {
            property: 'category',
            multi_select: {
              contains: category as string || 'all',
            },
          },
        ]
      }
    }
   }
  const data = await getPublicPages(filter);

  return (
    <main  className="overflow-y-scroll h-screen min-h-screen pb-32 pt-14">
      <div className="flex  flex-col  px-4 md:mx-auto md:max-w-[80%]  md:px-40  ">
      <Cards results={data!}/>
      </div>
    </main>
  )
}
