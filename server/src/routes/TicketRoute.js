const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");
const TicketModel = require("../models/TicketModel");

router.get("/", verifyToken, async (req, res) => {
    try {
        const tickets = await TicketModel.find()
            .populate("customer")
            .populate("booking")
            .populate("user");

        res.json({ success: true, tickets });
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
        const ticket = await TicketModel.findOne(findCondition)
            .populate("customer")
            .populate("booking")
            .populate("user");
        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: "Ticket not found!",
            });
        } else {
            res.json({ success: true, ticket });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        });
    }
});

router.post("/", verifyToken, async (req, res) => {
    const { code, customer, booking, user } = req.body;

    if (!code || !customer || !booking || !user) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid information!" });
    } else {
        try {
            const ticket = await TicketModel.findOne({ code });

            if (ticket) {
                return res
                    .status(400)
                    .json({ success: false, message: "Code already exists!" });
            } else {
                const newTicket = new TicketModel({
                    code,
                    customer,
                    booking,
                    user,
                });
                newTicket.save();

                res.json({
                    success: true,
                    message: "Ticket created successfully!",
                    ticket: newTicket,
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
    const { code, customer, booking, user } = req.body;

    if (!code || !customer || !booking || !user) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid information!" });
    } else {
        try {
            let updateTicket = { code, customer, booking, user };
            const updateCondition = {
                _id: req.params.id,
            };

            updateTicket = await TicketModel.findOneAndUpdate(
                updateCondition,
                updateTicket,
                { new: true }
            );

            res.json({
                success: true,
                message: "Ticket updated successfully!",
                ticket: updateTicket,
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

        const deleteTicket = await TicketModel.findOneAndDelete(
            deleteCondition
        );
        res.json({
            success: true,
            message: "Ticket deleted successfully!",
            ticket: deleteTicket,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        });
    }
});

module.exports = router;
