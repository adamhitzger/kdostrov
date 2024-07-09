import Link from "next/link"
import { PortableTextMarkComponentProps, PortableTextReactComponents } from "next-sanity"

export const portableComponents: Partial<PortableTextReactComponents> = {
    marks: {
        link: ({ children, value }) => {
            return (
                <Link href={value.href} className="text-blue-400 underline">
                    {children}
                </Link>
            )
        }
    }
}