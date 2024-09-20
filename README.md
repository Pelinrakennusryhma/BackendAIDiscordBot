# BackendAIDiscordBot

REST Api calls for storing conversations (chats).

## Installing
Clone repository to your computer.

Install all dependencies with `npm install`.

Add `.env` file to root of the repository (same directory with `package.json`).

Add following contents to `.env` file:
```
API_KEY=[Google Cloud Console API key]
MONGODB_URI=[Mongo Database URI]
BOT_TOKEN=[Discord Bot token]
DATA_PORT=[Port for the backend server to run]
```
## Running in command line
Run one of following commands to start:
```
npm run serverStart (To run the server locally)
```

## Links
[Discord AI Chat Bot repository](https://github.com/Pelinrakennusryhma/DiscordAIChatBot)