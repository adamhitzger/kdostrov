import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EventCard } from '@/sanity/lib/interfaces'
import { EVENTS_QUERY } from '@/sanity/lib/queries';
import Link from "next/link"
import Image from "next/image";
import React from 'react'
import { getAllEvents, getEvents } from "../actions";
import Filters from "@/components/Filters";
import Events from "@/components/events";

export const dynamic = "force-dynamic";


export default async function Program({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
    let query: EventCard[] = [];
    if (searchParams?.filter) {
        query = (await getEvents(searchParams.filter)).result;
    } else if (!searchParams?.filter) {
        query = (await getAllEvents()).result;
    }

    console.log(searchParams)
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-10 text-white">
            <Filters />
            <section className="grid grid-cols-1 gap-y-4 w-full lg:px-28">
                <div className="w-fit my-10 lg:my-20">
                    <h2 className="text-5xl font-bold tracking-wide">Celý program</h2>
                </div>
                {query &&
                <Events events={query}/>
}

            </section>
        </main>
    )
}