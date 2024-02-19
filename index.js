/*
  The index.js file is the main file for a Discord bot
  It initializes the Client object, sets up the bot's configuration and imports other modules for handling various bot functions and event handlers.
*/
const { Client, GatewayIntentBits, Partials, Collection} = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const  client  = new Client({
    intents:[Guilds, GuildMembers, GuildMessages],
    partials: [User, Message, GuildMember, ThreadMember]
}); //intents (permisos)

const { loadEvents} = require("./Handlers/eventHandler.js");

client.config = require("./config.json");
client.events = new Collection();
client.commands = new Collection();

loadEvents(client);


client.login(client.config.token);