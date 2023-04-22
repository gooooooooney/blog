
import { PageObjectResponse, QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { PAGE_TYPES } from "@/constants/notion/pageTypes";
import { cn, formatLocalDate } from "@/lib/utils";
import { DayFormat } from "@/constants/day";
import Link from "next/link";
import Image from "next/image";
import RichText from "./NotionRender/RichText";
import { getTagsColor } from "./NotionRender/utils";


interface CardsProps {
  results: PageObjectResponse[];
}


const Cards: React.FC<CardsProps> = ({ results }) => {

  return (
    // <div className="flex items-center md:mx-auto">
    // <div className=" md:flex justify-start md:items-center md:flex-wrap mb-6">
    <div className=" md:grid md:gap-8 md:grid-cols-[repeat(auto-fill,minmax(360px,1fr))]">
      {
        results?.map((page) => {

          return (
            <Link
              className="flex transition-colors pb-3 rounded-2xl hover:bg-[rgba(255,255,255,.5)] hover:dark:bg-[rgba(0,0,0,.3)] flex-col"
              // className="basis-[30%] md:mr-[calc(10%/3)] mb-8 md:mb-[calc(10%/3)] md:[&:nth-child(3n)]:mr-0 "
              key={page.id}
              href={`/post/${page.id}`}
            >
              <div>
                <Image
                  className="object-cover rounded-2xl h-[25vh] object-center-right-notion w-full"
                  src={page.cover?.type === PAGE_TYPES.EXTERNAL ? page.cover.external.url : ''}
                  width={400}
                  height={200}
                  alt="blog img"
                />
              </div>
              <div className="flex flex-col gap-4 p-2">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">
                  {page.properties.Name.type === PAGE_TYPES.TITLE && <RichText rich_text={page.properties.Name.title} />}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400 ">
                  {page.properties.description.type === PAGE_TYPES.RICH_TEXT && <RichText rich_text={page.properties.description.rich_text} />}
                </p>
                {
                  page.properties.create_time?.type === PAGE_TYPES.CREATED_TIME && <p>{formatLocalDate(page.properties.create_time.created_time, DayFormat.ENGLISH)}</p>
                }
                {
                  page.properties.category?.type === PAGE_TYPES.MULTI_SELECT && <div className="flex items-center">
                    <p>{page.properties.category.multi_select.map(v => {
                      return <span key={v.id} className={cn("p-1 rounded-sm mr-2", getTagsColor(v.color))}>{v.name}</span>
                    })}</p>
                  </div>
                }
              </div>



            </Link>
          )
        })
      }
    </div>
    // </div>
  );
};

export default Cards;
