const mongoose = require('mongoose');

const PartSchema = new mongoose.Schema({
    text: String
});

const ChatHistorySchema = new mongoose.Schema({
    role: String,
    parts: [PartSchema]
});

const ChatSchema = new mongoose.Schema({
    channelId: String,
    chatHistory: [ChatHistorySchema]
});

ChatSchema.index({ channelId: 1 });

module.exports = mongoose.model('Chat', ChatSchema);


/*
* {
    name: {
        type: String,
        required: true,
    },
    subscribedToChannel: {
        type: String,
        required: true,

    },
    subscribeDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
}*/
