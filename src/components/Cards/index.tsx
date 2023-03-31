
import { PageObjectResponse, QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { Card } from "../ui/Card";
import { NotionQueryRichTextRes, NotionQueryTitleRes } from "@/types/notion-api";
import { PAGE_TYPES } from "@/constants/notion/pageTypes";


interface CardsProps {
  results: QueryDatabaseResponse['results'];
}


const Cards: React.FC<CardsProps> = ({ results }) => {


  return (
    <div className="flex justify-center items-center">
      <div className=" md:flex justify-start md:items-center md:flex-wrap">
        {
          (results as PageObjectResponse[]).map((page) => {

            return (
              <Card
                className="basis-[30%] md:mr-[calc(10%/3)] mb-8 md:mb-[calc(10%/3)] md:[&:nth-child(3n)]:mr-0 md:w-52"
                key={page.id}
                href={`/post/${page.id}`}
                imgAlt="post alt"
                imgSrc={page.cover?.type === PAGE_TYPES.EXTERNAL ? page.cover.external.url : ''}
              >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-ellipsis overflow-hidden whitespace-nowrap">
                  {(page.properties.Name as NotionQueryTitleRes).title[0].plain_text}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {(page.properties.description as NotionQueryRichTextRes)?.rich_text[0].plain_text}
                </p>
                <p></p>
              </Card>
              // <>
              //   {
              //     results.map((page) => {
              //       return <div key={page.id}>{page.id}</div>
              //     })
              //   }
              // </>
            )
          })
        }
      </div>
    </div>
  );
};

export default Cards;
