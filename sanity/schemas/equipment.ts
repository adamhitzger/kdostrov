import { defineType, defineField, defineArrayMember } from "sanity";

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
            type: "object",
            fields: [
                {name: "pdf", type:"array", title:"Soubor", of:[{type: "file"}]}
            ]
        }),
    ]
})