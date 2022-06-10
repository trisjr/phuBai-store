const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");
const UserModel = require("../models/UserModel");

router.get("/", verifyToken, async (req, res) => {
    try {
        const users = await UserModel.find();

        res.json({ success: true, users });
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
        const user = await UserModel.findOne(findCondition);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!",
            });
        } else {
            res.json({ success: true, user });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        });
    }
});

router.post("/", verifyToken, async (req, res) => {
    const { email, password, fullName, role } = req.body;

    if (!email || !password || !fullName || !role) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid information!" });
    } else {
        try {
            const user = await UserModel.findOne({ email });

            if (user) {
                return res
                    .status(400)
                    .json({ success: false, message: "Email already exists!" });
            } else {
                const newUser = new UserModel({
                    email,
                    password,
                    fullName,
                    role,
                });
                newUser.save();

                res.json({
                    success: true,
                    message: "User created successfully!",
                    user: newUser,
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
    const { email, password, fullName, role } = req.body;

    if (!email || !password || !fullName || !role) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid information!" });
    } else {
        try {
            let updateUser = { email, password, fullName, role };
            const updateCondition = {
                _id: req.params.id,
            };

            updateUser = await UserModel.findOneAndUpdate(
                updateCondition,
                updateUser,
                { new: true }
            );

            res.json({
                success: true,
                message: "User updated successfully!",
                user: updateUser,
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

        const deleteUser = await UserModel.findOneAndDelete(deleteCondition);
        res.json({
            success: true,
            message: "User deleted successfully!",
            user: deleteUser,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        });
    }
});

module.exports = router;
