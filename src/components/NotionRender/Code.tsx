'use client'
import copyToClipboard from 'clipboard-copy'
import { highlightElement } from 'prismjs';
import 'prismjs/components/prism-clike.min.js'
import 'prismjs/components/prism-css-extras.min.js'
import 'prismjs/components/prism-css.min.js'
import 'prismjs/components/prism-javascript.min.js'
import 'prismjs/components/prism-js-extras.min.js'
import 'prismjs/components/prism-json.min.js'
import 'prismjs/components/prism-jsx.min.js'
import 'prismjs/components/prism-tsx.min.js'
import 'prismjs/components/prism-typescript.min.js'
import 'prismjs/components/prism-markdown.min.js'
import 'prismjs/components/prism-bash.min.js'
import 'prismjs/components/prism-sql.min.js'
import 'prismjs/components/prism-rust.min.js'
import 'prismjs/components/prism-go.min.js'
import { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Icons } from '../Icons';
import { toast } from '../ui/Toast';

interface CodeProps extends React.PropsWithChildren {
  language: string;
  caption?: string;
}

const Code: React.FC<CodeProps> = ({ children, language = "javascript", caption, ...props }: CodeProps) => {
  language = language.toLowerCase()

  const codeRef = useRef(null)
  useEffect(() => {
    if (codeRef.current) {
      try {
        highlightElement(codeRef.current);
      } catch (err) {
        console.warn('prismjs highlight error', err)
      }
    }
  }, [codeRef])

  const onClickCopyToClipboard = useCallback(() => {
    copyToClipboard(children as unknown as string)
    toast({
      message: 'Copied to clipboard',
    })
  }, [children])
  return (
    <div className='relative my-4'>
      <div className='absolute left-4 right-4 top-2'>
        <div className='flex justify-between items-center'>
          <p>{language}</p>
          <div className='notion-code-copy-button' onClick={onClickCopyToClipboard}>
            <Icons.Copy />
          </div>
        </div>
      </div>
      <pre className={cn("dark:!bg-[rgba(255,255,255)] !m-0 !p-0 dark:!bg-opacity-[0.1] !bg-[#f7f6f3] w-full min-w-0 text-left rounded-sm", `language-${language}`)} >
        <code className={`language-${language === 'typescript' ? 'tsx' : language} px-4 pb-8 pt-10 w-full block overflow-auto`} ref={codeRef}>
          {children}
        </code>
        {caption && (
          <figcaption className='notion-asset-caption'>
            <p>{caption}</p>
          </figcaption>
        )}
      </pre>
    </div>
  );
};
export default Code;

