'use client'

import { Icons } from "./Icons";

const GoTop: React.FC = () => {
  const scrollToTop = () => {
    const c = document.getElementById('container')
    // if (c > 0) {
    //   window.requestAnimationFrame(scrollToTop)
    //   window.scrollTo(0, c - c / 8)
    // }
    console.log(c)
    c?.scrollTo({top:0, behavior: 'smooth' })
  }
  return (
    <div onClick={() => scrollToTop()} className="fixed bottom-10 right-10 cursor-pointer">
      <div className="w-9 h-9 flex justify-center items-center shadow-md rounded-full z-[999] backdrop-blur-lg backdrop-saturate-[180%] border border-solid dark:border-gray-600">
        <Icons.ArrowUp />
      </div>
    </div>
  );
};

export default GoTop;
