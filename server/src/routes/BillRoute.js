const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");
const BillModel = require("../models/BillModel");

router.get("/", verifyToken, async (req, res) => {
    try {
        const bills = await BillModel.find()
            .populate("ticket")
            .populate("booking");

        res.json({ success: true, bills });
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

        const bill = await BillModel.findOne(findCondition)
            .populate("ticket")
            .populate("booking");
        if (!bill) {
            return res.status(404).json({
                success: false,
                message: "Bill not found!",
            });
        } else {
            res.json({ success: true, bill });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        });
    }
});

router.post("/", verifyToken, async (req, res) => {
    const { code, ticket, booking, cost } = req.body;

    if (!code || !ticket || !booking || !cost) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid information!" });
    } else {
        try {
            const bill = await BillModel.findOne({ code });
            if (bill) {
                res.status(400).json({
                    success: false,
                    message: "Code already exists!",
                });
            } else {
                const newBill = new BillModel({ code, ticket, booking, cost });
                newBill.save();

                res.json({
                    success: true,
                    message: "Bill created successfully!",
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
    const { code, ticket, booking, cost } = req.body;

    if (!code || !ticket || !booking || !cost) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid information!" });
    } else {
        try {
            let updateBill = { code, ticket, booking, cost };
            const updateCondition = {
                _id: req.params.id,
            };

            updateBill = await BillModel.findOneAndUpdate(
                updateCondition,
                updateBill,
                { new: true }
            );

            res.json({
                success: true,
                message: "Bill updated successfully!",
                bill: updateBill,
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

        const deleteBill = await BillModel.findOneAndDelete(deleteCondition);

        res.json({
            success: true,
            message: "Bill deleted successfully!",
            bill: deleteBill,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        });
    }
});

module.exports = router;
