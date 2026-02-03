import { sanityFetch } from '@/sanity/lib/fetch'
import { StaffQuery, Staffs } from '@/sanity/lib/interfaces'
import { STAFF_QUERY } from '@/sanity/lib/queries'
import { PortableText } from 'next-sanity';
import React from 'react'
import { Mail, Phone, User } from 'lucide-react';
import ContactForm from '@/components/Contact';
import Link from 'next/link';

export default async function Kontakt() {
    const kontakt = await sanityFetch<StaffQuery>({ query: STAFF_QUERY });
    console.log(kontakt)
    return (
        <main className='w-full flex flex-col space-y-10 py-20 px-10 lg:py-20 text-white'>
            <section className='flex flex-wrap lg:flex-nowrap bg-gray-900 w-full md:w-3/4 mx-auto rounded-[25px] p-3 gap-y-4 md:gap-y-0 lg:p-10 md:gap-x-4 '>
                <div className='w-full lg:w-1/2 h-auto rounded-[25px] bg-black py-5 lg:p-10 px-2 space-y-4'>
                    <PortableText value={kontakt.contact} />
                    <p>Na Ostrově 28/3, Havlíčkův Brod - vstup hlavním vchodem z ulice Žižkova, kancelář v 1. patře</p><br />
                    <span>Číslo účtu: 43-7970790287/0100</span>
                    <div className='flex flex-col space-y-2'>
                        <span>KD Ostrov s.r.o.</span>
                        <span>IČO: 26951444</span>
                        <span>DIČ: CZ26951444</span>
                    </div>
                </div>
                <div className='w-full lg:w-1/2  border-2 rounded-[25px] bg-white text-black py-5 px-2'>
                    <ContactForm />
                </div>
            </section>
            <section className='flex flex-col w-full lg:w-1/2 mx-auto'>
                <div className='w-full '>

                    {kontakt.staffs?.map((s: Staffs, idx: number) => (
                        s._type === "staffObject" && (
                            <div key={idx} className='w-full my-5 text-center'>
                                <div className='h-4 my-8'>
                                    <h3 className='text-2xl font-bold tracking-wide'>{s.jmeno}</h3>
                                    <span className='text-base'>{s.funkce}</span>
                                </div>
                                <div className='w-full grid grid-cols-1 max-w-md mx-auto'>
                                    <Link href={"mailto:"+s.mail} className='w-full grid justify-items-center grid-cols-2 p-4 space-x-4'>
                                        <Mail className='text-amber-400' width={48} height={48} />
                                        <div className='flex flex-col space-y-3'>
                                        <span className='text-xl'>Email</span>
                                        <span className='text-base'>{s.mail}</span>
                                    </div>
                                        
                                    </Link>
                                    <Link href={"tel:"+"s.telefon"} className='w-full grid justify-items-center grid-cols-2 p-4 space-x-4'>
                                        <Phone className='text-amber-400' width={48} height={48} />
                                        <div className='flex flex-col space-y-3'>
                                            <span className='text-xl'>Telefonní číslo</span>
                                            <span className='text-base'>{s.telefon}</span>
                                        </div>    
                                    </Link>
                    
                                </div>
                            </div>
                        )
                    ))}
                </div>

            </section>
        </main>
    )
}

