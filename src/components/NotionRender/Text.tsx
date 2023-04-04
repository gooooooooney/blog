import { BLOCK_TYPES } from "@/constants/notion/blockTypes";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import RichText from "./RichText";

interface TextProps {
  block: BlockObjectResponse
}

const Text: React.FC<TextProps> = ({ block }: TextProps) => {
  switch (block.type) {
    case BLOCK_TYPES.PARAGRAPH:
      const text = block.paragraph.rich_text
      return <RichText rich_text={text}></RichText>;
    case BLOCK_TYPES.HEADING_1:
      return <div className="mt-[2em]"><RichText className='text-[1.875em] font-bold' rich_text={block.heading_1.rich_text}></RichText></div>;
    case BLOCK_TYPES.HEADING_2:
      return <div className="mt-[1.4em]"><RichText className='text-[1.5em] font-bold' rich_text={block.heading_2.rich_text}></RichText></div>;
    case BLOCK_TYPES.HEADING_3:
      return <div className="mt-[1em]"><RichText className='text-[1.25em] font-bold' rich_text={block.heading_3.rich_text}></RichText></div>;
    default:
      return null;
  }
};

export { Text };
