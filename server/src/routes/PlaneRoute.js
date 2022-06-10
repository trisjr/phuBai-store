const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");
const PlaneModel = require("../models/PlaneModel");

router.get("/", verifyToken, async (req, res) => {
    try {
        const planes = await PlaneModel.find().populate("airline");

        res.json({ success: true, planes });
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
        const plane = await PlaneModel.findOne(findCondition).populate(
            "airline"
        );
        if (!plane) {
            return res.status(404).json({
                success: false,
                message: "Plane not found!",
            });
        } else {
            res.json({ success: true, plane });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        });
    }
});

router.post("/", verifyToken, async (req, res) => {
    const { code, airline, status } = req.body;

    if (!code || !airline) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid information!" });
    } else {
        try {
            const plane = await PlaneModel.findOne({ code });

            if (plane) {
                return res
                    .status(400)
                    .json({ success: false, message: "Code already exists!" });
            } else {
                const newPlane = new PlaneModel({ code, airline, status });
                newPlane.save();

                res.json({
                    success: true,
                    message: "Plane created successfully!",
                    plane: newPlane,
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
    const { code, airline, status } = req.body;

    if (!code || !airline) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid information!" });
    } else {
        try {
            let updatePlane = { code, airline, status };
            const updateCondition = {
                _id: req.params.id,
            };

            updatePlane = await PlaneModel.findOneAndUpdate(
                updateCondition,
                updatePlane,
                { new: true }
            );

            res.json({
                success: true,
                message: "Plane updated successfully!",
                plane: updatePlane,
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

        const deletePlane = await PlaneModel.findOneAndDelete(deleteCondition);
        res.json({
            success: true,
            message: "Plane deleted successfully!",
            plane: deletePlane,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        });
    }
});

module.exports = router;
