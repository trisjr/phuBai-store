const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AirportSchema = new Schema({
    code: {
        type: "string",
        required: true,
        unique: true,
    },
    name: {
        type: "string",
        required: true,
    },
    province: {
        type: "string",
        required: true,
    },
});

module.exports = mongoose.model("Airport", AirportSchema);
