"use client";
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {  EventCard } from "@/sanity/lib/interfaces";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { sanityLoader, sanitySrcSet } from "@/lib/sanity-image";
import Link from "next/link"; 
import { Button } from "./ui/button";
import { useState, useEffect } from "react"

const WIDTHS = [480, 828, 1280, 1920]

/**
 * Které slidy už mají obrázek: aktuální, sousední a dříve zobrazené. Nativní lazy loading
 * nestačí — autoplay i blízkost k viewportu by na úvodu stáhly desítky bannerů naráz.
 */
function useSeenSlides(api: CarouselApi | undefined, initial: number) {
    const [seen, setSeen] = useState<Set<number>>(() => new Set(Array.from({ length: initial }, (_, i) => i)))

    useEffect(() => {
        if (!api) return
        const update = () => {
            const visible = [...api.slidesInView(), api.selectedScrollSnap()]
            setSeen((prev) => {
                const next = new Set(prev)
                visible.forEach((i) => [i - 1, i, i + 1].forEach((n) => next.add(n)))
                return next.size === prev.size ? prev : next
            })
        }
        update()
        api.on("select", update)
        api.on("slidesInView", update)
        return () => {
            api.off("select", update)
            api.off("slidesInView", update)
        }
    }, [api])

    return seen
}

function Slide({small,date, image, name, price, time, slug, shadow, load, priority = false, sizes }: {small?: string, image: string, name?: string; date?: string; price?: number, time?: string; slug?: { current: string }, shadow: boolean, load: boolean, priority?: boolean, sizes: string }) {
    const src = image || small
    return (
        <section className={`w-full relative min-h-96 overflow-hidden flex z-10${shadow ? " before:content-[''] before:absolute before:inset-0 before:block before:bg-gray-600 before:opacity-75 before:z-[-5]": ""}`}>
            {load && src ? (
                <picture>
                    {small ? <source media="(max-width: 567px)" srcSet={sanitySrcSet(small, [480, 828])} sizes={sizes} /> : null}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        sizes={sizes}
                        srcSet={sanitySrcSet(src, WIDTHS)}
                        src={sanityLoader({ src, width: 1280 })}
                        alt=""
                        fetchPriority={priority ? "high" : "low"}
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover object-left-top -z-10"
                    />
                </picture>
            ) : null}
            <div className="w-full leading-normal mt-20 lg:mt-56 2xl:my-72 space-y-4 lg:w-1/2 text-gray-200 font-bold text-xl md:texl-3xl lg:text-5xl flex-col px-10 lg:px-20 py-10">
                {name ? <span>{name}</span> : null}<br />
                {date ? <span>{new Date(date).toLocaleDateString("cs-CZ")}</span> : null}<br />
                {time ? <span>{`${time} `}</span> : null}<br />
                {price && price > 0 ?<div className="text-base lg:text-xl border-white border-2 flex justify-between p-1 ">
                    <span>Vstupenky od</span><br />
                     <span>{price + " Kč"}</span> <br />
                </div>: null}

                {slug ?<Link href={`${slug}`}>
                    <Button size={"lg"}  variant={"outline"}>O akci</Button>
                </Link> : null}
            </div>
        </section>
    );
}

type Slides = {
    slides: EventCard[];
}


export default function ImageSlider({ slides }: Slides) {
    const plugin = useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    );
    const [api, setApi] = useState<CarouselApi>()
    const seen = useSeenSlides(api, 1)
    return (

        <Carousel
            setApi={setApi}
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            className="w-full"
        >
            <CarouselContent>
                {slides.map((slide, key) => (
                    <CarouselItem className="w-full" key={key}>
                        <Slide load={seen.has(key)} priority={key === 0} sizes="100vw" small={slide.photo} shadow={true} image={slide.banner} name={slide.name} date={slide.date} price={slide.price} time={slide.time} slug={slide.slug} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-4 z-10 text-white hover:text-primary transition-colors" />
            <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-4 z-10 text-white hover:text-primary transition-colors" />
        </Carousel>
    )
}

export function ImageSlider2({ slides } :{slides: string[]}) {
    const plugin = useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    );
    const [api, setApi] = useState<CarouselApi>()
    const seen = useSeenSlides(api, 3)
    return (

        <Carousel
            setApi={setApi}
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            className="w-full "
        >
            <CarouselContent>
                {slides.map((slide, key) => (
                    <CarouselItem className="w-full lg:basis-1/2 2xl:basis-1/3 5xl:basis-1/4" key={key}>
                        <Slide load={seen.has(key)} sizes="(min-width: 1536px) 33vw, (min-width: 1024px) 50vw, 100vw" shadow={false} image={slide}  />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-4 z-10 text-white hover:text-primary transition-colors" />
            <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-4 z-10 text-white hover:text-primary transition-colors" />
        </Carousel>
    )
}
