import Photos from "@/components/Photos";
import TextWithImage from "@/components/textWithImage";
import { sanityFetch } from "@/sanity/lib/fetch"
import { Gallery } from "@/sanity/lib/interfaces"
import { GALLERY_QUERY } from "@/sanity/lib/queries";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityJpg } from "@/lib/sanity-image";

export async function generateMetadata({params}:{params: { slug: string}}):Promise<Metadata>{
    const e = await sanityFetch<Gallery>({ query: GALLERY_QUERY, params: params, tags: ["gallery"] });
    if (!e) notFound();
    return{
        icons: {
            icon: "/sponzors/image.png"
          },
          title:`Kulturní dům Ostrov Havlíčkův Brod - ${e.name}`,
          applicationName: "KD Ostrov",
          generator: "Next.ts",
          authors: [{name: "Adam Hitzger"}],
          description: e.seo
          ,keywords: ["Kulturní dům Ostrov Havlíčkův Brod", "KD Ostrov", "Předprodej", "Vstupenky", "Kulturní dům", "Havlíčkův Brod", "Kulturní dům Havlíčkův Brod", "Ostrov", "Havlíčkův Brod Ostrov", "Plesy", "Stolení tenis", "Výstavy", "Koncerty", "Taneční Havlíčkův Brod"],
          creator: "Adam Hitzger",
                publisher: "Adam Hitzger",
                formatDetection: {
                    email: false,
                    address: false,
                    telephone: false,
                  },
          openGraph: {
            title: e.name,
            description: e.seo,
            url: `https://www.kdostrov.cz/fotogalerie/${e.slug}`,
            siteName: "Kulturní dům Ostrov Havlíčkův Brod",
            locale: "cs_CZ",
            type: "website",
            images: [e.photo, ...(e.galleryUrls ?? [])].filter(Boolean).slice(0, 2).map((url) => ({
                url: sanityJpg(url, 800, 600),
                width: 800,
                height: 600
            }))
          }
    }
}
export default async function EventGalleryPage({ params }: { params: { slug: string } }) {
    const eventgallery = await sanityFetch<Gallery>({ query: GALLERY_QUERY, params: params, tags: ["gallery"] });
    if (!eventgallery) notFound();
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
                            {eventgallery.name ? <span className="text-5xl sm:text-6xl">{eventgallery.name}</span> : null}<br />
                        </div>
                    </div>
                } />
            <Photos length={eventgallery.galleryUrls?.length ?? 0} urls={eventgallery.galleryUrls ?? []} />
        </main>
    )
}

