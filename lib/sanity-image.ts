import type { ImageLoaderProps } from "next/image"

/**
 * Obrázky zmenšuje Sanity CDN parametry v URL, ne Next optimalizátor — ten si pro každou
 * šířku × formát stahoval celý originál (3–9 MB) a tím vyčerpal bandwidth kvótu Sanity.
 * Nikdy neposílat `asset->url` návštěvníkovi bez parametrů (ani jako CSS background).
 */
const MAX_WIDTH = 1920

export const isSanityImage = (src: string) => src.startsWith("https://cdn.sanity.io/images/")

export function sanityLoader({ src, width, quality }: ImageLoaderProps): string {
  if (!isSanityImage(src)) return src
  return `${src}?w=${Math.min(width, MAX_WIDTH)}&q=${quality ?? 75}&fit=max&auto=format`
}

export const sanitySrcSet = (src: string, widths: number[]): string =>
  widths.map((width) => `${sanityLoader({ src, width })} ${width}w`).join(", ")

/** Pro e-maily a OG obrázky: pevně JPEG, WebP/AVIF část klientů nezobrazí. */
export const sanityJpg = (src: string, width: number, height?: number): string => {
  if (!isSanityImage(src)) return src
  return `${src}?w=${width}${height ? `&h=${height}&fit=crop` : "&fit=max"}&fm=jpg&q=80`
}
