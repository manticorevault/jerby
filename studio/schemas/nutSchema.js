export const nutSchema = {
    name: "nuts",
    type: "document",
    title: "Nuts",
    fields:[
        {
            name: "nut",
            title: "Nut",
            type: "string",
        },
        {
            name: "timestamp",
            title: "Timestamp",
            type: "datetime",
        },
        {
            name: "author",
            title: "Author",
            type: "reference",
            to: [{ type: "users" }],
        },
    ],
};