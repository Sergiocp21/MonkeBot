const{ ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Command for testing"),
    developer: true, //Restricts the use only for developers

    /**
     * @param {ChatInputCommandInteraction} interaction
     */

    execute(interaction){
        interaction.reply({ content: "You are developer", ephemeral: true }); //ephemeral is for making the message only readable by the user who wrote the command (if ephemeral is true)
    },
};