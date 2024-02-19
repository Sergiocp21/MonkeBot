const { loadCommands }  = require("../../Handlers/commandHandler");

//This is what the bot is going to do as soon as it connects to Discord
module.exports = {
    name: "ready",
    once: true,
    execute(client){
        loadCommands(client);
        console.log("El cliente se ha iniciado");
    },
};

