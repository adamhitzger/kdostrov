"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { PortableText } from "next-sanity";
import { TextWithImageSection, TextWithImageSectionHistory } from "@/sanity/lib/interfaces";
import { components } from "@/sanity/lib/components";

export default function HistoryComp({ heading, text, textWithImageUrl,caption,  position, _type = "textWithImage" }: TextWithImageSectionHistory) {

    return (
        <section
            className={` flex flex-wrap lg:flex-nowrap border-b-2 border-b-slate-200  lg:min-h-fit  ${position === "Obrázek vlevo" ? "lg:flex-row-reverse" : "lg:flex-row"} `}>
            <div className="w-full lg:w-1/2 flex flex-col  px-5  font-light">
                <div className="flex flex-col w-full m-auto lg:px-10">
                    {heading && (
                        <h2 className={`text-2xl  text-center normal-case"}`}>
                            {heading}
                        </h2>
                    )}
                    <div className={`text-gray-700 ${heading ? "pt-5" : null} text-justify lg:text-center text-base md:text-lg`}>
                         <PortableText
                            value={text} components={components}
                        />

                    </div>
                </div>
            </div>
            <div className={`w-full py-10 lg:py-0  lg:w-1/2 flex justify-center items-center h-[34rem] md:min-h-screen`}>
                
                    {textWithImageUrl ? <Image src={textWithImageUrl} alt={caption} width={1000} height={1000} className="object-cover" /> : null}
        
            </div>
        </section>
    );
}