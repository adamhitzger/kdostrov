import { sanityFetch } from '@/sanity/lib/fetch'
import { Plany } from '@/sanity/lib/interfaces'
import { PLANS_QUERY } from '@/sanity/lib/queries'
import HeadingWithImages from '@/components/headingWithImages'
import React from 'react'
import { PortableText } from 'next-sanity'
import { components } from '@/sanity/lib/components'

export default async function PlansPage() {
    const plany = await sanityFetch<Plany[]>({ query: PLANS_QUERY });
    console.log(plany)
    return (
        <main className="w-full flex flex-col min-h-screen px-10 py-20 bg-black">
            {plany.map((plan: Plany, idx: number) => (
                <div key={idx}>
                    <HeadingWithImages urls={plan.koncertni_plany} heading="Koncertní zasedácí plány" />
                    <div className='w-full flex text-xl'>
                        <div className='w-full md:w-1/2'>
                            <PortableText value={plan.eventLinks} components={components} />
                        </div>
                    </div>
                    <HeadingWithImages urls={plan.zasedaci_plany} heading='Plesové zasedácí plány' />
                    <div className='w-full flex text-xl'>
                        <div className='w-full md:w-1/2'>
                            <PortableText value={plan.plesLinks} components={components} />
                        </div>
                    </div>
                </div>
            ))}
        </main>
    )
}

