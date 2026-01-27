import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EventCard } from '@/sanity/lib/interfaces'
import { EVENTS_QUERY } from '@/sanity/lib/queries';
import Link from "next/link"
import Image from "next/image";
import React from 'react'
import { sanityFetch } from '@/sanity/lib/fetch';
import { getColors } from "@/lib/utils";
import { getAllEvents, getEvents } from "../actions";
import Filters from "@/components/Filters";

export default async function Program({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
    let query;
    if (searchParams?.filter) {
        query = await getEvents(searchParams.filter);
    } else if (!searchParams?.filter) {
        query = await getAllEvents();
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
                    query.result.map((e: EventCard, idx: number) => (
                        <Link href={`${e.slug}`} key={idx} className="flex flex-row items-center border-t-2 border-white pt-4 w-full justify-between ">
                            <Image src={e.photo} alt={e.photo} width={150} height={150} />
                            <div className="hidden sm:flex flex-col ml-6 md:my-0 content-start w-full space-y-6">
                                <Badge className={`w-fit bg-amber-400 text-black`}>{e.eventType}</Badge>
                                <div className="text-xl text-left">
                                    <span>{`${e.name}`}</span><br />
                                    <span>{` ${e.time}`}</span>
                                </div>
                            </div>
                           
                                <Button size={"lg"} variant={"outline"}>O akci</Button>
                            
                        </Link>
                    ))}

            </section>
        </main>
    )
}