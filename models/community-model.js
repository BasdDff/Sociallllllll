const {Schema, model} = require("mongoose")

const CommunitySchema = new Schema({
    userId: {
        type: String,
        // required: true,
    },
    title: {
        type: String,
        max: 100,
    },
    imageTitle: {
        type: String,
    },
    description: {
        type: String,
        max: 500,
    },
    posts: [{
        title: {type: String},
        description: {type: String},
    }],
    users: {
        type: Array,
        default: [],
    },
}, {timestamps: true})

module.exports = model("Community", CommunitySchema)