
const apiKey = process.env.GEMINI_API_KEY;

async function run() {
  try {
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );

    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(error);
  }
}

run();
