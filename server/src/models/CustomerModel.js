const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    cccd: {
        type: "string",
        required: true,
    },
    fullName: {
        type: "string",
        required: true,
    },
    birthday: {
        type: "date",
        required: true,
    },
    phone: {
        type: "string",
        required: true,
    },
});

module.exports = mongoose.model("Customer", CustomerSchema);
