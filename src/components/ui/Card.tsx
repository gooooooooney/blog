
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
      href={href} className={cn('flex transition-colors rounded-2xl hover:bg-[rgba(255,255,255,.5)] hover:dark:bg-[rgba(0,0,0,.3)] flex-col', props.className)}>
      {
        imgSrc && imgAlt && <div className="max-w-full">
          <Image
          className="object-cover rounded-2xl h-[20vh] object-center-right-notion w-full"
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