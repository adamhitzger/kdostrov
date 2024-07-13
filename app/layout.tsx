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
import { SpeedInsights } from "@vercel/speed-insights/next"
import Footer from "@/components/Footer";
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
  const sponsors: Sponsors[] = [
    {
      img: "/hbfull.png",
      link: "https://www.muhb.cz/",
    },
    {
      img: "/sten.png",
      link: "https://hbostrov.cz/",
    },
    {
      img: "/pilsen.png",
      link: "https://www.pilsner-urquell.cz/",
    },
    {
      img: "/rebel.png",
      link: "https://www.hbrebel.cz/",
    },
    {
      img: "/rengl.png",
      link: "https://www.rengl.cz/cenik-havlickuv-brod",
    },
    {
      img: "/restaurant.png",
      link: "http://restauracenaostrove.cz/",
    },
    {
      img: "/crv.png",
      link: "https://vysocina.rozhlas.cz/vysocina-hp",
    },
    {
      img: "/spinar.png",
      link: "https://www.autospinar.cz/",
    },
    {
      img: "/kunc.png",
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sponsors.map((s: Sponsors, idx: number) => (
              <Link key={idx} href={s.link}>
                <div className="relative w-full h-32">
                  <Image src={`/sponzors${s.img}`} alt={s.img} fill={true} className="bg-cover object-contain" />
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section className="flex w-full relative h-28 px-10 my-10">
          <Link href={"https://web.thepay.cz"} rel="noopener" target="_blank">
            <Image src={"https://gate.thepay.cz/img/thepay-v2-210726-transparent.svg?pid=19"} alt={"https://gate.thepay.cz/img/thepay-v2-210726-transparent.svg?pid=19"} fill={true} className="bg-cover object-contain" />
          </Link>
        </section>
        <section className="flex w-full relative h-64 px-10 my-10">
          <Image src={"/sponzors/mjplayas.jpg"} alt={"/sponzors/mjplayas.jpg"} fill={true} className="bg-cover object-contain" />

        </section>
        {draftMode().isEnabled && <VisualEditing />}
        <SpeedInsights />
        <Footer />
      </body>
    </html>
  );
}
