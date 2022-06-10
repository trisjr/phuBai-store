const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");
const AirportModel = require("../models/AirportModel");

router.get("/", verifyToken, async (req, res) => {
    try {
        const airports = await AirportModel.find();
        res.json({ success: true, airports });
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
        const airport = await AirportModel.findOne(findCondition);
        if (!airport) {
            return res.status(404).json({
                success: false,
                message: "Airport not found!",
            });
        } else {
            res.json({ success: true, airport });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        });
    }
});

router.post("/", verifyToken, async (req, res) => {
    const { code, name, province } = req.body;

    if (!code || !name || !province) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid information!" });
    } else {
        try {
            const airport = await AirportModel.findOne({
                code,
            });
            if (airport) {
                return res
                    .status(400)
                    .json({ success: false, message: "Code already exists!" });
            }

            const newAirport = new AirportModel({
                code,
                name,
                province,
            });

            await newAirport.save();
            res.json({
                success: true,
                message: "Airport created successfully!",
                airport: newAirport,
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
    const { code, name, province } = req.body;

    if (!code || !name || !province) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid information!" });
    } else {
        try {
            let updateAirport = {
                code,
                name,
                province,
            };

            const updateCondition = {
                _id: req.params.id,
            };

            updateAirport = await AirportModel.findOneAndUpdate(
                updateCondition,
                updateAirport,
                { new: true }
            );

            res.json({
                success: true,
                message: "Airport updated successfully!",
                airport: updateAirport,
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
        const deleteAirport = await AirportModel.findOneAndDelete(
            deleteCondition
        );

        res.json({
            success: true,
            message: "Airport deleted successfully!",
            airport: deleteAirport,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        });
    }
});

module.exports = router;
