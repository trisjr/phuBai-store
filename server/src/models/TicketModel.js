const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    code: {
        type: "string",
        required: true,
        unique: true,
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
    },
    booking: {
        type: Schema.Types.ObjectId,
        ref: "Booking",
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = mongoose.model("Ticket", TicketSchema);
