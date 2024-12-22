import SlugSection from "@/components/SlugSection";
import { sanityFetch } from "@/sanity/lib/fetch";
import { EventInterface } from "@/sanity/lib/interfaces";
import { EVENT_QUERY } from "@/sanity/lib/queries";
import {  Metadata } from "next";

export async function generateMetadata({params}:{params: { slug: string}}):Promise<Metadata>{
    const e = await sanityFetch<EventInterface>({ query: EVENT_QUERY, params: params })
    return{
        icons: {
            icon: "/sponzors/image.png"
          },
          title:`Kulturní dům Ostrov Havlíčkův Brod - ${e.name}`,
          applicationName: "KD Ostrov",
          generator: "Next.ts",
          authors: [{name: "Adam Hitzger"}],
          description: e.podnadpis
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
            description: e.podnadpis,
            url: `https://www.kdostrov.cz/${e.slug}`,
            siteName: "Kulturní dům Ostrov Havlíčkův Brod",
            locale: "cs_CZ",
            type: "website",
            images: [
                {
                    url: e.photo,
                    width: 800,
                    height: 600
                }
            ]
          }
    }
}
export default async function EventPage({ params }: { params: { slug: string } }) {
    const event = await sanityFetch<EventInterface>({ query: EVENT_QUERY, params: params })
    console.log(event);

    return (
        <main className="bg-white">
            <section className={`w-full relative bg-cover flex z-10 before:content-[''] before:absolute before:inset-0 before:block before:bg-gray-600 before:opacity-75 before:z-[-5]`} style={{ backgroundImage: `url(${event.photo})` }}>
                <div className="w-full leading-normal mt-20 space-y-4 lg:w-1/2 text-gray-200 font-bold text-3xl lg:text-5xl flex-col px-10 lg:px-20 py-10">
                    {event.name ? <span>{event.name}</span> : null}<br />
                    {event.time ? <span>{` ${event.time}`}</span> : null}<br />
                    {event.podnadpis ? <span className="text-xl">{event.podnadpis}</span> : null}<br />
                    <div className="text-xl border-white border-2 flex justify-between p-1">
                        <span>Vstupenky od</span>
                        {event.price ? <span>{event.price + " Kč"}</span> : <span>Zadarmo</span>}<br />
                    </div>

                </div>
            </section>
            <section className="py-10">
                <h1 className="text-center text-black text-4xl font-bold tracking-wider ">{`${event.name} ${event.time}`}</h1>

                <SlugSection text={event.text} rsText={event.reservation_text} url={event.eventUrl} reenio={event.reenioUrl} />
            </section>
        </main>
    );
}