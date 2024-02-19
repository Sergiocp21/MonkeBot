const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
    .setName('meme')
    .setDescription('Te doy un meme aleatorio.'),
    async execute(interaction) {

        async function meme() {
            await fetch(`https://www.reddit.com/r/SpanishMeme/random.json`)
            .then (async r => {

                let meme = await r.json();
                let title = meme[0].data.children[0].data.title;
                if(title === "" || title === " ") {
                    title = "Sin título";
                }
                let resource = meme[0].data.children[0].data.url; //Video or image
                let isVideo = meme[0].data.children[0].data.isVideo;

                if(!isVideo){ //its an image
                    const embed = new EmbedBuilder()
                        .setColor("DarkGold")
                        .setTitle(`> ${title}`)
                        .setImage(`${resource}`)
                        .setTimestamp()

                await interaction.reply({content: "Aquí tienes tu meme", embeds: [embed]})
                }

                else{ //Its a video
                    await interaction.reply({content: `Aquí tines tu meme: \n ${resource}`})
                }


            })
        }
        meme();
    }
}

