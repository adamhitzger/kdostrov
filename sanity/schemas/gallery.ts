import { defineField, defineType } from "sanity";

export const galleryType = defineType({
    name: "gallery",
    title: "Galerie",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Název akce",
            type: "string",
        }),
        defineField({
            name: "slug",
            title: "Url adresa",
            type: "slug",
            options: {
                source: "name",
            }
        }),
        defineField({
            name: "date",
            title: "Datum koncertu",
            type: "date",
        }),
        defineField({
            name:"section",
            title:"Sekce na stánce",
            type:"string",
            options: {
                list: ["Ukázky", "Koncerty"],
                layout:"radio",
            }
        }),
        defineField({
            name: "time",
            title: "Čas konání",
            type: "string",
        }),
        defineField({
            name:"eventType",
            title:"Typ akce",
            type:"string",
            options: {
                list: ["Koncerty", "Plesy", "Taneční kurzy", "Výstavy/Prodejní akce", "Stolní tenis"],
                layout:"radio",
            }
        }),
        defineField({
            name: "image",
            title: "Hlavní obrázek",
            type: "image",
        }),
        defineField({
            name: "gallery",
            title: "Galerie",
            type: "array",
            of: [
                {type: "image"}
            ]
        }),
    ]
})