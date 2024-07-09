import { sanityFetch } from '@/sanity/lib/fetch'
import { Plany } from '@/sanity/lib/interfaces'
import { PLANS_QUERY } from '@/sanity/lib/queries'
import HeadingWithImages from '@/components/headingWithImages'
import React from 'react'

export default async function PlansPage() {
    const plany = await sanityFetch<Plany[]>({ query: PLANS_QUERY });
    console.log(plany)
    return (
        <main className="w-full flex flex-col min-h-screen px-10 py-20 bg-black">
            {plany.map((plan: Plany, idx: number) => (
                <div key={idx}>
                    <HeadingWithImages urls={plan.koncertni_plany} heading="Koncertní zasedácí plány" />
                    <HeadingWithImages urls={plan.zasedaci_plany} heading='Plesové zasedácí plány' />
                </div>
            ))}
        </main>
    )
}

