import Image from "next/image";
import { PortableText } from "next-sanity";
import { TextWithImageSection } from "@/sanity/lib/interfaces";

export default function TextWithImage({ text, url, position, isDynamic, node }: TextWithImageSection) {
    return (
        <section
            className={`flex ${position === "Obrázek vlevo" ? "flex-wrap-reverse" : "flex-wrap"} md:flex-nowrap h-screen ${position === "Obrázek vlevo" ? "md:flex-row-reverse" : "md:flex-row"} 2xl:p-10 h-max`}>
            <div className="w-full md:w-1/2 h-full flex flex-col px-4">
                <div className={`text-black flex flex-col h-full items-center text-xl leading-8`}>
                    {node ? node : null}
                    {isDynamic && text ? (text ? <PortableText
                        value={text}
                    /> : null) : (text ? <p>{text}</p> : null)}

                </div>
            </div>
            <div className={`w-full md:w-1/2 flex items-center border border-red-500`}>
                <div className={`relative w-full h-[36rem] md:h-96 mx-auto`}>
                    <Image src={url} alt={url} fill={true} className="bg-cover object-contain min-h-full" />
                </div>
            </div>
        </section>
    );
};
