import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import to from 'await-to-js';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export {to}