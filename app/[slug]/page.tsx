import SlugSection from "@/components/SlugSection";
import TextWithImage from "@/components/textWithImage";
import { Button } from "@/components/ui/button";
import { sanityFetch } from "@/sanity/lib/fetch";
import { EventInterface } from "@/sanity/lib/interfaces";
import { EVENT_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";

export default async function EventPage({ params }: { params: { slug: string } }) {
    const event = await sanityFetch<EventInterface>({ query: EVENT_QUERY, params })
    console.log(event);

    return (
        <main className="bg-white">
            <section className={`w-full relative h-screen bg-cover flex z-10 before:content-[''] before:absolute before:inset-0 before:block before:bg-gray-600 before:opacity-75 before:z-[-5]`} style={{ backgroundImage: `url(${event.photo})` }}>
                <div className="w-full leading-normal mt-20 space-y-4 lg:w-1/2 text-gray-200 font-bold text-5xl flex-col px-10 lg:px-20 py-10">
                    {event.name ? <span>{event.name}</span> : null}<br />
                    {event.time ? <span>{` ${event.time}`}</span> : null}<br />
                    {event.podnadpis ? <span className="text-xl">{event.podnadpis}</span> : null}<br />
                    <div className="text-xl border-white border-2 flex justify-between p-1">
                        <span>Vstupenky od</span>
                        {event.price ? <span>{event.price + "Kč"}</span> : null}<br />
                    </div>

                </div>
            </section>
            <section className="text-center text-black text-4xl font-bold tracking-wider py-10">
                <span>{`${event.name} ${event.time}`}</span>
            </section>
            <SlugSection text={event.text} rsText={event.reservation_text} url={event.eventUrl} reenio={event.reenioUrl} />
        </main>
    );
}