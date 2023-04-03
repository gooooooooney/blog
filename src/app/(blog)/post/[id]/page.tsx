import { BLOCK_TYPES, ICON_TYPE, IMAGE_TYPE } from "@/constants/notion/blockTypes";
import { PAGE_TYPES } from "@/constants/notion/pageTypes";
import { MENTION_TYPES, RICH_TEXT_TYPES } from "@/constants/notion/richTextTypes";
import { getBlocks } from "@/lib/notion/getBlocks";
import { getPage } from "@/lib/notion/getPage";
import { getPages } from "@/lib/notion/getPages";
import Image from "next/image";
import type { BlockObjectResponse, BulletedListItemBlockObjectResponse, CalloutBlockObjectResponse, CodeBlockObjectResponse, ImageBlockObjectResponse, MentionRichTextItemResponse, NumberedListItemBlockObjectResponse, ParagraphBlockObjectResponse, QuoteBlockObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import { cn } from "@/lib/utils";
import Code from "@/components/Code";
import Zoom from "@/components/ui/Zoom";

export async function generateStaticParams() {
  const data = await getPages();
  return data?.map((page) => ({
    params: {
      id: page.id,
    },
  }));
}

async function getBlockChildren(id: string) {
  const data = await getBlocks(id);
  return data;
}

async function getPageInfo(id: string) {
  const data = await getPage(id);
  return data;
}

export default async function Page({ params }: { params: { id: string } }) {
  const bc = getBlockChildren(params.id);
  const p = getPageInfo(params.id);
  const [blocks, pageInfo] = await Promise.all([bc, p]);


  const colorMaps: Record<ParagraphBlockObjectResponse['paragraph']['color'], string> = {
    gray: 'text-gray-400',
    brown: 'text-brown-400',
    orange: 'text-orange-400',
    yellow: 'text-yellow-400',
    green: 'text-green-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    pink: 'text-pink-400',
    red: 'text-red-400',
    'gray_background': 'bg-gray-400/75',
    'brown_background': 'bg-brown-400/75',
    'orange_background': 'bg-orange-400/75',
    'yellow_background': 'bg-yellow-400/75',
    'green_background': 'bg-green-400/75',
    'blue_background': 'bg-blue-400/75',
    'purple_background': 'bg-purple-400/75',
    'pink_background': 'bg-pink-400/75',
    'red_background': 'bg-red-400/75',
    default: '',
  }

  const getClassNamesByAnnotation = (annotations: RichTextItemResponse['annotations']) => {
    let className = '';
    if (annotations.bold) {
      className += ' font-bold';
    }
    if (annotations.italic) {
      className += ' italic';
    }
    if (annotations.strikethrough) {
      className += ' line-through';
    }
    if (annotations.underline) {
      className += ' underline';
    }
    if (annotations.code) {
      className += ' bg-gray-200 dark:bg-gray-800 rounded-md text-[#EB5757] rounded-sm px-[.4em] py-[.1em]';
    }
    if (annotations.color !== 'default') {
      const color = annotations.color;

      className += ` ${colorMaps[color]}`;
    }
    return className;
  }
  let numberedListItem = 0;
  const renderMention = (mention: MentionRichTextItemResponse['mention']) => {
    switch (mention.type) {
      case MENTION_TYPES.Page:
        return null;
      case MENTION_TYPES.Database:
        return null;
      case MENTION_TYPES.Date:
        return null;
      case MENTION_TYPES.TemplateMention:

      default:
        return null;
    }
  }
  const renderRichText = (rich_text: RichTextItemResponse[], className?: string) => {
    return (
      <div className={cn(" max-w-full whitespace-pre-wrap break-words p-1", className)}>
        {rich_text.map((text) => {
          switch (text.type) {
            case RICH_TEXT_TYPES.Text:
              return text.text.link?.url ? <a key={text.plain_text} className={cn(getClassNamesByAnnotation(text.annotations), '!underline')} href={text.text.link.url}>{text.text.content}</a> :
              <span key={text.plain_text} className={getClassNamesByAnnotation(text.annotations)}>{text.text.content}</span>;
            case RICH_TEXT_TYPES.Equation:
              return <span key={text.plain_text} className={getClassNamesByAnnotation(text.annotations)}>{text.equation.expression}</span>
            case RICH_TEXT_TYPES.Mention:
              return renderMention(text.mention);
            default:
              return null;
          }
        })}
      </div>
    );
  }

  const renderText = (block: BlockObjectResponse) => {
    switch (block.type) {
      case BLOCK_TYPES.PARAGRAPH:
        return renderRichText(block.paragraph.rich_text);
      case BLOCK_TYPES.HEADING_1:
        return <div className="mt-[2em]">{renderRichText(block.heading_1.rich_text, 'text-[1.875em] font-bold')}</div>;
      case BLOCK_TYPES.HEADING_2:
        return <div className="mt-[1.4em]">{renderRichText(block.heading_2.rich_text, 'text-[1.5em] font-bold')}</div>;
      case BLOCK_TYPES.HEADING_3:
        return <div className="mt-[1em]">{renderRichText(block.heading_3.rich_text, 'text-[1.25em] font-bold')}</div>;
      default:
        return null;
    }
  }

  const renderCode = (block: CodeBlockObjectResponse) => {
    const code = block.code;
    return (
      <Code language={code.language}>
        {code.rich_text[0].plain_text}
      </Code>
    )
  }
  const renderBulletedListItem = (block: BulletedListItemBlockObjectResponse) => {
    return (
      <div className="flex items-center ">
        <div className="flex py-1 items-center justify-center text-gray-700 text-[1.5em] dark:text-gray-400 leading-[1] font-bold mr-2">•</div>
        <div className="flex-1">
          {renderRichText(block.bulleted_list_item.rich_text)}
        </div>
      </div>
    );
  }

  const renderNumberedListItem = (block: NumberedListItemBlockObjectResponse) => {
    numberedListItem++;
    return (
      <div className="flex items-center ">
        <div className="flex py-1 items-center justify-center text-gray-700  dark:text-gray-400 mr-2">{numberedListItem}.</div>
        <div className="flex-1">
          {renderRichText(block.numbered_list_item.rich_text)}
        </div>
      </div>
    );
  }

  const renderQuote = (block: QuoteBlockObjectResponse) => {
    return (
      <div className="w-full my-1">

        <div className="text-[1em] py-[3px] px-[2px] flex">
          <div className="border-l-[3px] border-solid border-[currentcolor] px-[14px] w-full">
            {renderRichText(block.quote.rich_text)}
          </div>
        </div>
      </div>

    );
  }

  const renderDivider = () => {
    return (
      <div className="w-full my-1">
        <div className="border-b-[1px] visible border-solid border-gray-300 dark:border-gray-600"></div>
      </div>
    );
  }

  const renderCallout = (block: CalloutBlockObjectResponse) => {
    const color = block.callout.color
    const icon = block.callout.icon?.type === ICON_TYPE.EMOJI ? block.callout.icon.emoji : block.callout.icon?.type === ICON_TYPE.FILE ? block.callout.icon.file.url : null;
    return (
      <div className="w-full my-1">
        <div className="text-[1em] py-[3px] px-[2px] flex">
          <div className={cn(colorMaps[color], 'border border-[#37352f29] dark:border-[#ffffff21] border-solid p-4 rounded-sm')}>
            <div className="flex items-baseline">
              <div className="pr-2 flex w-8 h-8 justify-center items-center">
                {icon}
              </div>
              {renderRichText(block.callout.rich_text)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderImage = (block: ImageBlockObjectResponse) => {
    const image = block.image.type === IMAGE_TYPE.EXTERNAL ? block.image.external.url : block.image.type === IMAGE_TYPE.FILE ? block.image.file.url : null;
    return (
      <div className="w-full my-1">
        <div className="flex justify-center items-center">
          <Zoom>
            <Image
              width={400}
              height={400}
              src={image!}
              alt="image"
            />
          </Zoom>
        </div>
      </div>
    )
  }


  const renderBlock = (block: BlockObjectResponse) => {
    switch (block.type) {
      case BLOCK_TYPES.PARAGRAPH:
      case BLOCK_TYPES.HEADING_1:
      case BLOCK_TYPES.HEADING_2:
      case BLOCK_TYPES.HEADING_3:
        return renderText(block);
      case BLOCK_TYPES.BULLETED_LIST_ITEM:
        return renderBulletedListItem(block);
      case BLOCK_TYPES.NUMBERED_LIST_ITEM:
        return renderNumberedListItem(block);
      // case BLOCK_TYPES.TOGGLE:

      case BLOCK_TYPES.QUOTE:
        return renderQuote(block);

      case BLOCK_TYPES.CALLOUT:
        return renderCallout(block);

      // case BLOCK_TYPES.EQUATION:

      case BLOCK_TYPES.DIVIDER:
        return renderDivider();

      // case BLOCK_TYPES.COLUMN_LIST:

      // case BLOCK_TYPES.COLUMN:

      // case BLOCK_TYPES.BOOKMARK:

      // case BLOCK_TYPES.EMBED:

      case BLOCK_TYPES.IMAGE:
        return renderImage(block);

      // case BLOCK_TYPES.VIDEO:

      case BLOCK_TYPES.CODE:
        return renderCode(block)
      // case BLOCK_TYPES.FILE:

      // case BLOCK_TYPES.PDF:

      default:
        return null;
    }
  }
  return (
    <div className="w-full">
      <div className="w-full">
        <Image
          className="w-full h-[30vh] object-cover opacity-100 block"
          width={200}
          height={40}
          src={pageInfo?.cover?.type === PAGE_TYPES.EXTERNAL ? pageInfo.cover.external.url : ''}
          alt="cover image"
        />
      </div>
      <div className="max-w-[90%] mx-auto md:max-w-[60%]">
        <div className="">
          <div className="h-16 w-16 text-7xl max-w-full -mt-[2.2rem]">{pageInfo?.icon?.type === PAGE_TYPES.EMOJI && <span>{pageInfo.icon.emoji}</span>}</div>
          <div className="my-10">
            <h1 className="text-5xl font-bold">{pageInfo?.properties.Name.type == PAGE_TYPES.TITLE ? pageInfo?.properties.Name.title[0].plain_text : ''}</h1>
          </div>
        </div>
      </div>
      <div className="max-w-[90%] md:max-w-[60%] mx-auto text-lg pb-[30vh]">


        <div>
          {blocks?.map((block) => {
            return (
              <div key={block.id}>
                <div>{renderBlock(block)}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}