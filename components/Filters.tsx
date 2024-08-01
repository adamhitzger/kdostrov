"use client";

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from './ui/button';
import { formUrlQuery } from '@/lib/utils';

export default function Filters() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [active, setActive] = useState<string>("");
    const filters = [
        { name: "Koncerty", value: "koncerty" },
        { name: "Plesy", value: "plesy" },
        { name: "Taneční kurzy", value: "kurzy" },
        { name: "Výstavy/Prodejní akce", value: "vystavy" },
        { name: "Stolní tenis", value: "stolnitenis" },
    ];

    const handleTypeClick = (item: string) => {
        if (active === item) {
            setActive("");

            const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'filter',
                value: null
            })

            router.push(newUrl, { scroll: false });
        } else {
            setActive(item);

            const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'filter',
                value: item.toLowerCase()
            })

            router.push(newUrl, { scroll: false });
        }
    }
    return (
        <div className="flex flex-wrap xl:flex-nowrap justify-between w-full lg:px-24  space-x-3">
            {filters.map((f) => (
                <Button key={f.value} onClick={() => { }}
                    className={`border text-base lg:text-lg font-semibold border-amber-400 ${active === f.value
                        ? "bg-amber-400"
                        : null
                        }`}
                    size={"sm"}
                    onClickCapture={() => handleTypeClick(f.value)}
                >
                    {f.name}
                </Button>
            ))}
        </div>
    )
}

