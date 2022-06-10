const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SeatSchema = new Schema({
    code: {
        type: "string",
        required: true,
    },
    plane: {
        type: Schema.Types.ObjectId,
        ref: "Plane",
    },
    seatType: {
        type: Schema.Types.ObjectId,
        ref: "SeatType",
    },
});

module.exports = mongoose.model("Seat", SeatSchema);
