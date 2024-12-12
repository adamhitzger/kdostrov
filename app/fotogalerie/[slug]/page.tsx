import Photos from "@/components/Photos";
import TextWithImage from "@/components/textWithImage";
import { sanityFetch } from "@/sanity/lib/fetch"
import { Gallery } from "@/sanity/lib/interfaces"
import { GALLERY_QUERY } from "@/sanity/lib/queries";
import { ResolvingMetadata, Metadata } from "next";
export async function generateMetadata({params}:{params: { slug: string}}):Promise<Metadata>{
    const e = await sanityFetch<Gallery>({ query: GALLERY_QUERY, params: params });
    
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
            images: [
                {
                    url: e.photo,
                    width: 800,
                    height: 600
                },
                {
                    url: e.galleryUrls[0],
                    width: 800,
                    height: 600
                },
                {
                    url: e.galleryUrls[1],
                    width: 800,
                    height: 600
                },
                {
                    url: e.galleryUrls[2],
                    width: 800,
                    height: 600
                },
                {
                    url: e.galleryUrls[3],
                    width: 800,
                    height: 600
                },
                {
                    url: e.galleryUrls[4],
                    width: 800,
                    height: 600
                },
            ]
          }
    }
}
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

