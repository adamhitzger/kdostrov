import { defineType, defineField } from "sanity"
export const eventType = defineType({
    name: "event",
    title: "Akce",
    type: "document",
    fields: [
        defineField({
            name: "date",
            title: "Datum konání",
            type: "date",
        }),
        defineField({
            name: "name",
            title: "Název akce",
            type: "string",
        }),
        defineField({
            name: "podnadpis",
            title: "Podnadpis",
            type: "string",
        }),
        defineField({
            name: "slug",
            title: "Url adresa",
            type: "slug",
            options: {
                source: "name"
            }
        }),
        defineField({
            name: "time",
            title: "Čas konání",
            type: "string",
        }),
        defineField({
            name: "text",
            title: "Popis akce",
            type: "array",
            of: [
                {type: "block"},
            ]
        }),
        defineField({
            name: "reservation_text",
            title: "Rezervační text",
            type: "array",
            of: [
                {type: "block"},
            ]
        }),
        defineField({
            name: "image",
            title: "Úvodní fotka",
            type: "image",
        }),
        defineField({
            name: "picture",
            title: "Malá fotka",
            type: "image",
        }),
        defineField({
            name: "price",
            title: "Cena vstupenek od",
            type: "number",
        }),
        defineField({
            name: "eventUrl",
            title: "Odkaz na akci",
            type: "url",
        }),
        defineField({
            name:"reenioUrl",
            title:"Odkaz do Reenia",
            type:"url",
        }),
        defineField({
            name:"eventType",
            title:"Typ akce",
            type:"string",
            options: {
                list: ["Koncerty", "Plesy", "Taneční kurzy", "Výstavy/Prodejní akce", "Stolní tenis"],
                layout:"radio",
            }
        })
    ]
})