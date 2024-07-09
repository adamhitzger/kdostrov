"use server";

import { revalidatePath } from "next/cache";

export async function sendNewsletter(formData: FormData){
    const email = formData.get("email") as string;
    revalidatePath("/");
    console.log(email); 
}