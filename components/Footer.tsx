"use client";
import Link from 'next/link'
import React from 'react'

export default function Footer() {
    const year: number = new Date().getFullYear();
    return (
        <footer className='flex w-full  p-10'>
            <div className='w-full grid grid-rows-2 gap-y-3 md:w-4/5   mx-auto'>
                <div className='grid grid-cols-3 py-4 border-t-2 border-white'>
                    <span>info@kdostrov.cz</span>
                    <Link href={"https://cdn.sanity.io/files/a3wdqcta/production/fd8b93eaf3657ff35833dbaad3ca71d8ab187e67.pdf"}>Zásady ochrany osobních údajů</Link>
                    <span>Na Ostrově 28/3, 580 01, Havlíčkův Brod</span>
                </div>
                <div className='grid grid-cols-3 py-4 border-t-2 border-white'>
                    <span>&copy; {year} Developed by <Link href="https://www.linkedin.com/in/adam-hitzger-aa518622b/?originalSubdomain=cz" className="underline underline-offset-2">Adam Hitzger</Link></span>
                    <Link href={"https://cdn.sanity.io/files/a3wdqcta/production/ca1f578665e51e3aa522c8b02012585d4d90fd1b.pdf"}>Všeobecné obchodní podmínky</Link>
                    <span className='place-self-end'><Link href={"#top"}>Nahoru</Link></span>
                </div>
            </div>
        </footer>
    )
}

