import { QuoteBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import RichText from "./RichText";

interface QuoteProps {
  block: QuoteBlockObjectResponse
}

const Quote: React.FC<QuoteProps> = ({block} : QuoteProps ) => {

  return (
    <div className="w-full my-1">

        <div className="text-[1em] py-[3px] px-[2px] flex">
          <div className="border-l-[3px] border-solid border-[currentcolor] px-[14px] w-full">
            <RichText rich_text={block.quote.rich_text}></RichText>
          </div>
        </div>
      </div>
  );
};

export default Quote;
