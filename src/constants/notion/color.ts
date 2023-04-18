import { ParagraphBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"
export type  SelectColor = "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "red"
export const tags_colors: Record<SelectColor, string> = {
  "default": "bg-gray-400",
  "gray": "bg-gray-400",
  "brown": "bg-brown-400",
  "orange": "bg-orange-400",
  "yellow": "bg-yellow-400",
  "green": "bg-green-400",
  "blue": "bg-blue-400",
  "purple": "bg-purple-400",
  "pink": "bg-pink-400",
  "red": "bg-red-400",
} as const

export const colorMaps: Record<ParagraphBlockObjectResponse['paragraph']['color'], string> = {
  gray: 'text-[#f1f1ef]',
  brown: 'text-[#9f6b53]',
  orange: 'text-[#d9730d]',
  yellow: 'text-[#cb912f]',
  green: 'text-[#448361]',
  blue: 'text-[#337ea9]',
  purple: 'text-[#9065b0]',
  pink: 'text-[#c14c8a]',
  red: 'text-[#d44c47]',
  'gray_background': 'bg-[#f1f1ef] dark:bg-[#252525]',
  'brown_background': 'bg-[#f4eeee] dark:bg-[#2f2723]',
  'orange_background': 'bg-[#fbecdd] dark:bg-[#38281e]',
  'yellow_background': 'bg-[#fbf3db] dark:bg-[#392e1e]',
  'green_background': 'bg-[#edf3ec] dark:bg-[#222b26]',
  'blue_background': 'bg-[#e7f3f8] dark:bg-[#1d282e]',
  'purple_background': 'bg-[#f4f0f7cc] dark:bg-[#2b2431]',
  'pink_background': 'bg-[#f9eef3cc] dark:bg-[#302228]',
  'red_background': 'bg-[#fdebec] dark:bg-[#362422]',
  default: '',
} as const