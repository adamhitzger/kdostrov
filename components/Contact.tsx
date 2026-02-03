"use client";

import React, {useTransition } from 'react'
import { Button } from './ui/button';
import { newsletter } from '@/app/actions';
import Link from 'next/link';
import { toast } from 'sonner';

export default function ContactForm() {
    const [isPending, startTransition] = useTransition();

    const sendNewsletter = async (formData: FormData) => {
        await newsletter(formData, "contact");
        toast.success("Vaše zpráva byla zaslána")
    }
    return (
        <>
            <form className='w-full' action={sendNewsletter}>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <div className="text-2xl my-5 space-y-5">
                        <div>
                            <label htmlFor="fullname">Celé jméno</label>
                            <input className=" w-full p-2 shadow-sm border-2 border-gray-600 rounded-xl" type="text" name='fullname' id='fullname'   required disabled={isPending} />
                        </div>
                        <div>
                            <label htmlFor="phone">Telefonní číslo</label>
                            <input className=" w-full p-2 shadow-sm border-2 border-gray-600 rounded-xl" type="text" name='phone' id='phone'   required disabled={isPending} />
                        </div>
                    </div>

                    <div className="text-2xl my-5 space-y-5">
                        <div>
                            <label htmlFor="email">Email</label>
                            <input className="w-full p-2 shadow-sm border-2 border-gray-600 rounded-xl" type="email" name="email" id='email'   required disabled={isPending} />
                        </div>
                        <div>
                            <label htmlFor="ltd">Firma</label>
                            <input className="w-full p-2 shadow-sm border-2 border-gray-600 rounded-xl" type="ltd" name="ltd" id='ltd'   disabled={isPending} />
                        </div>
                    </div>
                </div>
                <div className="text-2xl my-5 w-full">
                    <label htmlFor="msg">Zpráva</label>
                    <textarea className=" w-full p-2 shadow-sm border-2 border-gray-600 rounded-xl" name='msg' id='msg'  disabled={isPending}></textarea>
                </div>
                  <span >Odesláním souhlasíte se <Link className="font-semibold underline underline-offset-2" href={"/ochrana-os-udaju"}>zpracováním osobních údajů</Link></span>
                <div className="text-xl font-semibold w-full flex justify-around">
                    <Button type="submit" variant={"outline"} size={"lg"} disabled={isPending}>{isPending ? "Odesílám..." : "Odeslat"}</Button>
                </div>
              
            </form>

        </>
    )
}
