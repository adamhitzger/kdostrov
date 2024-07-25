import React from "react";

export type EventType = "Koncerty" |"Plesy" |"Taneční kurzy" |"Výstavy/Prodejní akce" |"Stolní tenis";
type PositionType = "Obrázek vlevo" | "Text vlevo"; 
type FontColor = "black" | "white";
export type emailType = "newsletter" | "contact"

export interface Plany {
    koncertni_plany: string[];
    zasedaci_plany: string[];
    eventLinks: any;
    plesLinks: any;
}

export interface EquipmentInt {
    photo: string;
    text: any;
};

export interface StaffQuery {
    contact: any;
    staffs: Staffs[];
}

export type Staffs ={
    _type: "staffObject" | undefined;
    jmeno: string;
    mail: string;
    telefon: string;
    funkce: string;
}

export interface Gallery {
    name: string;
    slug: {
        current: string,
    };
    date: string;
    photo: string;
    galleryUrls: string[];
    eventType: EventType
}

export interface GalleryCard {
    slug: {
        current: string,
    };
    photo: string; 
    date: string;
    name: string;
}

export interface EventCard {
    name: string;
    slug: {
        current: string,
    };
    banner: string;
    photo: string;
    price: number,
    date: string;
    time: string;
    eventType: EventType
}

export interface EventInterface {
    name: string;
    slug: {
        current: string,
    };
    podnadpis: string;
    date: string;
    time: string;
    text: any;
    reservation_text: any;
    photo: string; 
    small: string;
    price: number,
    eventUrl: string;
    reenioUrl: string;
    eventType: EventType
}

export interface TextWithImageSection {
    text?: any;
    url: string;
    position: PositionType;
    isDynamic: boolean;
    node?: React.ReactNode;
    color?: FontColor;
}

export interface CarouselQuery {
    name: string;
    slug: {
        current: string,
    };
    photo: string;
    price: number,
    date: string;
    time: string;
}

export interface SocialList {
    icon: string;
    link: string;
}

export type Sponsors = {
    img: string;
    link: string;
  };