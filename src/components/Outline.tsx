"use client"

import { cn } from "@/lib/utils";
import { useLayoutEffect, useState } from "react";

interface OutlineProps extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const Outline: React.FC<OutlineProps> = (props) => {

  const [headings, setHeadings] = useState<{ id: string, text: string | null, level: string | undefined }[]>([] as any)
  useLayoutEffect(() => {
    const headings = document.querySelectorAll<HTMLDivElement>('[data-outline]');
    const headingsArray = Array.from(headings);
    const headingsArrayWithId = headingsArray.filter(heading => heading.id);
    const headingsArrayWithIdAndText = headingsArrayWithId.map(heading => {
      return {
        id: heading.id,
        text: heading.textContent,
        level: heading.dataset.outline
      }
    });
    setHeadings(headingsArrayWithIdAndText)
  }, [])
  const getHeadingsMargin = (level: string | undefined) => {
    switch (level) {
      case "heading_1":
        return "ml-0"
      case "heading_2":
        return "ml-4"
      case "heading_3":
        return "ml-8"
      default:
        return ""
    }
  }
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({block: 'center', behavior: 'smooth' })
    }
  }
  if (headings.length === 0) return null;
  return (
    <div className={cn("mx-4 h-full ")} {...props}>
      <div className="mt-10 px-8" >
        {
          headings.map(heading => {
            return <div onClick={(e) => handleClick(heading.id)} className='transition-all mb-2 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600' key={heading.id}>
              <div className={getHeadingsMargin(heading.level)}>
                <span>{heading.text}</span>
              </div>
            </div>
          })
        }
      </div>
    </div>
  );
};

export default Outline;
