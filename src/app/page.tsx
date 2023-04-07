import Cards from "@/components/Cards"
import { getPages } from "@/lib/notion/getPages"

// The default is static rendering, but you can set the default revalidation frequency of a layout or page to n seconds.
// see https://beta.nextjs.org/docs/api-reference/segment-config#revalidate for more info on revalidate
export const revalidate = 10;


export default async function Home() {
  const data = await getPages();
  return (
    <main className="flex h-screen flex-col px-4  md:px-40 pt-10 min-h-screen">
      <Cards results={data!}/>
    </main>
  )
}
