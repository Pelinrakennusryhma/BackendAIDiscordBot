require('dotenv/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Failed to connect to MongoDB', err));

const chatHistoryRouter = require("./routes/chatHistory");
const databaseRouter = require("./routes/dbRoutes");
const botRouter = require("./routes/bot");

app.use('/chats', chatHistoryRouter)
app.use('/chats', databaseRouter)
app.use('/bots', botRouter)

app.listen(process.env.DATA_PORT, () => console.log(`Server started on port ${process.env.DATA_PORT}`));
