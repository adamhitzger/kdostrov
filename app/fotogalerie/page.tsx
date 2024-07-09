import { sanityFetch } from "@/sanity/lib/fetch"
import { GalleryCard } from "@/sanity/lib/interfaces"
import { GALLERIES_QUERY } from "@/sanity/lib/queries"
import Image from "next/image";
import Link from "next/link";

export default async function Gallery() {
    const gallery = await sanityFetch<GalleryCard[]>({ query: GALLERIES_QUERY });
    console.log(gallery)
    return (
        <main className="tracking-widest w-full flex flex-col min-h-screen px-10 lg:px-20 pt-10 bg-black">
            <div className="my-10 flex flex-col justify-between h-64">
                <div className="flex flex-row gap-x-3 items-center">
                    <hr className="bg-yellow-200 w-16 border-none text-yellow-200 h-0.5" /> <span className="text-gray-400 text-lg uppercase">Galerie</span>
                </div>
                <div>
                    <h1 className="text-4xl font-bold text-white">Fotogalerie</h1>
                </div>
            </div>
            <div className="my-10 grid grid-cols-2 lg:grid-cols-3 w-full gap-5 lg:gap-8 min-h-screen">
                {gallery.map((g: GalleryCard, idx: number) => (

                    <div key={idx} className="w-full h-full ">
                        <Link href={`/fotogalerie/${g.slug}`}>
                            <div className=" relative h-96 rounded-lg ">
                                <Image src={g.photo} alt={g.photo} fill={true} className="object-contain w-full h-full rounded-lg shadow-md shadow-white hover:shadow-lg hover:opacity-80" />
                            </div>
                        </Link>
                        <div className="text-white flex flex-col h-1/3 text-lg p-2">
                            {g.name && g.date ? <span>{`${g.name} ${g.date}`}</span> : null}
                            {g.slug ? <Link href={`/fotogalerie/${g.slug}`} className="text-yellow-200 uppercase">Zobrazit vše</Link> : null}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}
