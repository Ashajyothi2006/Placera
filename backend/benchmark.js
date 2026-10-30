const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('./config');
const genAI = new GoogleGenerativeAI(config.gemini.apiKey);

async function benchmark() {
  const models = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-3.5-flash', 'gemini-pro-latest'];
  for (const m of models) {
    const start = Date.now();
    try {
      console.log(`Pinging ${m}...`);
      const model = genAI.getGenerativeModel({ model: m });
      const res = await model.generateContent('Say Hi');
      console.log(`[FAST] ${m} responded in ${Date.now() - start}ms: "${res.response.text().trim()}"`);
    } catch (err) {
      console.log(`[ERR] ${m} (${Date.now() - start}ms): ${err.message}`);
    }
  }
}
benchmark();
