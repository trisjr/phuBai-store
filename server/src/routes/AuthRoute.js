require("dotenv").config();
const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const verifyToken = require("../middleware/auth");
const UserModel = require("../models/UserModel");

router.get("/", verifyToken, async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId).select("-password");
        if (!user)
            return res
                .status(400)
                .json({ success: false, message: "User not found!" });
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        });
    }
});

router.post("/register", async (req, res) => {
    const { email, password, fullName, role } = req.body;

    // Simple validation
    if (!email || !password || !fullName) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid information!" });
    }
    try {
        // Check for existing user
        const user = await UserModel.findOne({ email });
        if (user) {
            return res
                .status(400)
                .json({ success: false, message: "Username already exists!" });
        }

        // All Done
        const hashedPassword = await argon2.hash(password);
        const newUser = new UserModel({
            email,
            password: hashedPassword,
            fullName,
            role,
        });
        await newUser.save();

        // Return access token
        const accessToken = jwt.sign(
            { userId: newUser._id },
            process.env.ACCESS_TOKEN_SECRET
        );

        res.json({
            success: true,
            message: "User Create Successfully!",
            accessToken,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Missing email and/or password!",
        });
    }
    try {
        // Check for existing user
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password",
            });
        }

        // Email found
        const passwordValid = await argon2.verify(user.password, password);
        if (!passwordValid) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password!",
            });
        }

        // All Done
        // Return access token
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET
        );

        res.json({
            success: true,
            message: "User logged in successfully!",
            accessToken,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});

module.exports = router;
