require("dotenv").config();
const express = require("express");
const cors = require("cors");

const db = require("./config/config");
const AuthRoute = require("./routes/AuthRoute");
const AirlineRoute = require("./routes/AirlineRoute");
const AirportRoute = require("./routes/AirportRoute");
const BillRoute = require("./routes/BillRoute");
const BookingRoute = require("./routes/BookingRoute");
const CustomerRoute = require("./routes/CustomerRoute");
const FlightRoute = require("./routes/FlightRoute");
const PlaneRoute = require("./routes/PlaneRoute");
const RouterRoute = require("./routes/RouterRoute");
const SeatRoute = require("./routes/SeatRoute");
const SeatTypeRoute = require("./routes/SeatTypeRoute");
const TicketRoute = require("./routes/TicketRoute");
const UserRoute = require("./routes/UserRoute");

db.connectDB().then(function () {
    console.log("Database connected");
});

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", AuthRoute);
app.use("/api/airline", AirlineRoute);
app.use("/api/airport", AirportRoute);
app.use("/api/bill", BillRoute);
app.use("/api/booking", BookingRoute);
app.use("/api/customer", CustomerRoute);
app.use("/api/flight", FlightRoute);
app.use("/api/plane", PlaneRoute);
app.use("/api/router", RouterRoute);
app.use("/api/seat", SeatRoute);
app.use("/api/seatType", SeatTypeRoute);
app.use("/api/ticket", TicketRoute);
app.use("/api/user", UserRoute);

app.listen(PORT, () =>
    console.log(`Server started at http://localhost:${PORT}`)
);
