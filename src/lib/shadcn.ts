import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes
 *
 * @param {ClassValue[]} inputs - Tailwind CSS classes
 *
 * @returns {string} Merged Tailwind CSS classes
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs))
