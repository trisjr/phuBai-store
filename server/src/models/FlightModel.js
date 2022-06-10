const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FlightSchema = new Schema({
    code: {
        type: "string",
        required: true,
        unique: true,
    },
    router: {
        type: Schema.Types.ObjectId,
        ref: "Router",
    },
    plane: {
        type: Schema.Types.ObjectId,
        ref: "Plane",
    },
    start: {
        type: "date",
        required: true,
    },
    end: {
        type: "date",
        required: true,
    },
    price: {
        type: "number",
        required: true,
    },
});

module.exports = mongoose.model("Flight", FlightSchema);
