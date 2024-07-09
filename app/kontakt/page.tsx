import { sanityFetch } from '@/sanity/lib/fetch'
import { Staff, Staffs } from '@/sanity/lib/interfaces'
import { STAFF_QUERY } from '@/sanity/lib/queries'
import { Mail, Phone, User } from 'lucide-react';
import { PortableText } from 'next-sanity';
import React from 'react'
import ContactForm from "@/components/Contact";

export default async function KontaktPage() {
    const zamestnanci = await sanityFetch<Staff>({ query: STAFF_QUERY });
    console.log(zamestnanci);
    return (
        <PortableText value={zamestnanci.contact} />
    )
}

/**
 * 
 * <main className='w-full flex flex-col space-y-10 py-20 px-10 lg:py-20 text-white'>
            <section className='flex flex-wrap md:flex-nowrap bg-gray-900 w-full md:w-3/4 mx-auto rounded-[25px] p-3 lg:p-10 space-y-4'>
                <div className='w-full md:w-1/2 h-full rounded-[25px] bg-black py-5 px-2 space-y-4'>
                    <h1 className='texl-xl font-bold'>Neváhejte nás kontaktovat</h1>
                    <hr className="bg-white w-full border-none text-white h-0.5" />
                    {staff.contact ? <PortableText value={staff.contact} /> : null}
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
                {staff.staffs?.map((s: Staffs, idx: number) => (
                    s._type === "staffObject" && (
                        <div key={idx} className='w-full flex text-center'>
                            <h3 className='text-lg font-bold tracking-wide'>{s.jmeno}</h3>
                            <div className='w-full grid grid-cols-3 p-4 space-y-4'>
                                <Mail className='bg-amber-400' />
                                <span className='text-xl'>Email</span>
                                <span>{s.mail}</span>
                            </div>
                            <div className='w-full grid grid-cols-3 p-4 space-y-4'>
                                <Phone className='bg-amber-400' />
                                <span className='text-xl'>Email</span>
                                <span>{s.telefon}</span>
                            </div>
                            <div className='w-full grid grid-cols-3 p-4 space-y-4'>
                                <User className='bg-amber-400' />
                                <span className='text-xl'>Email</span>
                                <span>{s.funkce}</span>
                            </div>
                        </div>
                    )
                ))}
            </section>
        </main>
 */