import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const analyzeArticles = async (
    articles,
    topics = [],
    competitors = []
) => {
    if (!articles.length) return [];

    const prompt = `
You are an Economics News Analyst.

Country:
India

Topics:
${topics.join(", ")}

Competitors:
${competitors.join(", ")}

For every article decide

1. keep
2. category
3. importance (1-5)
4. summary
5. relatedCompetitor

Return ONLY JSON.

Articles:

${JSON.stringify(articles)}
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        let text = response.text || response.candidates?.[0]?.content?.parts?.[0]?.text || "";

        text = text.replace(/```json/g, "");
        text = text.replace(/```/g, "");

        return JSON.parse(text);
    } catch (err) {
        console.log(err.message);
        return [];
    }
};

export default analyzeArticles;