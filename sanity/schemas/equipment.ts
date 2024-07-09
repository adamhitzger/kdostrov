import { defineType, defineField } from "sanity";

export const equipmentType = defineType({
    name: "equipment",
    title: "Technické vybavení",
    type: "document",
    fields: [
        defineField({
            name:"image",
            title:"Fotka",
            type:"image"
        }),
        defineField({
            name:"heading",
            title:"Nadpis",
            type:"string"
        }),
        defineField({
            name:"text",
            title:"Popis",
            type:"array",
            of: [
                {type: "block"}
            ]
        }),
        defineField({
            name:"download",
            title:"Dokument ke stažení",
            type:"file"
        }),
    ]
})