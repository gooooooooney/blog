import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export type BlockObjectResponseWithChildren = BlockObjectResponse & {
  children?: BlockObjectResponseWithChildren[];
};