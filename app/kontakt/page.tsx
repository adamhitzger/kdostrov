import { sanityFetch } from '@/sanity/lib/fetch'
import { StaffQuery, Staffs } from '@/sanity/lib/interfaces'
import { STAFF_QUERY } from '@/sanity/lib/queries'
import { PortableText } from 'next-sanity';
import React from 'react'
import { Mail, Phone, User } from 'lucide-react';
import ContactForm from '@/components/Contact';

export default async function Kontakt() {
    const kontakt = await sanityFetch<StaffQuery>({ query: STAFF_QUERY });
    console.log(kontakt)
    return (
        <main className='w-full flex flex-col space-y-10 py-20 px-10 lg:py-20 text-white'>
            <section className='flex flex-wrap md:flex-nowrap bg-gray-900 w-full md:w-3/4 mx-auto rounded-[25px] p-3 lg:p-10 '>
                <div className='w-full md:w-1/2 h-full rounded-[25px] bg-black py-5 lg:p-10 px-2 space-y-4'>
                    <h1 className='texl-xl font-bold min-h-max'>Neváhejte nás kontaktovat</h1>
                    <hr className="bg-white w-full border-none text-white h-0.5" />
                    <PortableText value={kontakt.contact} />
                    <p>Na Ostrově 28/3, Havlíčkův Brod - vstup hlavním vchodem z ulice Žižkova, kacelář v 1. patře</p><br />
                    <span>Číslo účtu: 43-7970790287/0100</span>
                    <div className=''>
                        <span>IČO: 26951444</span>
                        <span>DIČ: CZ2651444</span>
                    </div>
                </div>
                <div className='w-full md:w-1/2 h-full rounded-[25px] bg-white text-black py-5 px-2'>
                    <ContactForm />
                </div>
            </section>
            <section className='flex flex-col w-full lg:w-1/2 mx-auto'>
                <div className='w-full '>

                    {kontakt.staffs?.map((s: Staffs, idx: number) => (
                        s._type === "staffObject" && (
                            <div key={idx} className='w-full my-5 text-center'>
                                <div className='h-4 '>
                                    <h3 className='text-xl font-bold tracking-wide'>{s.jmeno}</h3>
                                </div>
                                <div className='w-full grid grid-cols-1 md:grid-cols-3'>
                                    <div className='w-full grid justify-items-center grid-cols-1 p-4 space-y-4'>
                                        <Mail className='text-amber-400' width={48} height={48} />
                                        <span className='text-xl'>Email</span>
                                        <span>{s.mail}</span>
                                    </div>
                                    <div className='w-full grid justify-items-center grid-cols-1 p-4 space-y-4'>
                                        <Phone className='text-amber-400' width={48} height={48} />
                                        <span className='text-xl'>Email</span>
                                        <span>{s.telefon}</span>
                                    </div>
                                    <div className='w-full grid justify-items-center grid-cols-1 p-4 space-y-4'>
                                        <User className='text-amber-400' width={48} height={48} />
                                        <span className='text-xl'>Email</span>
                                        <span>{s.funkce}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                </div>

            </section>
        </main>
    )
}

