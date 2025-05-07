import "server-only";

import { groq } from "next-sanity";

export const PLANS_QUERY = groq`*[_type == 'plans']{
    "koncertni_plany": eventPlans[].asset->url,
    "zasedaci_plany": seatPlans[].asset->url,
    eventLinks,
    plesLinks
}`;

export const EQUIPMENT_QUERY = groq`*[_type == 'equipment'] | order(poradi asc) {
    "photo": image.asset->url,
    text
}`;

export const STAFF_QUERY = groq`*[_type == 'staff'][0] {
    contact,
    staffs[]{
        _type == "staffObject" => {
        _type,
        jmeno,
        mail,
        telefon,
        funkce
      },
    }
}`;
export const HISTORY_QUERY = groq`*[_type == 'history'][0]{
    sections[]{
      _type == "textWithImage" => {
        _type,
        "textWithImageUrl": image.asset->url,
        heading,
        text,
        position,
        caption
      }
      },
    "galleryUrls": gallery[].asset->url,  
}`;
export const GALLERY_QUERY = groq`*[_type == 'gallery' && slug.current == $slug][0]{
    name,
    "slug": slug.current,
    eventType,
    "photo": image.asset->url,
    "galleryUrls": gallery[].asset->url,
    seo,
}`;

export const GALLERIES_QUERY = groq`*[_type == 'gallery' && section == 'Koncerty'] | order(date asc){
    name,
    "slug": slug.current,
    time,
    "photo": image.asset->url,
}`;

export const SHOW_QUERY = groq`*[_type == 'gallery' && section == 'Ukázky'] | order(date desc){
    name,
    "slug": slug.current,
    date,
    time,
    "photo": image.asset->url,
}`;

export const EVENT_QUERY = groq`*[_type == 'event' && slug.current == $slug][0] {
    name,
    "slug": slug.current,
    podnadpis,
    text,
    reservation_text,
    "photo": image.asset->url,
    "small": picture.asset->url,
    price,
    time,
    eventUrl,
    reenioUrl,
    eventType,
}`;

export const EVENTS_QUERY = groq`*[_type == 'event'] | order(date asc) {
    name,
    "slug": slug.current,
    "photo": picture.asset->url,
    price,
    time,
    eventType,
}`;

export const CAROUSEL_QUERY = groq`*[_type == 'event' ] | order(date asc) {
    name,
    "slug": slug.current,
    "banner": image.asset->url,
    "photo": picture.asset->url,
    price,
    date,
    time,
    eventType
}`;

export const GALLERY_MAINPAGE_QUERY = groq`*[_type == 'gallery'] | order(date asc){
    name,
    "slug": slug.current,
    time,
    "photo": image.asset->url,
}`;
