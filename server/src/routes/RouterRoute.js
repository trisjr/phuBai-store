const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");
const RouterModel = require("../models/RouterModel");

router.get("/", verifyToken, async (req, res) => {
    try {
        const routers = await RouterModel.find()
            .populate("from")
            .populate("to");

        res.json({ success: true, routers });
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
        const router = await RouterModel.findOne(findCondition)
            .populate("from")
            .populate("to");
        if (!router) {
            return res.status(404).json({
                success: false,
                message: "Router not found!",
            });
        } else {
            res.json({ success: true, router });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        });
    }
});

router.post("/", verifyToken, async (req, res) => {
    const { code, from, to } = req.body;

    if (!code || !from || !to) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid information!" });
    } else {
        try {
            const router = await RouterModel.findOne({ code });

            if (router) {
                return res
                    .status(400)
                    .json({ success: false, message: "Code already exists!" });
            } else {
                const newRouter = new RouterModel({ code, from, to });
                newRouter.save();

                res.json({
                    success: true,
                    message: "Router created successfully!",
                    router: newRouter,
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
    const { code, from, to } = req.body;

    if (!code || !from || !to) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid information!" });
    } else {
        try {
            let updateRouter = { code, from, to };
            const updateCondition = {
                _id: req.params.id,
            };

            updateRouter = await RouterModel.findOneAndUpdate(
                updateCondition,
                updateRouter,
                { new: true }
            );

            res.json({
                success: true,
                message: "Router updated successfully!",
                router: updateRouter,
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

        const deleteRouter = await RouterModel.findOneAndDelete(
            deleteCondition
        );
        res.json({
            success: true,
            message: "Router deleted successfully!",
            router: deleteRouter,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        });
    }
});

module.exports = router;
