const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");
const BookingModel = require("../models/BookingModel");

router.get("/", verifyToken, async (req, res) => {
    try {
        const bookings = await BookingModel.find()
            .populate("flight")
            .populate("seat")
            .populate("user")
            .populate("customer");

        res.json({ success: true, bookings });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        });
    }
});

router.get("/:id", verifyToken, async (req, res) => {
    try {
        const findCondition = {
            _id: req.params.id,
        };
        const booking = await BookingModel.findOne(findCondition)
            .populate("flight")
            .populate("seat")
            .populate("user")
            .populate("customer");
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found!",
            });
        } else {
            res.json({ success: true, booking });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        });
    }
});

router.post("/", verifyToken, async (req, res) => {
    const { flight, seat, user, customer, status } = req.body;

    if (!flight || !seat || !user || !customer) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid information!" });
    } else {
        try {
            const newBooking = new BookingModel({ flight, seat, user, customer, status });
            newBooking.save();

            res.json({
                success: true,
                message: "Booking created successfully!",
                booking: newBooking,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal Server Error!",
            });
        }
    }
});

router.put("/:id", verifyToken, async (req, res) => {
    const { flight, seat, user, customer, status } = req.body;

    if (!flight || !seat || !user || !customer || !status) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid information!" });
    } else {
        try {
            let updateBooking = { flight, seat, user, customer, status };
            const updateCondition = {
                _id: req.params.id,
            };

            updateBooking = await BookingModel.findOneAndUpdate(
                updateCondition,
                updateBooking,
                { new: true }
            );

            res.json({
                success: true,
                message: "Booking updated successfully!",
                booking: updateBooking,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal Server Error!",
            });
        }
    }
});

router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const deleteCondition = {
            _id: req.params.id,
        };

        const deleteBooking = await BookingModel.findOneAndDelete(
            deleteCondition
        );
        res.json({
            success: true,
            message: "Booking deleted successfully!",
            booking: deleteBooking,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        });
    }
});

module.exports = router;
