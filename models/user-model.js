const {Schema, model} = require("mongoose")

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        max: 50
    },
    password: {
        type: String,
        required: true
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    activationLink: {
        type: String
    },
    //=================================================
    username: {
        type: String,
        default: "",
        max: 50,
    },
    tag: {
        type: String,
        default: "",
    },
    profilePicture: {
        type: String,
        default: "",
    },
    backgroundPicture: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: "",
    },
    city: {
        type: String,
        default: "",
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3],
    },
    biography: {
        type: String,
        default: "",
    },
    birthday: {
        type: Date,
        //default: Date.now,
    },
    joinedDay: {
        type: Date,
        default: Date.now,
    },
    gender: {
        type: String,
        default: "",
    },

    followers: {
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
    links: [{
        title: {type: String},
        url: {type: String},
    }],
    role: {
        type: String,
        default: "user"
    },
}, {timestamps: true})

module.exports = model("User", UserSchema)