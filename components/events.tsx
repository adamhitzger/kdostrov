"use client"
import Link from "next/link"
import Image from "next/image"
import { EventCard } from "@/sanity/lib/interfaces"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
export default function Events({events}: {events: EventCard[]}){
    return(
        <section className="grid grid-cols-1 gap-y-4 w-full lg:px-28">
        <div className="w-fit my-10 lg:my-20">
          <h2 className="text-5xl font-bold tracking-wide">Akce</h2>
        </div>
        {events.map((e: EventCard, idx: number) => (
          <div key={idx} className="flex flex-row space-x-4 items-center border-t-2 border-white pt-4 w-full justify-between ">
            <Image src={e.photo} alt={e.photo} width={150} height={150} />
            <div className="hidden sm:flex flex-col ml-6 md:my-0 content-start w-full space-y-6">
              <Badge className={`w-fit bg-amber-400`}>{e.eventType}</Badge>
              <div className="text-xl text-left">
                <span>{`${e.name}`}</span><br />
                <span>{` ${e.time}`}</span>
              </div>
            </div>
            <Link href={`${e.slug}`}>
              <Button size={"lg"} variant={"outline"}>O akci</Button>
            </Link>
          </div>
        ))}
        <div className=" flex justify-center">
          <Link href={"/program"} ><Button className="my-16" variant="outline" size={"lg"}>Celý program</Button></Link>
        </div>
      </section>
    )
}