const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('./config');
const genAI = new GoogleGenerativeAI(config.gemini.apiKey);

async function test() {
  const modelsToTry = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-3.5-flash', 'gemini-pro-latest'];
  for (const m of modelsToTry) {
    try {
      console.log('Testing model:', m);
      const model = genAI.getGenerativeModel({ model: m });
      const res = await model.generateContent('Say: Hello candidate!');
      console.log('SUCCESS for', m, '->', res.response.text().trim());
      break;
    } catch (err) {
      console.error('FAIL for', m, '->', err.message);
    }
  }
}
test();
