import { defineType, defineField, defineArrayMember } from "sanity";

export const staffType = defineType({
    name: "staff",
    title: "Zaměstnanci",
    type: "document",
    fields: [
        defineField({
            name:"contact",
            title:"Otevírací hodiny",
            type:"array",
            of: [
                {type: "block"}
            ]
        }),
        defineField({
            name:"staffs",
            title:"Zaměstnanci",
            type:"array",
            of: [
                defineArrayMember({
                    name:"staffObject",
                    type: "staffObject"
                })
            ]
        }),
    ]
})