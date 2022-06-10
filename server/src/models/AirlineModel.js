const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AirlineSchema = new Schema({
    code: {
        type: "string",
        required: true,
        unique: true,
    },
    name: {
        type: "string",
        required: true,
    },
    logo: {
        type: "string",
        required: true,
    },
});

module.exports = mongoose.model("Airline", AirlineSchema);
