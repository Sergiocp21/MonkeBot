const { SlashCommandBuilder } = require('discord.js');

const { ChatGPTClient } = require('discordjs-chatgpt');
const config = require("../../config.json");
const chatgpt = new ChatGPTClient(config.OpenAiToken, { //OpenAi Api key
  contextRemembering: true,
  responseType: 'string', //It can be embed too
  maxLength: 50 //Max tokens used for the response
});

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
    try {
      await chatgpt.chatInteraction(interaction, msg);
    } catch (e) {
        interaction.editReply("Me estoy un comiendo plátano, espera a que me lo termine (inténtalo mas tarde)");
        return;
    }
  }
};