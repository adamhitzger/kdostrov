import { defineType, defineField } from "sanity";

export const staffType = defineType({
    name: "staff",
    title: "Zaměstnanci",
    type: "document",
    fields: [
        defineField({
            name:"name",
            title:"Celé jméno včetně titulu",
            type:"string",
        }),
        defineField({
            name:"email",
            title:"Email",
            type:"string",
        }),
        defineField({
            name:"phone",
            title:"Telefonní číslo",
            type:"string"
        }),
        defineField({
            name:"position",
            title:"Funkce",
            type:"string"
        }),
    ]
})