import { BulletedListItemBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import RichText from "./RichText";

interface BulletedListItemProps {
  block: BulletedListItemBlockObjectResponse
}

const BulletedListItem: React.FC<BulletedListItemProps> = ({block} : BulletedListItemProps ) => {
  return (
    <div className="flex items-center ">
        <div className="flex py-1 items-center justify-center text-gray-700 text-[1.5em] dark:text-gray-400 leading-[1]  mr-2">-</div>
        <div className="flex-1">
          <RichText rich_text={block.bulleted_list_item.rich_text}></RichText>
        </div>
      </div>
  );
};

export default BulletedListItem;
