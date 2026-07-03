const config = {
    PORT: process.env.PORT || 5000,
    GNEWS_API_KEY: process.env.GNEWS_API_KEY,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    DEFAULT_COUNTRY: process.env.DEFAULT_COUNTRY || "in"
};

export default config;