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

interface CodeProps extends React.PropsWithChildren {
  language: string;
  caption?: string;
}

const Code: React.FC<CodeProps> = ({ children, language = "javascript", caption, ...props }: CodeProps) => {
  const [isCopied, setIsCopied] = useState(false)
  const copyTimeout = useRef<number | null>()
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
    setIsCopied(true)

    if (copyTimeout.current) {
      clearTimeout(copyTimeout.current)
      copyTimeout.current = null
    }

    copyTimeout.current = setTimeout(() => {
      setIsCopied(false)
    }, 1200) as unknown as number
  }, [children, copyTimeout])
  return (
    <>
      <pre className={cn("dark:!bg-[#ffffff08] !bg-[#f7f6f3] w-full min-w-0 text-left rounded-sm", `language-${language}`)} >
        {/* <div className='notion-code-copy'>
          <div className='notion-code-copy-button' onClick={onClickCopyToClipboard}>
            <Icons.Copy />
          </div>

          {isCopied && (
            <div className='notion-code-copy-tooltip'>
              <div>{isCopied ? 'Copied' : 'Copy'}</div>
            </div>
          )}
        </div> */}

        <code className={`language-${language} p-8 pr-4 w-full block`} ref={codeRef}>
          {children}
        </code>
        {caption && (
          <figcaption className='notion-asset-caption'>
            <p>{caption}</p>
          </figcaption>
        )}
      </pre>
    </>
  );
};
export default Code;

