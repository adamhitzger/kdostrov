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
            name: "eventLinks",
            title: "Odkazy na koncertní zas. plány",
            type: "array",
            of: [
                {type: "block"}
            ]
        }),
        defineField({
            name: "seatPlans",
            title: "Plesové zasedací plány",
            type: "array",
            of: [
                {type: "image"}
            ]
        }),
        defineField({
            name: "plesLinks",
            title: "Odkazy na plesové zas. plány",
            type: "array",
            of: [
                {type: "block"}
            ]
        }),
    ]
})