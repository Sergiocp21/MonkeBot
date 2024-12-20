const { SlashCommandBuilder } = require('discord.js');

const aiController = require("../../Functions/AIController");
module.exports = {
  data: new SlashCommandBuilder()
    .setName('hablar')
    .setDescription('Habla conmigo sobre lo que quieras')
    .addStringOption(option =>
      option
        .setName('mensaje')
        .setDescription('¿Qué me quieres decir?')),
  async execute(interaction) {

    const msg = interaction.options.getString('mensaje');  //Get user message

    if (!msg) {
      await interaction.reply({ content: 'Tienes que escribir un mensaje!', ephemeral: true });
      return;
    }
    else {
      await aiController.generateReply(interaction, msg); //Send the message to the AI 
    }

  }
};