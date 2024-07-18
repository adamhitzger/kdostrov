import Image from "next/image";
import { PortableText } from "next-sanity";
import { TextWithImageSection } from "@/sanity/lib/interfaces";
import Link from "next/link";
import { components } from "@/sanity/lib/components";

export default function TextWithImage({ text, url, position, isDynamic, node, color }: TextWithImageSection) {
    return (
        <section
            className={`flex ${position === "Obrázek vlevo" ? "flex-wrap-reverse" : "flex-wrap"} md:flex-nowrap ${position === "Obrázek vlevo" ? "md:flex-row-reverse" : "md:flex-row"}  2xl:p-20 h-max`}>
            <div className="w-full md:w-1/2 h-full flex flex-col px-4">
                <div className={`text-${!color ? "black" : color} flex flex-col h-full items-center text-xl leading-8 `}>
                    {node ? node : null}
                    {isDynamic && text ? (text ? <PortableText
                        value={text} components={components}
                    /> : null) : (text ? <p>{text}</p> : null)}

                </div>
            </div>
            <div className={`w-full md:w-1/2 flex`}>
                <div className={`relative w-full h-[36rem] md:h-96 mx-auto`}>
                    <Image src={url} alt={url} fill={true} className="bg-cover object-contain min-h-full" />
                </div>
            </div>
        </section>
    );
};
