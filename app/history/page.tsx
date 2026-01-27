import HistoryComp from "@/components/historySecs";
import { ImageSlider2 } from "@/components/imageSlider";
import { sanityFetch } from "@/sanity/lib/fetch"
import { History, TextWithImageSectionHistory } from "@/sanity/lib/interfaces"
import { HISTORY_QUERY } from "@/sanity/lib/queries"

export default async function HistoryPage(){
    const h = await sanityFetch<History>({query: HISTORY_QUERY});
    console.log(h)
    return(
        <main className="tracking-widest w-full flex flex-col min-h-screen px-10 lg:px-20 py-10  bg-white">
                <h1 className={`text-5xl text-black text-center normal-case my-5`}>
                           Historie Kulturního domu Ostrov v Havlíčkově Brodě
                        </h1>

                    <iframe width="560" height="315" src="https://www.youtube.com/embed/bjKiEQWFfrk?si=PFlxryP_Rrd65-K_" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" className="min-h-96 mx-auto"></iframe>
            
            {h.sections.map((s: TextWithImageSectionHistory, id: number) => (
                s._type === "textWithImage" && (
                    <HistoryComp key={id} caption={s.caption} heading={s.heading} textWithImageUrl={s.textWithImageUrl} text={s.text} position={s.position} _type="textWithImage"/>
                )
            ))}
            
            <ImageSlider2 small={h.galleryUrls} slides={h.galleryUrls}/>
            
        </main>
    )
}