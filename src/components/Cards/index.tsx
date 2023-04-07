
import { PageObjectResponse, QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { Card } from "../ui/Card";
import { PAGE_TYPES } from "@/constants/notion/pageTypes";
import RichText from "../NotionRender/RichText";


interface CardsProps {
  results: PageObjectResponse[];
}


const Cards: React.FC<CardsProps> = ({ results }) => {

  return (
    <div className="flex items-center">
      <div className=" md:flex justify-start md:items-center md:flex-wrap">
        {
          (results).map((page) => {

            return (
              <Card
                className="basis-[30%] md:mr-[calc(10%/3)] mb-8 md:mb-[calc(10%/3)] md:[&:nth-child(3n)]:mr-0 "
                key={page.id}
                href={`/post/${page.id}`}
                imgAlt="post alt"
                imgSrc={page.cover?.type === PAGE_TYPES.EXTERNAL ? page.cover.external.url : ''}
              >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-ellipsis overflow-hidden whitespace-nowrap">
                  {page.properties.Name.type === PAGE_TYPES.TITLE && <RichText rich_text={page.properties.Name.title}/>}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {page.properties.description.type === PAGE_TYPES.RICH_TEXT && <RichText rich_text={page.properties.description.rich_text}/>}
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
