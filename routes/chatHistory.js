const express = require("express");
const router = express.Router();
const Chat = require("../models/chat");

// Get all chats
router.get("/", async (req, res) => {
    try {
        const chats = await Chat.find();
        res.json(chats)
    } catch (e) {
        res.status(500).json({errorMessage: e.message})
    }
})

// Get chat from DB
router.get("/:channelId", getChatByChannelId, async (req, res) => {
    res.json(res.chat)
})

// Create a new chat in DB
router.post("/", async (req, res) => {
    const { channelId, chatHistory } = req.body;

    const chat = new Chat({
        channelId,
        chatHistory
    });

    try {
        const newChat = await chat.save()
        res.status(201).json(newChat)
    } catch (e) {
        res.status(400).json({errorMessage: e.message})
    }
})

// Update chat history
router.patch("/:channelId", getChatByChannelId, async (req, res) => {
    if (req.body.channelId != null) {
        res.chat.channelId = req.body.channelId;
    }
    if (req.body.chatHistory != null) {
        res.chat.chatHistory = req.body.chatHistory;
    }
    try {
        const updatedChat = await res.chat.save()
        res.json(updatedChat)
    } catch (e) {
        res.status(400).json({errorMessage: e.message})
    }
})

// Deleting one
router.delete("/:channelId", getChatByChannelId, async (req, res) => {
    try {
        await res.chat.deleteOne()
        res.json({message: 'Deleted Chat'})
    } catch (e) {
        res.status(500).json({errorMessage: e.message})
    }
})

// Middleware for using channelId
async function getChatByChannelId(req, res, next) {
    let chat;
    try {
        chat = await Chat.findOne({ channelId: req.params.channelId });
        if (chat == null) {
            return res.status(404).json({errorMessage: "No Chat Found"})
        }
    } catch (e) {
        return res.status(500).json({errorMessage: e.message})
    }

    res.chat = chat;
    next()
}


module.exports = router;


//TODO: make mongoDB save previous chats and update them accordingly. All example cases already made above (use Atlas. admin:passwordpassword)
