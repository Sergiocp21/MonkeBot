const config = require("../config.json");
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function loadAI() {
  const genAI = new GoogleGenerativeAI(config.GeminiAPI);

  const generationConfig = {
    stopSequences: ["red"],
    maxOutputTokens: 1000,
    temperature: 10,
    topP: 0.1,
    topK: 16,
  };

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Actúa como un mono narigudo" }],
      },
      {
        role: "model",
        parts: [{ text: "Perfecto, ahora soy un mono narigudo uh uh ah ah" }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  return chat;
}

async function generateReply(interaction, message) {
  const result = await chat.sendMessage(message);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  await interaction.reply("Mensaje: " + message + "\nRespuesta: " + text);

}
module.exports = { loadAI, generateReply };
