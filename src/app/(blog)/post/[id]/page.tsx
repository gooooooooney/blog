import { BLOCK_TYPES } from "@/constants/notion/blockTypes";
import { PAGE_TYPES } from "@/constants/notion/pageTypes";
import { MENTION_TYPES, RICH_TEXT_TYPES } from "@/constants/notion/richTextTypes";
import { getBlocks } from "@/lib/notion/getBlocks";
import { getPage } from "@/lib/notion/getPage";
import { getPages } from "@/lib/notion/getPages";
import Image from "next/image";
import type { BlockObjectResponse, CodeBlockObjectResponse, MentionRichTextItemResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import { cn } from "@/lib/utils";
import Code from "@/components/Code";

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
  const getClassNamesByAnnotation = (annotations: RichTextItemResponse['annotations']) => {
    // let classNames = [];
    // if (annotations.bold) {
    //   classNames.push('font-bold');
    // }
    // if (annotations.italic) {
    //   classNames.push('italic');
    // }
    // if (annotations.strikethrough) {
    //   classNames.push('line-through');
    // }
    // if (annotations.underline) {
    //   classNames.push('underline');
    // }
    // if (annotations.code) {
    //   classNames.push('bg-gray-200 dark:bg-gray-700 rounded');
    // }
    // if (annotations.color !== 'default') {
    //   const colorGroup = annotations.color.split('_')
    //   if (colorGroup.length === 2) {
    //     classNames.push(`bg-${colorGroup[0]}-200`);
    //   } else {
    //     classNames.push(`text-${colorGroup[0]}`);
    //   }

    // }
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
      className += ' bg-gray-200 dark:bg-gray-800 rounded-md';
    }
    if (annotations.color !== 'default') {
      const color = annotations.color;
      const colorMaps: Record<typeof color, string> = {
        gray: 'text-gray-400',
        brown: 'text-brown-400',
        orange: 'text-orange-400',
        yellow: 'text-yellow-400',
        green: 'text-green-400',
        blue: 'text-blue-400',
        purple: 'text-purple-400',
        pink: 'text-pink-400',
        red: 'text-red-400',
        'gray_background': 'bg-gray-400',
        'brown_background': 'bg-brown-400',
        'orange_background': 'bg-orange-400',
        'yellow_background': 'bg-yellow-400',
        'green_background': 'bg-green-400',
        'blue_background': 'bg-blue-400',
        'purple_background': 'bg-purple-400',
        'pink_background': 'bg-pink-400',
        'red_background': 'bg-red-400',
      }
      className += ` ${colorMaps[color]}`;
    }
    return className;
  }
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
      <div className={cn("text-gray-700 dark:text-gray-400 max-w-full whitespace-pre-wrap break-words p-1", className)}>
        {rich_text.map((text) => {
          switch (text.type) {
            case RICH_TEXT_TYPES.Text:
              return <span key={text.plain_text} className={getClassNamesByAnnotation(text.annotations)}>{text.text.content}</span>;
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
  const renderBlock = (block: BlockObjectResponse) => {
    switch (block.type) {
      case BLOCK_TYPES.PARAGRAPH:
      case BLOCK_TYPES.HEADING_1:
      case BLOCK_TYPES.HEADING_2:
      case BLOCK_TYPES.HEADING_3:
        return renderText(block);
      // case BLOCK_TYPES.BULLETED_LIST_ITEM:

      // case BLOCK_TYPES.NUMBERED_LIST_ITEM:

      // case BLOCK_TYPES.TOGGLE:

      // case BLOCK_TYPES.QUOTE:

      // case BLOCK_TYPES.CALLOUT:

      // case BLOCK_TYPES.EQUATION:

      // case BLOCK_TYPES.DIVIDER:

      // case BLOCK_TYPES.COLUMN_LIST:

      // case BLOCK_TYPES.COLUMN:

      // case BLOCK_TYPES.BOOKMARK:

      // case BLOCK_TYPES.EMBED:

      // case BLOCK_TYPES.IMAGE:

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