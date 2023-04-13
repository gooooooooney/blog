import { PAGE_TYPES } from "@/constants/notion/pageTypes";
import { getBlocks } from "@/lib/notion/getBlocks";
import { getPage } from "@/lib/notion/getPage";
import { getPublicPages } from "@/lib/notion/getPages";
import Image from "next/image";
import NotionRender from "@/components/NotionRender";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";
import dayjs from 'dayjs'
import Divider from "@/components/NotionRender/Dividder";
import { DayFormat } from "@/constants/day";
import { Metadata } from "next";
import ModalLogin from "@/components/ModalLogin";

export async function generateStaticParams() {
  const data = await getPublicPages();
  return data?.map((page) => ({
    params: {
      id: page.id,
    },
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const p = await getPage(params.id);
  let keywords = ''
  let description = ''
  Object.entries(p?.properties || {}).forEach(([key, value]) => {
    switch (value.type) {
      case PAGE_TYPES.MULTI_SELECT:
        if (key === 'meta') {
          keywords = value.multi_select?.map(v => v.name).join(',')
        }
        break;
      case PAGE_TYPES.RICH_TEXT:
        if (key === 'description') {
          description = value.rich_text[0]?.plain_text
        }
        break;
      default:
        break;
    }
  });
  const getShortcutIcon = (icon: string) => {
    return `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${icon}</text></svg>`
  }
  return {
    title: p?.properties.Name.type == PAGE_TYPES.TITLE ? p?.properties.Name.title[0].plain_text : 'notion with nextjs',
    keywords,
    viewport: 'width=device-width, initial-scale=1.0, user-scalable=no,minimum-scale=1.0, maximum-scale=1.0',
    description,
    icons: {
      shortcut: getShortcutIcon(p?.icon?.type === PAGE_TYPES.EMOJI && p.icon.emoji || "🇨🇳"),
    },
  }
}

export default async function Page({ params, searchParams }: { params: { id: string }, searchParams: { [key: string]: string | string[] | undefined }}) {
  const bc = getBlocks(params.id);
  const p = getPage(params.id);
  
  const [blocks, pageInfo] = await Promise.all([bc, p]);
  const hasPermission = pageInfo?.properties.password.type === PAGE_TYPES.RICH_TEXT && pageInfo.properties.password.rich_text[0]?.plain_text === searchParams?.password

  // Filter out meta and description
  const properties = Object.entries(pageInfo?.properties || {}).filter(([key]) => key !== 'meta' && key !== 'description');

  if (!hasPermission) {
    return <div className="md:w-1/2 mx-auto flex justify-center items-center mt-10 " >
      <ModalLogin/>
    </div>
  }

  return (
    <div className="overflow-y-scroll h-[calc(100vh-56px)]" id="container">
      <div className="w-full md:w-[70%] md:mx-auto">
        <Image
          className="w-full h-[30vh] object-cover opacity-100 block md:rounded-3xl"
          width={200}
          height={40}
          src={pageInfo?.cover?.type === PAGE_TYPES.EXTERNAL ? pageInfo.cover.external.url : ''}
          alt="cover image"
        />
      </div>
      <div className="max-w-[90%] mx-auto md:max-w-[50%]">
        <div className="">
          <div className="h-16 w-16 text-7xl max-w-full -mt-[2.2rem]">{pageInfo?.icon?.type === PAGE_TYPES.EMOJI && <span>{pageInfo.icon.emoji}</span>}</div>
          <div className="my-10">
            <h1 className="text-[2em] leading-[1] font-bold">{pageInfo?.properties.Name.type == PAGE_TYPES.TITLE ? pageInfo?.properties.Name.title[0].plain_text : ''}</h1>
          </div>
        </div>
      </div>
      <div className="max-w-[90%] md:max-w-[50%] mx-auto pb-[5vh]">
        <div className="mb-3">
          {
            // TODO properties
            properties.map(([key, value]) => {
              switch (value.type) {
                // case PAGE_TYPES.RICH_TEXT:
                //   return (
                //     <div key={key} className="flex">
                //       <h2 className="text-xs font-bold mr-5">{key}</h2>
                //       <RichText rich_text={value.rich_text} />
                //     </div>
                //   )
                // case PAGE_TYPES.NUMBER:
                //   return (
                //     <div key={key} className="flex">
                //       <h2 className="text-xs font-bold mr-5">{key}</h2>
                //       <p>{value.number}</p>
                //     </div>
                //   )
                case PAGE_TYPES.CREATED_TIME:
                  return (
                    <div key={key} className="flex my-2 items-center">
                      <p className="mr-5">
                        <Icons.CalendarDays />
                      </p>
                      <p>{dayjs(value.created_time).format(DayFormat.GENERAl_WITH_DAY_OF_WEEK)}</p>
                    </div>
                  )
                // case PAGE_TYPES.DATE:
                //   return (
                //     <div key={key} className="flex">
                //       <h2 className="text-xs font-bold mr-5">{key}</h2>
                //       <p>{value.date?.start}</p>
                //     </div>
                //   )
                // case PAGE_TYPES.SELECT:
                //   return (
                //     <div key={key} className="flex">
                //       <h2 className="text-xs font-bold mr-5">{key}</h2>
                //       <p>{value.select?.name}</p>
                //     </div>
                //   )
                case PAGE_TYPES.MULTI_SELECT:

                  return (
                    <div key={key} className="flex items-center">
                      <p className="mr-5">
                        <Icons.Tags />
                      </p>
                      <p>{value.multi_select.map(v => {
                        //  "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "red";
                        const colors = {
                          "default": "bg-gray-400",
                          "gray": "bg-gray-400",
                          "brown": "bg-brown-400",
                          "orange": "bg-orange-400",
                          "yellow": "bg-yellow-400",
                          "green": "bg-green-400",
                          "blue": "bg-blue-400",
                          "purple": "bg-purple-400",
                          "pink": "bg-pink-400",
                          "red": "bg-red-400",
                        }
                        return <span key={v.id} className={cn("p-1 rounded-sm mr-2", colors[v.color])}>{v.name}</span>
                      })}</p>
                    </div>
                  )
                default:
                  return ""
              }
            })
          }
        </div>
        <Divider />
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