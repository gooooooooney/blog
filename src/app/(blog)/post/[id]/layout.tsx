import Outline from "@/components/Outline";

interface PostLayoutProps {
  children: React.ReactNode
}

const PostLayout: React.FC<PostLayoutProps> = ({ children }: PostLayoutProps) => {
  return (
    <div className="md:flex">

      <div className="md:flex-[9] md:w-[83%]">
        {children}
      </div>
      <Outline className="md:flex-[2] hidden md:block"/>
    </div>
  );
};

export default PostLayout;
