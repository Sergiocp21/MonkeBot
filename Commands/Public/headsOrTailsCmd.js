const { ChatInputCommandInteraction, SlashCommandBuilder, MessageButton, ActionRowBuilder, ButtonBuilder, ButtonStyle, Collector } = require("discord.js");
const { getHeadsOrTails } = require("../../Functions/commandFunctions.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("caraocruz")
        .setDescription("Lanza una moneda al aire"),

    /**
     * @param {ChatInputCommandInteraction} interaction
     */

    async execute(interaction) {
        await interaction.reply({ content: getHeadsOrTails()});
    },

};
