import Cards from "@/components/Cards"
import { getPagesByTitle } from "@/lib/notion/getPages"




type Props = {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function Page({searchParams}: Props) {
   const { query } = searchParams || {}
  const data = await getPagesByTitle(typeof query === 'string' ? query : undefined);

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
