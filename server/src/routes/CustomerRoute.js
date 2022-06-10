const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");
const CustomerModel = require("../models/CustomerModel");

router.get("/", verifyToken, async (req, res) => {
    try {
        const customers = await CustomerModel.find();

        res.json({ success: true, customers });
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
        const customer = await CustomerModel.findOne(findCondition);
        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found!",
            });
        } else {
            res.json({ success: true, customer });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        });
    }
});

router.post("/", verifyToken, async (req, res) => {
    const { cccd, fullName, birthday, phone } = req.body;

    if (!cccd || !fullName || !birthday || !phone) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid information!" });
    } else {
        try {
            const customer = await CustomerModel.findOne({
                cccd,
            });

            if (customer) {
                return res
                    .status(400)
                    .json({ success: false, message: "Code already exists!" });
            } else {
                const newCustomer = new CustomerModel({
                    cccd,
                    fullName,
                    birthday,
                    phone,
                });
                newCustomer.save();

                res.json({
                    success: true,
                    message: "Customer created successfully!",
                    customer: newCustomer,
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
    const { cccd, fullName, birthday, phone } = req.body;

    if (!cccd || !fullName || !birthday || !phone) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid information!" });
    } else {
        try {
            let updateCustomer = { cccd, fullName, birthday, phone };
            const updateCondition = {
                _id: req.params.id,
            };

            updateCustomer = await CustomerModel.findOneAndUpdate(
                updateCondition,
                updateCustomer,
                { new: true }
            );

            res.json({
                success: true,
                message: "Customer updated successfully!",
                customer: updateCustomer,
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
        const deleteCustomer = await CustomerModel.findOneAndDelete(
            deleteCondition
        );
        res.json({
            success: true,
            message: "Customer deleted successfully!",
            customer: deleteCustomer
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        });
    }
})

module.exports = router;
