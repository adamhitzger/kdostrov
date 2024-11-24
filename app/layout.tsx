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
  icons: {
    icon: "/sponzors/image.png"
  },
  title:"Kulturní dům Ostrov havlíčkův Brod",
  applicationName: "KD Ostrov",
  generator: "Next.ts",
  authors: [{name: "Adam Hitzger"}],
  description: "Kulturní dům Ostrov v Havlíčkově Brodě je moderní multifunkční prostor určený pro širokou škálu kulturních, společenských a sportovních akcí. Pořádají se zde nezapomenutelné koncerty známých kapel, elegantní plesy s bohatým programem, divadelní představení, výstavy a přehlídky. Milovníci sportu ocení možnost zahrát si stolní tenis, zatímco mladší generace se může těšit na zábavné akce a programy zaměřené na mládež. Kulturní dům Ostrov je místem, kde se setkávají lidé všech generací, aby si užili atmosféru společenského života a kulturního vyžití. Díky své strategické poloze v Havlíčkově Brodě je ideální volbou pro obyvatele i návštěvníky města.",
  keywords: ["Kulturní dům Ostrov Havlíčkův Brod", "KD Ostrov", "Předprodej", "Vstupenky", "Kulturní dům", "Havlíčkův Brod", "Kulturní dům Havlíčkův Brod", "Ostrov", "Havlíčkův Brod Ostrov", "Plesy", "Stolení tenis", "Výstavy", "Koncerty", "Taneční Havlíčkův Brod"],
  creator: "Adam Hitzger",
        publisher: "Adam Hitzger",
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
          },
  openGraph: {
    title: "KD Ostrov",
    description: "Kulturní dům Ostrov Havlíčkův Brod. můžete nás navštívit na adrese Na Ostrově 28/3, Havlíčkův Brod - vstup hlavním vchodem z ulice Žižkova, kacelář v 1. patře. Pořádájí se tu koncerty, plesy, taneční kurzy, výstavy či stolní tenis. Kulturní dům Ostrov v Havlíčkově Brodě je moderní multifunkční prostor určený pro širokou škálu kulturních, společenských a sportovních akcí. Pořádají se zde nezapomenutelné koncerty známých kapel, elegantní plesy s bohatým programem, divadelní představení, výstavy a přehlídky. Milovníci sportu ocení možnost zahrát si stolní tenis, zatímco mladší generace se může těšit na zábavné akce a programy zaměřené na mládež. Kulturní dům Ostrov je místem, kde se setkávají lidé všech generací, aby si užili atmosféru společenského života a kulturního vyžití. Díky své strategické poloze v Havlíčkově Brodě je ideální volbou pro obyvatele i návštěvníky města.",
    url: "https://www.kdostrov.cz",
    siteName: "Kulturní dům Ostrov Havlíčkův Brod",
    locale: "cs_CZ",
    type: "website"
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
      img: "/panskydum.png",
      link: "https://www.hotelpanskydum.com/",
    },
    {
      img: "/arena.png",
      link: "https://www.arenaapartmentshb.cz/",
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
        <section className="flex flex-col bg-white space-y-5 px-20 lg:px-30 py-10">
          <h2 className="text-center text-4xl font-bold text-black ">Sponzoři</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-y-8 py-10">
            {sponsors.map((s: Sponsors, idx: number) => (
              <Link key={idx} href={s.link}>
                <div className="relative w-full h-20">
                  <Image src={`/sponzors${s.img}`} alt={s.img} fill={true} className="bg-cover object-contain" />
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section className="flex w-full relative h-28 px-10 my-10 ">
          <Link href={"https://web.thepay.cz"} rel="noopener" target="_blank">
            <Image src={"https://gate.thepay.cz/img/thepay-v2-210726-transparent.svg?pid=19"} alt={"Platby KD Ostrov fungují přes thepay.cz"} fill={true} className="bg-cover object-contain" />
          </Link>
        </section>
        <section className="flex w-full relative h-64 px-10 my-10">
          <Image src={"/sponzors/mjplayas.jpg"} alt={"Dotace EU "} fill={true} className="bg-cover object-contain" />

        </section>
        {draftMode().isEnabled && <VisualEditing />}
        <SpeedInsights />
        <Footer />
      </body>
    </html>
  );
}
