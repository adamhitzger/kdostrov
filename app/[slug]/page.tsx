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
            <section className={`w-full relative h-full bg-cover flex z-10 before:content-[''] before:absolute before:inset-0 before:block before:bg-gray-600 before:opacity-75 before:z-[-5]`} style={{ backgroundImage: `url(${event.photo})` }}>
                <div className="w-full leading-normal mt-40 lg:mt-20 space-y-4 lg:w-1/2 text-gray-200 font-bold text-5xl flex-col px-10 lg:px-20 py-10">
                    {event.date ? <span>{`${event.date} ${event.time}`}</span> : null}<br />
                    {event.name ? <span>{event.name}</span> : null}<br />
                    {event.podnadpis ? <span className="text-xl">{event.podnadpis}</span> : null}<br />
                    <div className="text-xl border-white border-2 flex justify-between p-1">
                        <span>Vstupenky od</span>
                        {event.price ? <span>{event.price + "Kč"}</span> : null}<br />
                    </div>

                </div>
            </section>
            <TextWithImage text={event.text} url={event.small} position={"Text vlevo"} isDynamic={true} node={
                <div className="w-full font-extrabold text-4xl lg:text-7xl mb-4">
                    {event.name ? <span>{event.name}</span> : null}<br />
                    {event.date && event.time ? <span>{`${event.date} ${event.time} `}</span> : null}
                </div>
            } />
            <TextWithImage text={event.reservation_text} url={event.small} position={"Obrázek vlevo"} isDynamic={true} />
            <section className="flex w-full flex-row md:flex-row-reverse">
                <div className="flex flex-col w-1/2 gap-5 px-14 py-10">
                    {event.eventUrl ? <Link href={event.eventUrl}><Button size={"lg"} variant={"outline"}>Koupit vstupenky online</Button></Link> : null}
                    {event.reenioUrl ? <Link href={event.reenioUrl}><Button size={"lg"} variant={"outline"}>Rezervovat na pokladně</Button></Link> : null}
                </div>
            </section>
        </main>
    );
}