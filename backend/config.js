require('dotenv').config();

// Centralized configuration file
// This ensures we only load environment variables in one place
module.exports = {
    port: process.env.PORT || 5000,
    gemini: {
        apiKey: process.env.GEMINI_API_KEY,
    }
};
