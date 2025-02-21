import { defineType, defineField, defineArrayMember } from "sanity";
import { SupDecorator } from "../lib/components";

export const equipmentType = defineType({
    name: "equipment",
    title: "Technické vybavení",
    type: "document",
    fields: [
        defineField({
            name:"poradi",
            title:"Pořadí",
            type:"number"
        }),
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
                {type: "block",
                marks: {
                    decorators: [
                        { title: 'Strong', value: 'strong' },
                        { title: 'Emphasis', value: 'em' },
                        { title: 'Code', value: 'code' },
                        { title: 'Underline', value: 'underline' },
                        {
                            title: 'm2',
                            value: 'supIndex',
                            icon: () => "m2",
                            component: SupDecorator,
                        }
                    ]
                }
                }
            ],
        }),
        defineField({
            name:"download",
            title:"Dokument ke stažení",
            type: "object",
            fields: [
                {name: "pdf", type:"array", title:"Soubor", of:[{type: "file"}]}
            ]
        }),
        defineField({
            name: "linkNaFotky",
            type: "url",
            title: "Odkaz na fotky např: https://www.kdostrov.cz/fotogalerie/ukazky-akci"
        })
    ]
})