import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { VisualEditing } from "next-sanity"
import { draftMode } from "next/headers"
import "./globals.css";
import { cn } from "@/lib/utils";
import NewsletterForm from "@/components/newsletterForm";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Sponsors } from "@/sanity/lib/interfaces";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KD Ostrov",
  description: "Kulturní dům Ostrov Havlíčkův Brod.",
  icons: {
    icon: "/ostrov.jpg"
  }
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const images: string[] = [
    "https://gate.thepay.cz/img/thepay-v2-210726-transparent.svg?pid=19"
  ]
  const sponsors: Sponsors[] = [
    {
      img: "/hb.png",
      link: "https://www.muhb.cz/",
    },
    {
      img: "/hbostrov.jpg",
      link: "https://hbostrov.cz/",
    },
    {
      img: "/pilsen.png",
      link: "https://www.pilsner-urquell.cz/",
    },
    {
      img: "/rebel.jpg",
      link: "https://www.hbrebel.cz/",
    },
    {
      img: "/rengl.jpg",
      link: "https://www.rengl.cz/cenik-havlickuv-brod",
    },
    {
      img: "/restaurace.jpg",
      link: "http://restauracenaostrove.cz/",
    },
    {
      img: "/rozhlas.jpg",
      link: "https://vysocina.rozhlas.cz/vysocina-hp",
    },
    {
      img: "/spinar.jpg",
      link: "https://www.autospinar.cz/",
    },
    {
      img: "/fotovys.png",
      link: "http://www.fotokoutek-vysocina.cz/",
    }
  ];
  return (
    <html lang="en">
      <body className={cn("bg-black text-white", inter.className)}>
        {draftMode().isEnabled && (
          <div>
            <a className="p-2 bg-blue-300 block" href="/api/disable-draft">
              Disable preview mode
            </a>
          </div>
        )}
        <Navbar />
        {children}
        <NewsletterForm />
        <section className="flex flex-col space-y-5">
          <h2 className="text-center text-xl font-bold">Sponzoři</h2>
          <div className="grid grid-cols-3 gap-4">
            {sponsors.map((s: Sponsors, idx: number) => (
              <Link key={idx} href={s.link}>
                <div className="relative w-full h-14">
                  <Image src={s.img} alt={s.img} fill={true} className="bg-cover object-contain" />
                </div>
              </Link>
            ))}
          </div>
        </section>
        {images.map((i: string, idx: number) => (
          <section key={idx} className="flex w-full relative h-28 px-10 my-10">
            <Link href={"https://web.thepay.cz"} rel="noopener" target="_blank">
              <Image src={i} alt={i} fill={true} className="bg-cover object-contain" />
            </Link>
          </section>
        ))}
        {draftMode().isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
