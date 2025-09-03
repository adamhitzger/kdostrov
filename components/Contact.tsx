"use client";

import React, { useRef, useState, useTransition } from 'react'
import { Button } from './ui/button';
import { newsletter } from '@/app/actions';

export default function ContactForm() {
    const formref = useRef<HTMLFormElement>(null);
    const [isPending, startTransition] = useTransition();
    const [form, setForm] = useState({
        fullname: "",
        email: "",
        phone: "",
        ltd: "",
        msg: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    };

    const sendNewsletter = async (formData: FormData) => {
        await newsletter(formData, "contact");
        setForm({
            fullname: "",
            email: "",
            phone: "",
            ltd: "",
            msg: "",
        })
    }
    return (
        <>
            <form className='w-full' ref={formref} action={sendNewsletter}>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <div className="text-2xl my-5 space-y-5">
                        <div>
                            <label htmlFor="fullname">Celé jméno</label>
                            <input className=" w-full p-2 shadow-sm shadow-amber-400" type="text" name='fullname' id='fullname' value={form.fullname} onChange={handleChange} required disabled={isPending} />
                        </div>
                        <div>
                            <label htmlFor="phone">Telefonní číslo</label>
                            <input className=" w-full p-2 shadow-sm shadow-amber-400" type="text" name='phone' id='phone' value={form.phone} onChange={handleChange} required disabled={isPending} />
                        </div>
                    </div>

                    <div className="text-2xl my-5 space-y-5">
                        <div>
                            <label htmlFor="email">Email</label>
                            <input className="w-full p-2 shadow-sm shadow-amber-400" type="email" name="email" id='email' value={form.email} onChange={handleChange} required disabled={isPending} />
                        </div>
                        <div>
                            <label htmlFor="ltd">Firma</label>
                            <input className="w-full p-2 shadow-sm shadow-amber-400" type="ltd" name="ltd" id='ltd' value={form.ltd} onChange={handleChange} disabled={isPending} />
                        </div>
                    </div>
                </div>
                <div className="text-2xl my-5 w-full">
                    <label htmlFor="msg">Zpráva</label>
                    <textarea className=" w-full p-2 shadow-sm shadow-amber-400" name='msg' id='msg' value={form.msg} onChange={handleChange} required disabled={isPending}></textarea>
                </div>
                <div className="text-xl font-semibold w-full flex justify-around">
                    <Button type="submit" variant={"outline"} size={"lg"} disabled={isPending}>{isPending ? "Odesílám..." : "Odeslat"}</Button>
                </div>
            </form>
        </>
    )
}
