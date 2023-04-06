import { PAGE_TYPES } from "@/constants/notion/pageTypes";
import { getBlocks } from "@/lib/notion/getBlocks";
import { getPage } from "@/lib/notion/getPage";
import { getPages } from "@/lib/notion/getPages";
import Image from "next/image";
import NotionRender from "@/components/NotionRender";

export async function generateStaticParams() {
  const data = await getPages();
  return data?.map((page) => ({
    params: {
      id: page.id,
    },
  }));
}

export default async function Page({ params }: { params: { id: string } }) {
  const bc = getBlocks(params.id);
  const p = getPage(params.id);
  const [blocks, pageInfo] = await Promise.all([bc, p]);


  
  return (
    <div className="w-full">
      <div className="w-full">
        <Image
          className="w-full h-[30vh] object-cover opacity-100 block"
          width={200}
          height={40}
          src={pageInfo?.cover?.type === PAGE_TYPES.EXTERNAL ? pageInfo.cover.external.url : ''}
          alt="cover image"
        />
      </div>
      <div className="max-w-[90%] mx-auto md:max-w-[60%]">
        <div className="">
          <div className="h-16 w-16 text-7xl max-w-full -mt-[2.2rem]">{pageInfo?.icon?.type === PAGE_TYPES.EMOJI && <span>{pageInfo.icon.emoji}</span>}</div>
          <div className="my-10">
            <h1 className="text-5xl font-bold">{pageInfo?.properties.Name.type == PAGE_TYPES.TITLE ? pageInfo?.properties.Name.title[0].plain_text : ''}</h1>
          </div>
        </div>
      </div>
      <div className="max-w-[90%] md:max-w-[60%] mx-auto text-lg pb-[30vh]">
        {
          // TODO properties
          // pageInfo?.properties
        }

        <div>
          {blocks?.map((block) => {
            return (
              <div key={block.id}>
                <NotionRender block={block} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}