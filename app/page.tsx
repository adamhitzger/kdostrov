import NewsletterForm from "@/components/newsletterForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { sanityFetch } from "@/sanity/lib/fetch";
import { CarouselQuery, EventCard, GalleryCard } from "@/sanity/lib/interfaces";
import { CAROUSEL_QUERY, EVENTS_QUERY, GALLERY_MAINPAGE_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import ImageSlider from "@/components/imageSlider";

export default async function Home() {
  const eventsPromise = await sanityFetch<EventCard[]>({ query: EVENTS_QUERY });
  const carouselPromise = await sanityFetch<CarouselQuery[]>({ query: CAROUSEL_QUERY });
  const galleryPromise = await sanityFetch<GalleryCard[]>({ query: GALLERY_MAINPAGE_QUERY });
  const [events, carousel, gallery] = await Promise.all([
    eventsPromise,
    carouselPromise,
    galleryPromise
  ]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 text-white">
      <section className="flex w-full px-10">
        <ImageSlider slides={carousel} />
      </section>
      <section className="grid grid-cols-1 gap-y-4 w-full lg:px-28">
        <div className="w-fit my-10 lg:my-20">
          <h2 className="text-5xl font-bold tracking-wide">Akce</h2>
        </div>
        {events.map((e: EventCard, idx: number) => (
          <div key={idx} className="flex flex-row items-center border-t-2 border-white pt-4 w-full justify-between ">
            <Image src={e.photo} alt={e.photo} width={150} height={150} />
            <div className="hidden sm:flex flex-col ml-6 md:my-0 content-start">
              <Badge className="w-fit ">{e.eventType}</Badge>
              <div className="text-xl">
                <span>{`${e.name}`}</span><br />
                <span>{`${e.date} ${e.time}`}</span>
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
      <section className="flex w-full flex-col py-10">
        <div className="my-5 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold text-white">Fotogalerie</h2>
          </div>
        </div>
        <div className="my-5 grid grid-cols-2 lg:grid-cols-3 w-full gap-5 lg:gap-8 min-h-screen">
          {gallery.map((g: GalleryCard, idx: number) => (

            <div key={idx} className="w-full h-full ">
              <Link href={`/fotogalerie/${g.slug}`}>
                <div className=" relative h-2/3 rounded-lg ">
                  <Image src={g.photo} alt={g.photo} fill={true} className="object-cover w-full h-full rounded-lg shadow-md shadow-white hover:shadow-lg hover:opacity-80" />
                </div>
              </Link>
              <div className="text-white flex flex-col h-1/3 text-lg p-2">
                {g.name && g.date ? <span>{`${g.name} ${g.date}`}</span> : null}
                {g.slug ? <Link href={`/fotogalerie/${g.slug}`} className="text-yellow-200 uppercase">Zobrazit vše</Link> : null}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
