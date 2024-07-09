import React from "react";

type EventType = "Koncerty" |"Plesy" |"taneční kurzy" |"Výstavy/Prodejní akce" |"Stolní tenis";
type PositionType = "Obrázek vlevo" | "Text vlevo"; 

export interface Plany {
    koncertni_plany: string[];
    zasedaci_plany: string[];
}

export interface Equipment {
    image: string;
    heading: string;
    text: string[];
    download: string;
};

export interface Staff {
    name: string;
    email: string;
    phone: string;
    position: string;
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
