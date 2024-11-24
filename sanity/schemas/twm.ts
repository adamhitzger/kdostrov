import {defineField, defineType} from 'sanity'

export const textWithImage = defineType({
    name: "textWithImage",
    title: "Modifikovatelná sekce s obrázkem a textem",
    type: "object",
    fields: [
        defineField({
            name: "heading",
            title: "Nadpis sekce",
            type: "string",
        }),
        defineField({
            name: "text",
            title: "Text",
            type: "array",
            of: [
                {type: "block"}
            ]
        }),
        defineField({
            name: "image",
            title: "Fotka",
            type: "image",
        }),
        defineField({
            name: "caption",
            title: "Popisek obrázku",
            type: "string",
        }),
        defineField({
            name: "position",
            title: "Rozložení sekce",
            type: "string",
            options: {
                list: ["Text vlevo", "Obrázek vlevo"],
                layout: "dropdown",
            }
        }),
        
    ]
});