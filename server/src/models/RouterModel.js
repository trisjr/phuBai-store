const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RouteSchema = new Schema({
    code: {
        type: "string",
        required: true,
        unique: true,
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: "Airport",
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: "Airport",
    },
});

module.exports = mongoose.model("Router", RouteSchema);
