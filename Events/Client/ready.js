const { loadCommands } = require("../../Handlers/commandHandler");
const { loadAI } = require("../../Functions/AIController");
//This is what the bot is going to do as soon as it connects to Discord
module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        loadCommands(client);
        chat = await loadAI(); //Load the AI model when the bot is ready
        console.log("El cliente se ha iniciado");
    },
    getAIChat: () => chat
};

