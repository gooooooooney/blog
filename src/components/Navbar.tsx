'use client'
import { Navbar as NavbarUI } from 'flowbite-react';
import Image from 'next/image';
import { Icons } from './Icons';
import { useTheme } from 'next-themes';

// interface NavbarProps {
//   children: React.ReactNode
// }

const Navbar: React.FC<any> = () => {

  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'
  const Dark = isDark ? Icons.Moon : Icons.Sun
  return (
    <div className='sticky top-0 z-[999]'>
      <NavbarUI
        // className="w-full fixed backdrop-blur-sm bg-white/75 dark:bg-slate-900/75 z-50 top-0 right-0 h-20 border-b border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-start"
        fluid={true}
        rounded={true}
      >
        <NavbarUI.Brand
          to="/"
        >
          <div className='flex justify-center items-center space-x-4 mr-3 h-6 sm:h-9'>
            <Image
              width={100}
              height={100}
              src="https://avatars.githubusercontent.com/u/117963061?s=400&u=a41d36b201dd6befba760a52896f29727471b73d&v=4"
              className="!rounded-full w-10 h-10"
              alt="Flowbite Logo"
            />
          </div>

          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            gooney's blog
          </span>
        </NavbarUI.Brand>
        <NavbarUI.Toggle />
        <NavbarUI.Collapse>
          <NavbarUI.Link
            href="/"
          >
            Home
          </NavbarUI.Link>
          <NavbarUI.Link href="https://github.com/gooooooooney">
            <Icons.Github />
          </NavbarUI.Link>
          <NavbarUI.Link onClick={() => setTheme(isDark ? 'light' : 'dark')} className='cursor-pointer'>
            <Dark />
          </NavbarUI.Link>


        </NavbarUI.Collapse>
      </NavbarUI>
    </div>
  );
};

export default Navbar;
