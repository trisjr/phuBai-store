const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");
const SeatModel = require("../models/SeatModel");

router.get("/", verifyToken, async (req, res) => {
    try {
        const seats = await SeatModel.find()
            .populate("seatType")
            .populate("plane");

        res.json({ success: true, seats });
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
        const seat = await SeatModel.findOne(findCondition)
            .populate("plane")
            .populate("seatType");
        if (!seat) {
            return res.status(404).json({
                success: false,
                message: "Seat not found!",
            });
        } else {
            res.json({ success: true, seat });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        });
    }
});

router.post("/", verifyToken, async (req, res) => {
    const { code, plane, seatType } = req.body;

    if (!code || !plane || !seatType) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid information!" });
    } else {
        try {
            const newSeat = new SeatModel({ code, plane, seatType });
            newSeat.save();

            res.json({
                success: true,
                message: "Seat created successfully!",
                seat: newSeat,
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
    const { code, plane, seatType } = req.body;

    if (!code || !plane || !seatType) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid information!" });
    } else {
        try {
            let updateSeat = { code, plane, seatType };
            const updateCondition = {
                _id: req.params.id,
            };

            updateSeat = await SeatModel.findOneAndUpdate(
                updateCondition,
                updateSeat,
                { new: true }
            );

            res.json({
                success: true,
                message: "Seat updated successfully!",
                seat: updateSeat,
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

        const deleteSeat = await SeatModel.findOneAndDelete(deleteCondition);
        res.json({
            success: true,
            message: "Seat deleted successfully!",
            seat: deleteSeat,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        });
    }
});

module.exports = router;
