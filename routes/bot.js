const express = require("express");
const Bot = require("../models/bot");
const Chat = require("../models/chat");
const router = express.Router();



router.get("/", async (req, res) => {
    try {
        const chats = await Bot.find();
        res.json(chats)
    } catch (e) {
        res.status(500).json({errorMessage: e.message})
    }
})

// CREATE A NEW CHAT IN DB
router.post("/", async (req, res) => {
    const { botPersonality } = req.body;

    const bot = new Bot({
        botPersonality
    });

    try {
        const newBot = await bot.save();
        res.status(201).json(newBot);
    } catch (e) {
        res.status(400).json({ errorMessage: e.message });
    }
});

module.exports = router;
