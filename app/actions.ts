"use server";

import { revalidatePath } from "next/cache";
import { createTransport } from "nodemailer";
import { redirect, useRouter } from "next/navigation";
import { emailType } from "@/sanity/lib/interfaces";
import { RefObject } from "react";

export async function newsletter(formData: FormData, emailType: emailType) {
  let fullname: string = "";
    let phone: string = "";
    let email: string = "";
    let ltd: string = "";
    let msg: string = "";
    if(emailType == "newsletter"){
        email = formData.get("email") as string;
    }
    if(emailType == "contact"){
        fullname = formData.get("fullname") as string;
        phone = formData.get("phone") as string;
        email = formData.get("email") as string;
        ltd = formData.get("ltd") as string;
        msg = formData.get("msg") as string;
    }

    const transporter = createTransport({
     service: "gmail",
     auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.FROM_EMAIL_PASSWORD,
     }
    });
  
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: emailType === "newsletter" ? "Newsletter" : "Kontakt",
      text: emailType == "newsletter" ? `${email}` : `${fullname}, ${phone}, ${email}, ${ltd}, ${msg}` ,
    };

    try{
      await  transporter.sendMail(mailOptions);  
    }catch(error){
      console.log(error);
    }
  }