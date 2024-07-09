"use client";
import { Button } from "@/components/ui/button";
import { useState, useTransition, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { SocialIcon } from 'react-social-icons/component'
import { SocialList } from "@/sanity/lib/interfaces";
import 'react-social-icons/facebook'
import 'react-social-icons/instagram'
import { sendNewsletter } from "../lib/actions";

export default function NewsletterForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const icons: SocialList[] = [
        {
            icon: "instagram",
            link: "https://www.instagram.com/kdostrov/"
        },
        {
            icon: "facebook",
            link: "https://www.facebook.com/kdostrov/?locale=cs_CZ"
        }
    ]
    const [isPending, startTransition] = useTransition();
    const [form, setForm] = useState({
        email: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }
    return (
        <section className="grid grid-cols-1 gap-y-4 w-full my-20 place-items-center">
            <div className="w-full lg:w-1/2 space-y-4 border border-white py-10 px-4 text-center">
                <h2 className="text-3xl font-semibold tracking-wide ">Přihlašte se k newsletteru!</h2>
                <h3 className="text-lg ">Budeme Vás informovat o nadcházejících událostech, slevách atd.</h3>
                <form className="flex flex-row gap-x-2  font-semibold " ref={formRef} action={sendNewsletter}>
                    <Input className="bg-white text-black text-base tracking-wider border border-white" name="email" placeholder="Zadejte email" defaultValue={form.email} type="email" disabled={isPending} onChange={handleChange} required />
                    <Button className="my-0" variant="outline" disabled={isPending}>{isPending ? "Odesílám" : "Odeslat"}</Button>
                </form>
            </div>
            <div className="w-full lg:w-1/2 space-y-4 border border-white py-10">
                <h2 className="text-xl font-semibold tracking-wide text-center">Spojte se s námi</h2>
                <div className=" flex w-full py-5 justify-around">
                    {icons.map((i: SocialList, idx: number) => (
                        <SocialIcon key={idx} network={i.icon} url={i.link} style={{ height: "4rem", width: "4rem" }} as="div" bgColor="white" fgColor="transparent" />
                    ))}
                </div>
            </div>
        </section>

    )
}

