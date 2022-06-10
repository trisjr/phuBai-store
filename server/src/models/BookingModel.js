const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    flight: {
        type: Schema.Types.ObjectId,
        ref: "Flight",
    },
    seat: {
        type: Schema.Types.ObjectId,
        ref: "Seat",
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
    },
    status: {
        type: "string",
        enum: ["FAILED", "FENDING", "COMPLETED"],
        default: "FENDING",
    },
});

module.exports = mongoose.model("Booking", BookingSchema);
