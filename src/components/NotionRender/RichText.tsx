import { RICH_TEXT_TYPES } from "@/constants/notion/richTextTypes";
import { cn } from "@/lib/utils";
import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import { getClassNamesByAnnotation } from './utils'
import Mention from "./Mention";
import Link from "next/link";

interface RichTextProps extends React.HTMLAttributes<HTMLDivElement> {
  rich_text: RichTextItemResponse[],
}

const RichText: React.FC<RichTextProps> = ({ rich_text, ...props }: RichTextProps) => {
  return (
    <span className={cn(" max-w-full whitespace-pre-wrap break-words p-1", props.className)}>
      {rich_text.map((text) => {
        switch (text.type) {
          case RICH_TEXT_TYPES.Text:
            return text.text.link?.url ? <Link key={text.plain_text} className={cn(getClassNamesByAnnotation(text.annotations), '!underline')} href={text.text.link.url}>{text.text.content}</Link> :
              <span key={text.plain_text} className={getClassNamesByAnnotation(text.annotations)}>{text.text.content}</span>;
          case RICH_TEXT_TYPES.Equation:
            return <span key={text.plain_text} style={{ 'font': 'normal 1.21em KaTeX_Main,Times New Roman,serif' }} className={cn(getClassNamesByAnnotation(text.annotations))}>
              {text.equation.expression}
            </span>
          case RICH_TEXT_TYPES.Mention:
            return <Mention mention={text.mention} />;
          default:
            return null;
        }
      })}
    </span>
  );
};

export default RichText;
