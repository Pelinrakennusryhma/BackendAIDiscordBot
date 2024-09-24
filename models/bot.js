const mongoose = require('mongoose');

const BotSchema = new mongoose.Schema({
    botPersonality: String
});

module.exports = mongoose.model('Bot', BotSchema);
