import Photos from "@/components/Photos";
import TextWithImage from "@/components/textWithImage";
import { sanityFetch } from "@/sanity/lib/fetch"
import { Gallery } from "@/sanity/lib/interfaces"
import { GALLERY_QUERY } from "@/sanity/lib/queries";

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
            <Photos length={eventgallery.galleryUrls.length} urls={eventgallery.galleryUrls} />
        </main>
    )
}

