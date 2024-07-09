"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Menu } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

export default function Navbar() {
    const navLinks = [
        {
            route: "/",
            label: "Domů",
        },
        {
            route: "/program",
            label: "Program"
        },
        {
            route: "/fotogalerie",
            label: "Fotogalerie"
        },

        {
            route: "/provoz",
            label: "Provoz",
        },
        {
            route: "/plany",
            label: "Zasedací plány",
        },
        {
            route: "/kontakt",
            label: "Kontakt",
        },
    ];
    const [active, setActive] = useState("Domů");

    return (
        <nav className="w-full flex py-6 justify-between items-center navbar bg-white">
            <Link href={"/"}>
                <Image
                    width={256}
                    height={128}
                    src="/ostrov.jpg"
                    alt="Logo"
                />
            </Link>
            <ul className="list-none sm:flex hidden justify-end items-center flex-1 px-10">
                {navLinks.map((nav, index) => (
                    <li
                        key={index}
                        className={`font-poppins cursor-pointer text-2xl font-normal ${active === nav.label ? "text-amber-400" : "text-black"
                            } ${index === navLinks.length - 1 ? "mr-0" : "mr-5"}`}
                        onClick={() => setActive(nav.label)}
                    >
                        <a href={`${nav.route}`}>{nav.label}</a>
                    </li>

                ))}
            </ul>
            <div className="lg:hidden flex flex-1 justify-end items-center">
                <div className="sm:hidden flex flex-1 justify-end items-center mr-10">
                    <Sheet >
                        <SheetTrigger><Menu width={32} height={32} color="black" /></SheetTrigger>
                        <SheetContent side={"right"} className="bg-black">
                            <SheetDescription>
                                <ul className="list-none flex justify-end items-start flex-1 flex-col ">
                                    {navLinks.map((nav, index) => (
                                        <li
                                            key={index}
                                            className={`font-poppins font-medium cursor-pointer text-xl ${active === nav.label ? "text-amber-400" : "text-white"
                                                } ${index === navLinks.length - 1 ? "mb-0" : "mb-2"}`}
                                            onClick={() => setActive(nav.label)}
                                        >
                                            <a href={`${nav.route}`} >{nav.label}</a>
                                        </li>
                                    ))}
                                </ul>
                            </SheetDescription>

                        </SheetContent>
                    </Sheet>


                </div>

            </div>

        </nav>
    );
};