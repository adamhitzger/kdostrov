
import Image from "next/image";
import { PortableText } from "next-sanity";
import { TextWithImageSectionHistory } from "@/sanity/lib/interfaces";
import { components } from "@/sanity/lib/components";

export default function HistoryComp({ heading, text, textWithImageUrl,caption,  position, _type = "textWithImage" }: TextWithImageSectionHistory) {

    return (
        <section
            className={` flex flex-wrap md:flex-nowrap py-10  ${position === "Obrázek vlevo" ? "md:flex-row-reverse" : "md:flex-row"} `}>
            <div className="w-full lg:w-1/2 flex flex-col  px-5  font-light">
                <div className="flex flex-col w-full m-auto lg:px-10">
                    {heading && (
                        <h2 className={`text-2xl text-black text-center normal-case"}`}>
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
            <div className={`w-full py-10 flex-col justify-center  lg:w-1/2 flex items-center h-[30rem]`}>
                
                    {textWithImageUrl ? <Image src={textWithImageUrl} alt={caption} width={1000} height={1000} className="object-cover" /> : null}
        
            </div>
        </section>
    );
}