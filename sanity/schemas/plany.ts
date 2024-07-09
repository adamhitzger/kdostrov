import { defineField, defineType } from "sanity";

export const planyType = defineType({
    name: "plans",
    type: "document",
    title: "Zasedací a koncertní Plány",
    fields: [
        defineField({
            name: "eventPlans",
            title: "Koncertní plány",
            type: "array",
            of: [
                {type: "image"}
            ]
        }),
        defineField({
            name: "seatPlans",
            title: "Zasedací plány",
            type: "array",
            of: [
                {type: "image"}
            ]
        })
    ]
})