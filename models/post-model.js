const { Schema, model } = require("mongoose")

const PostSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        max: 500,
    },
    image: {
        type: String,
    },
    likes: {
        type: Array,
        default: []
    },
}, { timestamps: true })

module.exports = model("Post", PostSchema)