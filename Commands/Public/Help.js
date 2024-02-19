const{ ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("¿Necesitas ayuda? Este es tu comando!"),

    /**
     * @param {ChatInputCommandInteraction} interaction
     */

    execute(interaction){
        const embed = new EmbedBuilder()
        .setTitle("Lista de comandos disponibles")
        .addFields(
            {name: "**/caraocruz**", value: "Lanza una moneda al aire"},
            {name: "**/ppt @usuario**", value: "Juega piedra papel tijera contra un amigo o contra mi :D (@usuario obligatorio)"},
            {name: "**/hablar**", value: "Habla conmigo sobre lo que quieras"},
            {name: "**/meme**", value: "Genera un meme aleatorio"},
            {name: "**/monkeys**", value: "Genera fotos o videos de monos 🐵"}
        );

        interaction.reply({ embeds:  [embed]});
    },

   /* data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Obtén ayuda a sobre los comandos de este bot"),*/

    /**
     * @param {ChatInputCommandInteraction} interaction
     */

   /* execute(interaction){
        interaction.reply({ content: "Aquí tienes una lista de comandos"})
    },*/
};