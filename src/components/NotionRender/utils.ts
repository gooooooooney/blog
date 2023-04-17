import { SelectColor, colorMaps, tags_colors } from "@/constants/notion/color";
import { ParagraphBlockObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";


export const getColor = (color: ParagraphBlockObjectResponse['paragraph']['color']) => {
  return colorMaps[color];
}

export const getTagsColor = (color: SelectColor) => {
  return tags_colors[color];
}

export const getClassNamesByAnnotation = (annotations: RichTextItemResponse['annotations']) => {
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
    className += ' bg-gray-200 dark:bg-gray-800 rounded-md text-[#EB5757] text-[85%] rounded-sm px-[.4em] py-[.1em]';
  }
  if (annotations.color !== 'default') {
    const color = annotations.color;

    className += ` ${getColor(color)}`;
  }
  return className;
}