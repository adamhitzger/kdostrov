import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';
import { PortableText } from "next-sanity";
type SSProps = {
    text: any;
    rsText: any;
    url: string;
    reenio: string;
}

export default function SlugSection({ text, rsText, url, reenio }: SSProps) {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-black w-full h-full p-10">
            <div className='w-full h-full text-justify'>
                <PortableText value={text} />
            </div>
            <div className='flex flex-col w-full h-full space-y-5'>
                <div className='w-full h-1/2 items-center text-center'>
                    <PortableText value={rsText} />
                </div>
                <div className='w-full h-1/2 text-white flex flex-col items-center space-y-4'>
                    {url ? <Link href={url}><Button size={"lg"} variant={"outline"}>Koupit vstupenky online</Button></Link> : null}
                    {reenio ? <Link href={reenio}><Button size={"lg"} variant={"outline"}>Rezervovat na pokladně</Button></Link> : null}
                </div>
            </div>
        </section>
    )
}

