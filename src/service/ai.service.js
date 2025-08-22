const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

// Pass base64ImageFile as parameter
async function generateCaption(base64ImageFile) {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];

  // Use the AI model to generate a caption
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config:{
     systemInstruction: `
     you are expert in generating captions for images.
     you generated single caption  for the image.
      your caption should be sort and cocise.
      you use hashtag and emojis in the caption.
     `

    },

  });
  return response.text;
}

module.exports = {
  generateCaption,
};