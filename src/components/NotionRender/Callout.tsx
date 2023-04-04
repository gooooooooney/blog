import { ICON_TYPE } from "@/constants/notion/blockTypes";
import { cn } from "@/lib/utils";
import { CalloutBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { getColor } from "./utils";
import RichText from "./RichText";

interface CalloutProps {
  block: CalloutBlockObjectResponse
}

const Callout: React.FC<CalloutProps> = ({block} : CalloutProps ) => {

  const color = block.callout.color
  const icon = block.callout.icon?.type === ICON_TYPE.EMOJI ? block.callout.icon.emoji : block.callout.icon?.type === ICON_TYPE.FILE ? block.callout.icon.file.url : null;
  return (
    <div className="w-full my-1">
      <div className="text-[1em] py-[3px] px-[2px] flex">
        <div className={cn(getColor(color), 'border border-[#37352f29] dark:border-[#ffffff21] border-solid p-4 rounded-sm')}>
          <div className="flex items-baseline">
            <div className="pr-2 flex w-8 h-8 justify-center items-center">
              {icon}
            </div>
            <RichText rich_text={block.callout.rich_text}></RichText>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Callout;
