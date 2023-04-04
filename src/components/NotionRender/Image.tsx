import { IMAGE_TYPE } from "@/constants/notion/blockTypes";
import { ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Zoom from "../ui/Zoom";
import NextImage from 'next/image'

interface ImageProps {
  block: ImageBlockObjectResponse
}

const Image: React.FC<ImageProps> = ({ block }: ImageProps) => {


  const image = block.image.type === IMAGE_TYPE.EXTERNAL ? block.image.external.url : block.image.type === IMAGE_TYPE.FILE ? block.image.file.url : null;
  return (
    <div className="w-full my-1">
      <div className="flex justify-center items-center">
        <Zoom>
          <NextImage
          className="w-full"
            width={800}
            height={400}
            src={image!}
            alt="image"
          />
        </Zoom>
      </div>
    </div>
  )
};

export default Image;
