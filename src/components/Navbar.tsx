'use client'
import Image from 'next/image';
import { Icons } from './Icons';
import { useTheme } from 'next-themes';
import {  Navbar as NavbarUI,TextInput } from './ui/Flowbite';
import { useState } from 'react';

const Navbar: React.FC<any> = () => {

  const { theme, setTheme } = useTheme()
  const {searchParams} = new URL(window.location.href)
  const query = searchParams.get('query') ?? ''
  const [input, setInput] = useState(query)
  const isDark = theme === 'dark'
  const Dark = isDark ? Icons.Moon : Icons.Sun
  const goToSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      if (e.currentTarget.value === '') return
      window.location.href = `/search?query=${e.currentTarget.value}`
    }
  }
  return (
    <div className='sticky top-0 z-[999] backdrop-blur-sm backdrop-saturate-[180%] '>
      <NavbarUI
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

          <span className="hidden md:block self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            gooney's blog
          </span>
        </NavbarUI.Brand>
        <div className='md:w-[40%]'>
          <TextInput value={input} onChange={(e) => setInput(e.target.value)}  onKeyDown={goToSearch} type='text' placeholder='通过标题搜索文章' rightIcon={Icons.Search} />
        </div>
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
