import TextWithImage from "@/components/textWithImage";
import { sanityFetch } from "@/sanity/lib/fetch"
import { Gallery } from "@/sanity/lib/interfaces"
import { GALLERY_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";

export default async function EventGalleryPage({ params }: { params: { slug: string } }) {
    const eventgallery = await sanityFetch<Gallery>({ query: GALLERY_QUERY, params: params });
    console.log(eventgallery)
    return (
        <main className="tracking-widest w-full flex flex-col min-h-screen px-10 lg:px-20 pt-10 bg-white">
            <TextWithImage url={eventgallery.photo} position="Text vlevo" isDynamic={false}
                node={
                    <div className="grid grid-rows-2 gap-y-10 py-16 h-full justify-between  items-center">
                        <div>
                            <div className="flex flex-row gap-x-3 items-center">
                                <hr className="bg-yellow-200 w-16 border-none text-yellow-200 h-0.5" /> <span className="text-gray-400 text-lg uppercase">{eventgallery.eventType ? eventgallery.eventType : null}</span>
                            </div>
                        </div>
                        <div className="w-full font-extrabold text-6xl mb-4">
                            {eventgallery.name ? <span>{eventgallery.name}</span> : null}<br />
                            {eventgallery.date ? <span>{`${eventgallery.date} `}</span> : null}
                        </div>
                    </div>
                } />
            <div className={`my-10 w-full grid grid-cols-1 ${eventgallery.galleryUrls.length === 2 && 4 ? "lg:grid-cols-2" : "lg:grid-cols-3"} gap-y-6 gap-x-6`}>
                {eventgallery.galleryUrls.map((g: string, idx: number) => (
                    <div key={idx} className="relative w-full h-[16rem]">
                        <Image src={g} alt={g} className="object-contain w-full h-full rounded-lg" fill={true} />
                    </div>
                ))}
            </div>
        </main>
    )
}

