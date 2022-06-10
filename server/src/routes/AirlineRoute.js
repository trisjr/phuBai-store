const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");
const AirlineModel = require("../models/AirlineModel");

router.get("/", verifyToken, async (req, res) => {
  try {
    const airlines = await AirlineModel.find();
    res.json({ success: true, airlines });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const airline = await AirlineModel.findOne({ _id: req.params.id });
    if (!airline) {
      return res
        .status(404)
        .json({ success: false, message: "Airline not found!" });
    } else {
      res.json({ success: true, airline });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
});

router.post("/", verifyToken, async (req, res) => {
  const { code, name, logo } = req.body;

  if (!code || !name || !logo) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid information!" });
  } else {
    try {
      const airline = await AirlineModel.findOne({
        code,
      });
      if (airline) {
        return res
          .status(400)
          .json({ success: false, message: "Code already exists!" });
      } else {
        const newAirline = new AirlineModel({
          code,
          name,
          logo,
        });
        await newAirline.save();
        res.json({
          success: true,
          message: "Airline created successfully!",
          airline: newAirline,
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
  const { code, name, logo } = req.body;
  if (!code || !name || !logo) {
    return res.status(400).json({
      success: false,
      message: "Invalid information!",
    });
  } else {
    try {
      let updateAirline = {
        code,
        name,
        logo,
      };
      const updateCondition = {
        _id: req.params.id,
      };
      updateAirline = await AirlineModel.findOneAndUpdate(
        updateCondition,
        updateAirline,
        { new: true }
      );
      res.json({
        success: true,
        message: "Airline updated successfully!",
        airline: updateAirline,
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
    const deleteAirline = await AirlineModel.findOneAndDelete(deleteCondition);

    res.json({
      success: true,
      message: "Airline deleted successfully!",
      airline: deleteAirline,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
});

module.exports = router;
