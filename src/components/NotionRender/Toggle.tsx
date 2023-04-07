import { ToggleBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Text } from "./Text";
import NotionRender from "./";
import { getBlocks } from "@/lib/notion/getBlocks";
interface ToggleProps extends React.PropsWithChildren {
  block: ToggleBlockObjectResponse
}

const Toggle = async ({ block }: ToggleProps) => {

  let children = await getBlocks(block.id)

  return (
    <>
      <details>
        <summary className="cursor-pointer w-full outline-0">
          <Text block={block} />
        </summary>

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
      </details>
    </>
  );
};

export default Toggle;
