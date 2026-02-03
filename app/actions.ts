"use server";

import { createTransport } from "nodemailer";
import { emailType, EventCard } from "@/sanity/lib/interfaces";
import { groq } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/fetch";


interface NewsletterOptions {
  preheaderText?: string;
  headerTitle?: string;
  footerText?: string;
  accentColor?: string;
  baseUrl?: string;
}

export async function generateNewsletterHTML(
  events: EventCard[],
  options: NewsletterOptions = {}
): Promise<string> {
  const {
    preheaderText = "Nenechte si ujít nadcházející koncerty!",
    headerTitle = "Nadcházející koncerty",
    footerText = "© 2026 KD Ostrov. Všechna práva vyhrazena.",
    accentColor = "#fbbf24",
    baseUrl = "https://www.kdostrov.cz",
  } = options;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("cs-CZ", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("cs-CZ", {
      style: "currency",
      currency: "CZK",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const eventCards = events
    .map(
      (event) => `
      <tr>
        <td style="padding: 0 0 24px 0;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
            <tr>
              <td>
                ${
                  event.photo
                    ? `
                  <a href="${baseUrl}/${event.slug}" style="text-decoration: none;">
                    <img src="${event.photo}" alt="${event.name}" width="100%" style="display: block; max-height: 200px; object-fit: cover; border-radius: 12px 12px 0 0;" />
                  </a>
                `
                    : ""
                }
              </td>
            </tr>
            <tr>
              <td style="padding: 20px 24px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td>
                      <span style="display: inline-block; background-color: ${accentColor}; color: #ffffff; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; padding: 4px 10px; border-radius: 4px; margin-bottom: 12px;">
                        ${event.eventType}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top: 8px;">
                      <a href="${baseUrl}/${event.slug}" style="text-decoration: none; color: #1a1a1a;">
                        <h2 style="margin: 0; font-size: 20px; font-weight: 700; line-height: 1.3;">
                          ${event.name}
                        </h2>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top: 12px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td style="padding-right: 16px;">
                            <p style="margin: 0; font-size: 14px; color: #666666;">
                              ${formatDate(event.date)}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-top: 4px;">
                            <p style="margin: 0; font-size: 14px; color: #666666;">
                              ${event.time}
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top: 16px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td>
                            <span style="font-size: 18px; font-weight: 700; color: ${accentColor};">
                              ${formatPrice(event.price)}
                            </span>
                          </td>
                          <td align="right">
                            <a href="${baseUrl}/${event.slug}" style="display: inline-block; background-color: ${accentColor}; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 10px 20px; border-radius: 6px;">
                              Koupit vstupenky
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `
    )
    .join("");

  return `
<html lang="cs" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${headerTitle}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <style>
    td, th, div, p, a, h1, h2, h3, h4, h5, h6 { font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly; }
  </style>
  <![endif]-->
  <style>
    @media (max-width: 600px) {
      .mobile-padding { padding-left: 16px !important; padding-right: 16px !important; }
      .mobile-stack { display: block !important; width: 100% !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; width: 100%; word-break: break-word; -webkit-font-smoothing: antialiased; background-color: #f4f4f5;">
  <div style="display: none; max-height: 0; overflow: hidden;">${preheaderText}&#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;</div>
  <div role="article" aria-roledescription="email" aria-label="${headerTitle}" lang="cs" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f4f5;">
      <tr>
        <td align="center" style="padding: 40px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 560px;">
            
            <!-- Header -->
            <tr>
              <td style="padding-bottom: 32px; text-align: center;">
                <h1 style="margin: 0; font-size: 32px; font-weight: 800; color: #1a1a1a; line-height: 1.2;">
                  ${headerTitle}
                </h1>
                <p style="margin: 12px 0 0; font-size: 16px; color: #666666; line-height: 1.5;">
                  ${preheaderText}
                </p>
              </td>
            </tr>
            
            <!-- Event Cards -->
            ${eventCards}
            
            <!-- View All Button -->
            <tr>
              <td style="padding: 16px 0 32px; text-align: center;">
                <a href="${baseUrl}/akce" style="display: inline-block; background-color: #1a1a1a; color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; padding: 14px 32px; border-radius: 8px;">
                  Zobrazit všechny akce
                </a>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="padding-top: 24px; border-top: 1px solid #e4e4e7; text-align: center;">
                <p style="margin: 0; font-size: 13px; color: #a1a1aa; line-height: 1.6;">
                  ${footerText}
                </p>
                <p style="margin: 12px 0 0; font-size: 13px; color: #a1a1aa;">
                  <a href="${baseUrl}/sign-out" style="color: #a1a1aa; text-decoration: underline;">Odhlásit odběr</a>
                  &nbsp;
                </p>
              </td>
            </tr>
            
          </table>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>
  `.trim();
}


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

export async function createCampaign(){
  try{
    let query = groq`*[_type == 'event' && eventType == 'Koncerty'][0..9] | order(date asc) {
        name,
        "slug": slug.current,
        "photo": picture.asset->url,
        price,
        date,
        time,
        eventType,
    }`;
    const result = await sanityFetch<EventCard[]>({query: query})
    const html = await generateNewsletterHTML(result)
    const transporter = createTransport({
     service: "gmail",
     auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.FROM_EMAIL_PASSWORD,
     }
    });
  
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: ["vedeni@kdostrov.cz", "info@kdostrov.cz"],
      subject: "Newsletter",
      html,
    };
    const emailSent = await  transporter.sendMail(mailOptions);  
    if(emailSent.accepted){
      console.log("Email byl poslán")
    }
    const today = new Date().toISOString().slice(0, 10)
    const sentTmp =  await fetch(`https://api2.ecomailapp.cz/template`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "key": process.env.ECOMAIL_API_KEY!
  },
  
  body: JSON.stringify({
    name: today.toString(),
    html: html
  })

})
console.log("Tmp:", await sentTmp.json())
  }catch(error){
    console.log(error)
  }
}

export async function signOutFromMailsUnregistered(formData: FormData): Promise<{success: boolean, message: string}>{
  try{
    
    const mail = formData.get("email") as string;
    const res= await fetch(`https://api2.ecomailapp.cz/lists/1/unsubscribe`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    "key": process.env.ECOMAIL_API_KEY!
  },
  body: JSON.stringify({
      email: mail
  })

})
console.log("Chyba",await res.json())
    return {
      success: true,
      message: "Byl jste odhlášen."
    }

  }catch(error){
    console.log("Chyba při odhlašování emailu z Ecomailu: ", error)
    return {
      success: false,
      message: "Nebyl jste odhlášen. Vyskytla se chyba."
    }
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
      subject: "Kontakt",
      text: `${fullname}, ${phone}, ${email}, ${ltd}, ${msg}` ,
    };

    try{
      if(emailType === "contact"){
        const emailSent = await  transporter.sendMail(mailOptions);  
        console.log(emailSent.accepted);
      }else{
       const res= await fetch(`https://api2.ecomailapp.cz/lists/1/subscribe`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "key": process.env.ECOMAIL_API_KEY!
  },
  body: JSON.stringify({
    subscriber_data: {
      email: email
    },
    resubscribe: true
  })

})
console.log("Chyba:",await res.json())
      }
    }catch(error){
      console.log(error);
    }
  }