const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SeatTypeSchema = new Schema({
    code: {
        type: "string",
        required: true,
        unique: true,
    },
    name: {
        type: "string",
        required: true,
    },
    key: {
        type: "string",
        required: true,
    },
    price: {
        type: "number",
        required: true,
    },
});

module.exports = mongoose.model("SeatType", SeatTypeSchema);
