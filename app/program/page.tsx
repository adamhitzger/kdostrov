import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EventCard } from '@/sanity/lib/interfaces'
import Link from "next/link"
import React from 'react'
import { getAllEvents, getEvents } from "../actions";
import Filters from "@/components/Filters";
import Events from "@/components/events";


export default async function Program({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
    // Mimo try: čtení searchParams vyhazuje interní signál Nextu (dynamické renderování).
    const filter = searchParams?.filter;
    let query: EventCard[] | null = null;
    try {
        query = filter
            ? (await getEvents(filter)).result
            : (await getAllEvents()).result;
    } catch {
        // Výpadek Sanity (např. vyčerpaná kvóta) nesmí shodit celou stránku; chybu loguje actions.ts.
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-10 text-white">
            <Filters />
            <section className="grid grid-cols-1 gap-y-4 w-full lg:px-28">
                <div className="w-fit my-10 lg:my-20">
                    <h2 className="text-5xl font-bold tracking-wide">Celý program</h2>
                </div>
                {query ? <Events events={query}/> : <p>Program se teď nepodařilo načíst, zkuste to prosím za chvíli.</p>}

            </section>
        </main>
    )
}