const express = require("express");
const router = express.Router();
const Chat = require("../models/chat");

// Getting one
router.get("/:id", getChatByDbId, async (req, res) => {
    res.json(res.chat)
})

// Updating one
router.patch("/:id", getChatByDbId, async (req, res) => {
    if (req.body.name != null) {
        res.chat.name = req.body.name
    }
    if (req.body.subscribedToChannel != null) {
        res.chat.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedChat = await res.chat.save()
        res.json(updatedChat)
    } catch (e) {
        res.status(400).json({errorMessage: e.message})
    }
})

// Deleting one
router.delete("/:id", getChatByDbId, async (req, res) => {
    try {
        await res.chat.deleteOne()
        res.json({message: 'Deleted Chat'})
    } catch (e) {
        res.status(500).json({errorMessage: e.message})
    }
})

// Middleware for using DB ID
async function getChatByDbId(req, res, next) {
    let chat;
    try {
        chat = await Chat.findById(req.params.id)
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
