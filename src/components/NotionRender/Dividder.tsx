import { cn } from "@/lib/utils";

interface DividerProps extends React.HtmlHTMLAttributes<HTMLDivElement>{}

const Divider = (props: DividerProps) => {

  return (
    <div className={cn("w-full my-4", props.className)}>
      <div className="border-b-[1px] visible border-solid border-gray-300 dark:border-gray-600"></div>
    </div>
  );
};

export default Divider;
