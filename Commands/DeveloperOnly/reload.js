const { ChatInputCommandInteraction, SlashCommandBuilder,PermissionFlagsBits, Client } = require("discord.js");

const { loadCommands } = require("../../Handlers/commandHandler");
const { loadEvents } = require("../../Handlers/eventHandler");

/*This commands allow the bot to update or reset commands and events. If the bot is stuck, try with /reload commands or /reload events */
module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reload commands and events")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator) //Only the administrator of the server can run it and if he is a developer
    .addSubcommand((options) => options.setName("events").setDescription("Reload events"))
    .addSubcommand((options) => options.setName("commands").setDescription("Reload commands")),

    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    execute(interaction, client){
        const subCommand = interaction.options.getSubcommand();

        switch (subCommand) {
            case "events":
                for(const [key, value] of client.events){
                    client.removeListener(`${key}`, value, true);
                }
                loadEvents(client);
                interaction.reply({content: "Reloaded events", ephemeral: true});
                break;

            case "commands":
                loadCommands(client);
                interaction.reply({content:"Reloaded commands", ephemeral: true});
                break;
        }
    },
};
