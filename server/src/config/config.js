const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@phu-bai-store.5fhbe.mongodb.net/phu-bai-store?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

module.exports = { connectDB };
