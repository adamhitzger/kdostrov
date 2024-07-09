import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Link from "next/link"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
