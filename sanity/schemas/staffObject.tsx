import { defineType, defineField, defineArrayMember } from "sanity";

export const staffObject = defineType({
    name: "staffObject",
    title: "StaffObject",
    type: "object",
    fields: [
        defineField({
            name: "jmeno",
            title: "Celé jméno",
            type: "string",
        }),
        defineField({
            name: "mail",
            title: "E-mail",
            type: "string",
        }),
        defineField({
            name: "telefon",
            title: "Tel. Čísla",
            type: "string",
        }),
        defineField({
            name: "funkce",
            title: "Funkce",
            type: "string",
        }),
    ]
})