'use client'

import { Icons } from "./Icons";

const GoTop: React.FC = () => {
  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop)
      window.scrollTo(0, c - c / 8)
    }
  }
  return (
    <div onClick={() => scrollToTop()} className="fixed bottom-10 right-10">
      <div className="w-9 h-9 flex justify-center items-center shadow-md rounded-full z-[999] backdrop-blur-lg backdrop-saturate-[180%] border border-solid dark:border-gray-600">
        <Icons.ArrowUp />
      </div>
    </div>
  );
};

export default GoTop;
