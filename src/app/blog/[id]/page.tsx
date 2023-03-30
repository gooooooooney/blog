import { PAGE_TYPES } from "@/constants/pageTypes";
import { getBlocks } from "@/lib/notion/getBlocks";
import { getPage } from "@/lib/notion/getPage";
import { getPages } from "@/lib/notion/getPages";
import Image from "next/image";

export async function generateStaticParams() {
  const data = await getPages();
  return data?.map((page) => ({
    params: {
      id: page.id,
    },
  }));
}

async function getBlockChildren(id: string) {
  const data = await getBlocks(id);
  return data;
}

async function getPageInfo(id: string) {
  const data = await getPage(id);
  return data;
}

export default async function Page({ params }: { params: { id: string } }) {
  const bc = getBlockChildren(params.id);
  const p = getPageInfo(params.id);
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
      <div className="max-w-[90%] md:max-w-[60%] text-lg mx-auto">


        <div>
          {
            blocks?.map((block) => {
              return <div key={block.id}>{
                <p>{block[block.type].rich_text[0].plain_text}</p>
              }</div>
            })
          }
          {params.id}
        </div>
      </div>
    </div>
  )
}