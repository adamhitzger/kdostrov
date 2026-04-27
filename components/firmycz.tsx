import Image from "next/image"
import Link from "next/link"
export default function FirmyCZButton(){
  
    return(
         <Link className="fixed bottom-6 right-6 z-40 rounded-full  text-primary items-center justify-center flex flex-row shadow-lg" href="https://www.firmy.cz/detail/12719999-kulturni-dum-ostrov-havlickuv-brod-havlickuv-brod.html" target="_blank" rel="noopener"><Image width="110" height="110" src="https://www.firmy.cz/top-firma/2025.svg" alt="TOP firma 2025" /></Link>
    )
}