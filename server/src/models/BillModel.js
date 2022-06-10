const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BillSchema = new Schema({
    code: {
        type: "string",
        required: true,
        unique: true,
    },
    ticket: {
        type: Schema.Types.ObjectId,
        ref: "Ticket",
    },
    booking: {
        type: Schema.Types.ObjectId,
        ref: "Booking",
    },
    cost: {
        type: "number",
        required: true,
    },
    time: {
        type: "date",
        default: Date.now(),
    },
});

module.exports = mongoose.model("Bill", BillSchema);
