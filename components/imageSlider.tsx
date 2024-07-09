"use client";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { CarouselQuery, EventCard } from "@/sanity/lib/interfaces";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
function Slide({ image, name, date, price, time, slug }: { image: string, name: string; date: string; price: number, time: string; slug: { current: string } }) {
    return (
        <section className={`w-full relative h-full bg-cover flex z-10 before:content-[''] before:absolute before:inset-0 before:block before:bg-gray-600 before:opacity-75 before:z-[-5]`} style={{ backgroundImage: `url(${image})` }}>
            <div className="w-full leading-normal mt-10 lg:mt-20 space-y-4 lg:w-1/2 text-gray-200 font-bold texl-lg lg:text-5xl flex-col px-10 lg:px-20 py-10">
                {name ? <span>{name}</span> : null}<br />
                {date ? <span>{` ${time}`}</span> : null}<br />
                <div className="text-base lg:text-xl border-white border-2 flex justify-between p-1 ">
                    <span>Vstupenky od</span><br />
                    {price ? <span>{price + "Kč"}</span> : null}<br />
                </div>
                <Link href={`${slug}`}>
                    <Button size={"lg"} variant={"outline"}>O akci</Button>
                </Link>
            </div>
        </section>
    );
}

type Slides = {
    slides: EventCard[];
}


export default function ImageSlider({ slides }: Slides) {
    console.log(slides);
    const plugin = useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    );
    return (

        <Carousel
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            className="w-full"
        >
            <CarouselContent>
                {slides.map((slide, key) => (
                    <CarouselItem className="w-full" key={key}>
                        <Slide image={slide.banner} name={slide.name} date={slide.date} price={slide.price} time={slide.time} slug={slide.slug} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-4 z-10 text-white hover:text-primary transition-colors" />
            <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-4 z-10 text-white hover:text-primary transition-colors" />
        </Carousel>
    )
}
