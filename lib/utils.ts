import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Link from "next/link"
import { EventType } from "@/sanity/lib/interfaces"
import qs from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getColors = (eventType: EventType) => {
    if(eventType === "Koncerty") return `bg-amber-400`;
    if(eventType === "Plesy") return `bg-fuchsia-500`;
    if(eventType === "Stolní tenis") return `bg-green-400`;
    if(eventType === "Taneční kurzy") return `bg-blue-400`;
    if(eventType === "Výstavy/Prodejní akce") return `bg-red-500 `;
}

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export const formUrlQuery = ({ params, key, value}: UrlQueryParams) => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: currentUrl,
  },
  { skipNull: true})
}