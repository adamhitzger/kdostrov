import { defineField, defineType, defineArrayMember } from "sanity";

export const historyType = defineType({
    name: "history",
    type: "document",
    title: "Historie KDO",
    fields: [
        defineField({
            name: "sections",
            title: "Sekce stránky",
            type: "array",
            of: [
                defineArrayMember({
                    name: "textWithImage",
                    type: "textWithImage",
                }),
            ]
        }),
        defineField({
            name: "gallery",
            title: "Gallerie fotek",
            type: "array",
            of: [
                {type: "image"}
            ]
        }),
    ]
})