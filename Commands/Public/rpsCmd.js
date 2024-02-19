const { ButtonStyle, SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, userMention } = require('discord.js');
const { getRpsWinner, rpsWinner } = require("../../Functions/commandFunctions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ppt')
    .setDescription('Juega piedra papel tijera contra un amigo o contra mi :D')
    .addUserOption(option =>
      option.setName('opponent')
        .setDescription('Menciona aquí a tu rival (por ejemplo @MonkeBot)')
        .setRequired(true)),

  async execute(interaction) {

    const opponent = interaction.options.getUser('opponent');

    const rockButton = new ButtonBuilder()
      .setCustomId("rock")
      .setLabel("Rock ✊")
      .setStyle(ButtonStyle.Secondary);
    const paperButton = new ButtonBuilder()
      .setCustomId("paper")
      .setLabel("Paper ✋")
      .setStyle(ButtonStyle.Secondary);
    const scissorsButton = new ButtonBuilder()
      .setCustomId("scissors")
      .setLabel("Scissor ✌️")
      .setStyle(ButtonStyle.Secondary);

    // Create row of buttons
    const buttonRow = new ActionRowBuilder().addComponents(
      rockButton,
      paperButton,
      scissorsButton
    );

    //If the given user is the bot
    if(opponent.id === interaction.user.id){
      await interaction.reply({content:'No estarás intentando jugar al piedra papel tijera contra ti mismo verdad?', ephemeral: true});
    }
    else if (opponent.id === interaction.client.user.id) { // left part: id of the given user, right part: bot's id

      answered = false;
      response = await interaction.reply({ content: "Muy bien, te aviso que soy muy bueno jugando a piedra papel tijera", components: [buttonRow] });

      const collector = interaction.channel.createMessageComponentCollector({time: 60000});

      collector.on('collect', async (i) => {
        if (i.customId === "rock" || i.customId === "paper" || i.customId === "scissors") {
          answered = true;
          i.update({content: "Muy bien, te aviso que soy muy bueno jugando a piedra papel tijera", components:[]});
          await i.channel.send({ content: getRpsWinner(i.customId), components: [] });
        }
      });

      collector.on('end', async(i) =>{ //If the user has not selected anything
        if(!answered){
          await interaction.editReply({ content: "¿No ibas a jugar conmigo? Has tardado demasiado, me voy a por un plátano", components: [] });
        }
      })
    }
    else { //The given user is not the bot

      let userAnswered = false;
      let opponentAnswered = false;

      let userElection = "";
      let opponentElection = "";

      const notYourButton = "Mira, entre tu y yo, sabemos que no está bien tocar las cosas que no son tuyas, por favor, que no vuelva a ocurrir";



      // Send message to players
      start = await interaction.reply({
        content: `Procedamos con la batalla de piedra papel tijera: ${userMention(interaction.user.id)} y ${opponent}`,
      });

      // Send message to user and opponent on the same channel
      const userMessage = await interaction.channel.send({
        content: `${userMention(interaction.user.id)}, selecciona tu jugada:`,
        ephemeral: true,
        components: [buttonRow]
      })

      const opponentMessage = await interaction.channel.send({
        content: `${opponent}, selecciona tu jugada:`,
        ephemeral: true,
        components: [buttonRow]
      });


      // Reply collectors for user and opponent
      const collector = interaction.channel.createMessageComponentCollector({ time: 20000 }); //Collector of both messages (ends at 20 sec)

      collector.on('collect', async(i) =>{
        if (i.user.id === interaction.user.id) {  // If user press a button

          if (i.message.id === userMessage.id) { //User press correct button
            userAnswered = true;
            await i.deferUpdate();
            userElection = i.customId;
            await i.editReply({ content: `**${interaction.user.username}**  ha contestado`, components: [] });

          } else if (i.message.id === opponentMessage.id) { // User clicked on opponent's buttons
            await i.deferUpdate();
            await i.user.send({ content: notYourButton});
          }
        }
        //if opponent press a button
        else if(i.user.id === opponent.id) {

          if(i.message.id === opponentMessage.id){ //Opponent press correct button
            opponentAnswered = true;
            await i.deferUpdate();
            opponentElection = i.customId;
            await i.editReply({content: `**${opponent.username}** ha contestado`, components: []});
          }else if(i.message.id === userMessage.id){
            // Opponent clicked on rival's button
            await i.deferUpdate();
            await i.user.send({ content: notYourButton });
          }
        }
        else{
          await i.deferUpdate();
          await i.user.send({ content: notYourButton });
        }
      });

      if(userAnswered && opponentAnswered){
        collector.stop();
      }

      collector.on('end', () => {
        if (!userAnswered && !opponentAnswered) { //No one has answered
          start.edit({ content: `**${interaction.user.username}** ha querido jugar al piedra papel tijera pero no ha contestado nadie`});
          userMessage.delete();
          opponentMessage.delete();
        }
        else if(userAnswered && !opponentAnswered){ //Only the user has answered
          start.edit({ content: `${opponent} ha tenido miedo de ${userMention(interaction.user.id)}`});
          userMessage.delete();
          opponentMessage.delete();
          interaction.channel.send('El juego ha expirado. No se ha recibido la elección de un jugador.');
        }
        else if(!userAnswered && opponentAnswered){ //Only the opponent has answered
          start.edit({ content: `${userMention(interaction.user.id)} ha tenido miedo de  ${opponent}`});
          userMessage.delete();
          opponentMessage.delete();
          interaction.channel.send('El juego ha expirado. No se ha recibido la elección de un jugador.');
        }
        else{
          interaction.channel.send(getRpsWinnerPvP(interaction.user, opponent, userElection, opponentElection));
        }
      });
    }

  },
};

function getRpsWinnerPvP(user, opponent, userElection, opponentElection) { //Function that returns the message with the winner and the options of the players
  result = rpsWinner(userElection, opponentElection);
  if (result === 1) { //User wins
    return `**${user.username}**, ha tirado ${userElection} y es el ganador del piedra papel tijera vs **${opponent.username}** que ha tirado ${opponentElection}`;
  }
  else if (result === 0) { //Draw
    return `Empate ambos jugadores han sacado ${userElection}`
  }
  else { //Opponent wins
    return `**${opponent.username}**, ha tirado ${opponentElection} y es el ganador del piedra papel tijera vs **${user.username}** que ha tirado ${userElection}`;
  }
}


