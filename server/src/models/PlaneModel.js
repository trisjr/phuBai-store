const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlaneSchema = new Schema({
    code: {
        type: "string",
        required: true,
        unique: true,
    },
    airline: {
        type: Schema.Types.ObjectId,
        ref: "Airline",
    },
    status: {
        type: "boolean",
        default: true,
        enum: [true, false],
    },
});

module.exports = mongoose.model("Plane", PlaneSchema);
