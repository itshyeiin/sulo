import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind classes using clsx logic and tailwind-merge 
 * to handle conflicts (e.g. 'p-4 p-2' becomes 'p-2').
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}