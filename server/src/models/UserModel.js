const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "USER",
        enum: ["USER", "ADMIN", "DEV"],
    },
});

module.exports = mongoose.model("User", UserSchema);
