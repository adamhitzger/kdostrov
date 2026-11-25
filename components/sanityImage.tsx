"use client"

import Image, { type ImageProps } from "next/image"
import { sanityLoader } from "@/lib/sanity-image"

/** `next/image` pro fotky ze Sanity. S `fill` vždy uvádět `sizes`, jinak se stahuje 100vw. */
export default function SanityImage(props: Omit<ImageProps, "loader" | "src"> & { src?: string | null }) {
  const { src, alt, ...rest } = props
  if (!src) return null
  return <Image {...rest} src={src} alt={alt} loader={sanityLoader} />
}
