import Cards from "@/components/Cards"
import { getPages } from "@/lib/notion/getPages"

async function getData() {
  const data = await getPages();
  return data!;
}

export default async function Home() {
  const data = await getData();
  return (
    <main className="flex h-screen flex-col px-4  md:px-40 pt-10 min-h-screen">
      <Cards results={data.results}/>
    </main>
  )
}
