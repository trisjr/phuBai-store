const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");
const SeatTypeModel = require("../models/SeatTypeModel");

router.get("/", verifyToken, async (req, res) => {
    try {
        const seatTypes = await SeatTypeModel.find();

        res.json({ success: true, seatTypes });
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
        const seatType = await SeatTypeModel.findOne(findCondition);
        if (!seatType) {
            return res.status(404).json({
                success: false,
                message: "Seat not found!",
            });
        } else {
            res.json({ success: true, seatType });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        });
    }
});

router.post("/", verifyToken, async (req, res) => {
    const { code, name, key, price } = req.body;

    if (!code || !name || !key || !price) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid information!" });
    } else {
        try {
            const seatType = await SeatTypeModel.findOne({ code });

            if (seatType) {
                return res
                    .status(400)
                    .json({ success: false, message: "Code already exists!" });
            } else {
                const newSeatType = new SeatTypeModel({
                    code,
                    name,
                    key,
                    price,
                });
                newSeatType.save();

                res.json({
                    success: true,
                    message: "Plane created successfully!",
                    seatType: newSeatType,
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal Server Error!",
            });
        }
    }
});

router.put("/:id", verifyToken, async (req, res) => {
    const { code, name, key, price } = req.body;

    if (!code || !name || !key || !price) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid information!" });
    } else {
        try {
            let updateSeatType = { code, name, key, price };
            const updateCondition = {
                _id: req.params.id,
            };

            updateSeatType = await SeatTypeModel.findOneAndUpdate(
                updateCondition,
                updateSeatType,
                { new: true }
            );

            res.json({
                success: true,
                message: "SeatType updated successfully!",
                seatType: updateSeatType,
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

        const deleteSeatType = await SeatTypeModel.findOneAndDelete(
            deleteCondition
        );
        res.json({
            success: true,
            message: "Seat deleted successfully!",
            seat: deleteSeatType,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        });
    }
});

module.exports = router;
