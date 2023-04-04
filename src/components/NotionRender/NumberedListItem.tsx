import { NumberedListItemBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import RichText from "./RichText";

interface NumberedListItemProps {
  block: NumberedListItemBlockObjectResponse
}
let numberedListItem = 0
const NumberedListItem: React.FC<NumberedListItemProps> = ({ block }: NumberedListItemProps) => {
  numberedListItem += 1
  return (
    <div className="flex items-center ">
      <div className="flex py-1 items-center justify-center text-gray-700  dark:text-gray-400 mr-2">{numberedListItem}.</div>
      <div className="flex-1">
        <RichText rich_text={block.numbered_list_item.rich_text}></RichText>
      </div>
    </div>
  );
};

export default NumberedListItem;
