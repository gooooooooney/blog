
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";
import { PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren<ComponentProps<'div'>> {
  href: string,
  imgSrc?: string,
  imgWidth?: number,
  imgHeight?: number,
  imgAlt?: string
}

const Card: React.FC<CardProps> = ({
  children,
  href,
  imgSrc,
  imgWidth = 400,
  imgHeight = 50,
  imgAlt,
  ...props
}: CardProps) => {

  return (
    <Link
      href={href} className={cn('flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col', props.className)}>
      {
        imgSrc && imgAlt && <div className="md:max-w-sm max-w-full">
          <Image
          className="object-cover h-[20vh] object-center-right-notion"
          alt={imgAlt}
          src={imgSrc}
          height={imgHeight}
          width={imgWidth}
        ></Image>
        </div>
      }
      <div className="flex flex-col gap-4 p-2 h-36">
        {children}
      </div>
    </Link>
  );
};
export default Card;


export { Card }