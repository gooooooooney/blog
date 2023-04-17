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
} as const