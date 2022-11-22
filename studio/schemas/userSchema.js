export const userSchema = {
    name: "users",
    type: "document",
    title: "Users",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
        },
        {
            name: "walletAddress",
            title: "Wallet Address",
            type: "string",
        },
        {
            name: "profileImage",
            title: "Profile Image",
            type: "string",
        },
        {
            name: "isProfileImageMint",
            title: "Is Profile Image Minted",
            type: "boolean",
        },
        {
            name: "coverImage",
            title: "Cover Image",
            type: "string"
        },
        {
            name: "nuts",
            title: "Nuts",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [{
                        type: "nuts"
                    }],
                },
            ],
        },
    ],
};