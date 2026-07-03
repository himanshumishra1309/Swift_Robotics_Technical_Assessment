import axios from "axios";

const fetchNews = async (topics = [], country = "in") => {
    try {
        const query = topics.join(" OR ");

        const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
            query
        )}&country=${country}&lang=en&max=10&apikey=${process.env.GNEWS_API_KEY}`;

        const { data } = await axios.get(url);

        return (data.articles || []).map((article) => ({
            title: article.title,
            description: article.description,
            url: article.url,
            source: article.source?.name || "GNews",
            publishedAt: article.publishedAt,
        }));
    } catch (err) {
        console.log("News Fetch Error:", err.message);
        return [];
    }
};

export default fetchNews;