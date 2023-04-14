import { NumberedListItemBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import RichText from "./RichText";
import { getBlocks } from "@/lib/notion/getBlocks";
import NotionRender from ".";

interface NumberedListItemProps {
  block: NumberedListItemBlockObjectResponse
  orderNumber: number
}
// const NumberedListItem = async ({ orderNumber,block }: NumberedListItemProps) => {
//   const has_children = block.has_children;
//   if (has_children) {
//     const children = await getBlocks(block.id)
//     return (
//       <div className="flex items-center ">
//         <div className="flex py-1 items-center justify-center text-gray-700  dark:text-gray-400 mx-2">{orderNumber}.</div>
//         <div className="flex-1">
//           <RichText rich_text={block.numbered_list_item.rich_text}></RichText>
//           <div className="ml-[1em]">
//             {
//               block.has_children && children?.map((block) => {
//                 return (
//                   <div key={block.id}>
//                     <NotionRender block={block} />
//                   </div>
//                 )
//               }
//               )}
//           </div>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div className="flex items-center ">
//       <div className="flex py-1 items-center justify-center text-gray-700  dark:text-gray-400 mx-2">{orderNumber}.</div>
//       <div className="flex-1">
//         <RichText rich_text={block.numbered_list_item.rich_text}></RichText>
//       </div>
//     </div>
//   );
// };

const NumberedListItem = async ({ block, orderNumber }: NumberedListItemProps) => {
  const has_children = block.has_children;
  if (has_children) {
    const children = await getBlocks(block.id)
    return (
      <div className="flex items-center pl-4">
        <div data-order={`${orderNumber}.`} className=" flex-1 relative order-list">
          <RichText className="" rich_text={block.numbered_list_item.rich_text}></RichText>
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
      <div data-order={`${orderNumber}.`} className=" flex-1 relative order-list">
        <RichText className="" rich_text={block.numbered_list_item.rich_text}></RichText>
      </div>
    </div>
  );
};
export default NumberedListItem;
