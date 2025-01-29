"use client"
import { GalleryCard } from "@/sanity/lib/interfaces";
import Image from "next/image";
import Link from "next/link";
export default function Gallery({gallery}: {gallery: GalleryCard[]}){
    return(
        <section className="flex w-full flex-col py-10">
        <div className="my-5 flex flex-col justify-between">
          <div>
            <h2 className="text-5xl font-bold text-white">Fotogalerie</h2>
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
                {g.name ? <span>{`${g.name}`}</span> : null}
                {g.slug ? <Link href={`/fotogalerie/${g.slug}`} className="text-yellow-200 uppercase">Zobrazit vše</Link> : null}
              </div>
            </div>
          ))}
        </div>
      </section>
    )
}