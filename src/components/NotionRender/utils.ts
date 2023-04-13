import { ParagraphBlockObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

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

export const getColor = (color: ParagraphBlockObjectResponse['paragraph']['color']) => {
  return colorMaps[color];
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