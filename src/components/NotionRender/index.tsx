import { BLOCK_TYPES } from "@/constants/notion/blockTypes";
import { BlockObjectResponse, CodeBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Code from "../Code";
import { Text } from "./Text";
import BulletedListItem from "./BulletedListItem";
import NumberedListItem from "./NumberedListItem";
import Quote from "./Quote";
import Callout from "./Callout";
import NotionImage from "./Image";
import Toggle from "./Toggle";
import Divider from "./Dividder";
interface NotionRenderProps {
  block: BlockObjectResponse
}

const NotionRender: React.FC<NotionRenderProps> = ({ block }: NotionRenderProps) => {

  const renderCode = (block: CodeBlockObjectResponse) => {
    const code = block.code;
    return (
      <Code language={code.language}>
        {code.rich_text[0].plain_text}
      </Code>
    )
  }

  switch (block.type) {
    case BLOCK_TYPES.PARAGRAPH:
    case BLOCK_TYPES.HEADING_1:
    case BLOCK_TYPES.HEADING_2:
    case BLOCK_TYPES.HEADING_3:
      return <Text block={block} />
    case BLOCK_TYPES.BULLETED_LIST_ITEM:
      return <BulletedListItem block={block} />
    case BLOCK_TYPES.NUMBERED_LIST_ITEM:
      return <NumberedListItem block={block} />
    case BLOCK_TYPES.TOGGLE:
      {/* @ts-expect-error Async Server Component */}
      return <Toggle block={block} ></Toggle>

    case BLOCK_TYPES.QUOTE:
      return <Quote block={block} />

    case BLOCK_TYPES.CALLOUT:
      return <Callout block={block} />

    // case BLOCK_TYPES.EQUATION:

    case BLOCK_TYPES.DIVIDER:
      return <Divider />;

    // case BLOCK_TYPES.COLUMN_LIST:

    // case BLOCK_TYPES.COLUMN:

    // case BLOCK_TYPES.BOOKMARK:

    // case BLOCK_TYPES.EMBED:

    case BLOCK_TYPES.IMAGE:
      return <NotionImage block={block} />

    // case BLOCK_TYPES.VIDEO:

    case BLOCK_TYPES.CODE:
      return renderCode(block)
    // case BLOCK_TYPES.FILE:

    // case BLOCK_TYPES.PDF:

    default:
      return null;
  }
};

export default NotionRender;
