const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");
const FlightModel = require("../models/FlightModel");

router.get("/", verifyToken, async (req, res) => {
    try {
        const flights = await FlightModel.find()
            .populate({
                path: "router",
                populate: [{ path: "from" }, { path: "to" }],
            })
            .populate({ path: "plane", populate: "airline" });

        res.json({ success: true, flights });
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
        const flight = await FlightModel.findOne(findCondition)
            .populate("router")
            .populate("plane");
        if (!flight) {
            return res.status(404).json({
                success: false,
                message: "Flight not found!",
            });
        } else {
            res.json({ success: true, flight });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        });
    }
});

router.post("/", verifyToken, async (req, res) => {
    const { code, router, plane, start, end, price } = req.body;

    if (!code || !router || !plane || !start || !end || !price) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid information!" });
    } else {
        try {
            const flight = await FlightModel.findOne({ code });

            if (flight) {
                return res
                    .status(400)
                    .json({ success: false, message: "Code already exists!" });
            } else {
                const newFlight = new FlightModel({
                    code,
                    router,
                    plane,
                    start,
                    end,
                    price,
                });
                newFlight.save();

                res.json({
                    success: true,
                    message: "Plane created successfully!",
                    flight: newFlight,
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
    const { code, router, plane, start, end, price } = req.body;

    if (!code || !router || !plane || !start || !end || !price) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid information!" });
    } else {
        try {
            let updateFlight = { code, router, plane, start, end, price };
            const updateCondition = {
                _id: req.params.id,
            };

            updateFlight = await FlightModel.findOneAndUpdate(
                updateCondition,
                updateFlight,
                { new: true }
            );

            res.json({
                success: true,
                message: "Flight updated successfully!",
                flight: updateFlight,
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

        const deleteFlight = await FlightModel.findOneAndDelete(
            deleteCondition
        );
        res.json({
            success: true,
            message: "Flight deleted successfully!",
            flight: deleteFlight,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        });
    }
});

module.exports = router;
