
import { PageObjectResponse, QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { Card } from "../ui/Card";
import { PAGE_TYPES } from "@/constants/notion/pageTypes";


interface CardsProps {
  results: QueryDatabaseResponse['results'];
}


const Cards: React.FC<CardsProps> = ({ results }) => {


  return (
    <div className="flex items-center">
      <div className=" md:flex justify-start md:items-center md:flex-wrap">
        {
          (results as PageObjectResponse[]).map((page) => {

            return (
              <Card
                className="basis-[30%] md:mr-[calc(10%/3)] mb-8 md:mb-[calc(10%/3)] md:[&:nth-child(3n)]:mr-0 md:w-60"
                key={page.id}
                href={`/post/${page.id}`}
                imgAlt="post alt"
                imgSrc={page.cover?.type === PAGE_TYPES.EXTERNAL ? page.cover.external.url : ''}
              >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-ellipsis overflow-hidden whitespace-nowrap">
                  {page.properties.Name.type === PAGE_TYPES.TITLE && page.properties.Name.title[0].plain_text}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {page.properties.description.type === PAGE_TYPES.RICH_TEXT && page.properties.description.rich_text[0].plain_text}
                </p>
                <p></p>
              </Card>
            )
          })
        }
      </div>
    </div>
  );
};

export default Cards;
