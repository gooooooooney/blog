import { BulletedListItemBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import RichText from "./RichText";
import { getBlocks } from "@/lib/notion/getBlocks";
import NotionRender from ".";

interface BulletedListItemProps {
  block: BulletedListItemBlockObjectResponse
}

const BulletedListItem = async ({block} : BulletedListItemProps ) => {
  const has_children = block.has_children;
  if (has_children) {
    const children = await getBlocks(block.id)
    return (
      <div className="flex items-center pl-4">
        <div className="flex-1 relative before:content-['-'] w-full before:text-[#999] before:absolute before:-ml-4">
          <RichText  rich_text={block.bulleted_list_item.rich_text}></RichText>
          <div className="ml-[1em]">
            {
              block.has_children && children?.map((block) => {
                return (
                  <div key={block.id}>
                    <NotionRender block={block} />
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center pl-4">
        <div className="flex-1 relative before:content-['-'] before:text-[#999] before:absolute before:-ml-4">
          <RichText  rich_text={block.bulleted_list_item.rich_text}></RichText>
        </div>
      </div>
  );
};

export default BulletedListItem;
