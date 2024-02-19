const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
    .setName('monkey')
    .setDescription('¿Quieres ver mas monos como yo?.'),
    async execute(interaction) {
        async function monkey() {
            await fetch(`https://www.reddit.com/r/ape/random.json`) //https://www.reddit.com/r/monkeys/random.json
            .then (async r => {

                let responses = ["Ese mono es bastante majo", "Se le bien relajado", "Ojalá estar yo así y no encerrado en una aplicación :(", "A este me lo crucé en el amazonas",
                "Dato curioso sobre los monos: Los monos tenemos pulgares oponibles que nos permiten mover los dedos en dirección contraria y coger cosas tanto con las manos como con los pies",
                "Dato curioso sobre los monos: Registramos el aburrimiento y buscamos realizar juegos en todo momento para entretenernos y conectarnos entre sí, que casualidad que yo sea un bot de entretenimiento ;)",
                "Dato curioso sobre los monos: Nos comunicamos a través de gestos y movimientos visuales, sonidos y olores. Nuestra forma más común de comunicación es la llamada, porque el bosque espeso puede dificultar ver u oler otros monos por la zona"];
                let randomIndex = Math.floor(Math.random() * responses.length);
                let meme = await r.json();
                let title = meme[0].data.children[0].data.title;
                if(title === "" || title === " ") {
                    title = "Sin título";
                }
                let resource = meme[0].data.children[0].data.url;
                let isVideo = meme[0].data.children[0].data.isVideo;

                if(!isVideo){ //its an image
                    const embed = new EmbedBuilder()
                        .setColor("DarkGold")
                        .setTitle(`> ${title}`)
                        .setImage(`${resource}`)
                        .setTimestamp()

                await interaction.reply({content: responses[randomIndex], embeds: [embed]})
                }

                else{ //Its a video
                    await interaction.reply({content: responses[randomIndex] + ` \n ${resource}`})
                }


            })
        }
        monkey();
    }
}

