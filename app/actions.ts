"use server";

import { createTransport } from "nodemailer";
import { redirect, useRouter } from "next/navigation";
import { emailType, EventCard } from "@/sanity/lib/interfaces";
import { groq } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/fetch";

export async function getAllEvents(){
  const FILTERED_EVENTS_QUERY = groq`*[_type == 'event'] | order(date asc) {
    name,
    "slug": slug.current,
    "photo": picture.asset->url,
    price,
    date,
    time,
    eventType,
}`;
try{
  const result = await sanityFetch<EventCard[]>({query: FILTERED_EVENTS_QUERY})
  return {
    result
  };
}catch(error){
  console.error(error);
  throw error;
}
}

export async function getEvents(params: string){
  let filter: string = "";
  let query = "";
  switch(params){
    case "koncerty":
      filter = "Koncerty"
      break;
      case "plesy":
        filter = "Plesy"
        break;  
        case "kurzy":
          filter = "Taneční kurzy"
          break;
          case "vystavy":
      filter = "Výstavy/Prodejní akce"
      break;
      case "stolnitenis":
      filter = "Stolní tenis"
      break;
  }
     query = groq`*[_type == 'event' && eventType == '${filter}'] | order(date asc) {
        name,
        "slug": slug.current,
        "photo": picture.asset->url,
        price,
        date,
        time,
        eventType,
    }`;
    try{
      const result = await sanityFetch<EventCard[]>({query: query})
      return {
        result
      };
    }catch(error){
      console.error(error);
      throw error;
    }
}

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
      const emailSent = await  transporter.sendMail(mailOptions);  
      console.log(emailSent.accepted);
    }catch(error){
      console.log(error);
    }
  }