import TextWithImage from '@/components/textWithImage';
import { sanityFetch } from '@/sanity/lib/fetch'
import { EquipmentInt } from '@/sanity/lib/interfaces'
import { EQUIPMENT_QUERY } from '@/sanity/lib/queries'
import React from 'react'

export default async function VybaveniPage() {
    const equipments: EquipmentInt[] = await sanityFetch<EquipmentInt[]>({ query: EQUIPMENT_QUERY });
    console.log(equipments)
    return (
        <main className='grid grid-cols-1 py-20 px-10 gap-y-4 text-white'>
            {equipments.map((e: EquipmentInt, idx: number) => (
                <TextWithImage key={idx} color="white" position={idx % 2 === 0 ? "Obrázek vlevo" : "Text vlevo"} isDynamic={true} text={e.text} url={e.photo} />
            ))}
        </main>
    )
}

