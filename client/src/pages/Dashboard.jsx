import { useEffect, useState } from "react";
import api from "../api/client";

import WatchlistManager from "../components/WatchlistManager";
import NewsCard from "../components/NewsCard";

import "../styles/dashboard.css";

function Dashboard() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadArticles = async () => {
        try {
            const res = await api.get("/articles");

            setArticles(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const runPipeline = async () => {
        try {
            setLoading(true);

            await api.post("/pipeline/run");

            await loadArticles();

            alert("Pipeline Completed");
        } catch (err) {
            console.log(err);
            alert("Pipeline Failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadArticles();
    }, []);

    return (
        <div className="dashboard">

            <h1>Economics News Monitoring Agent</h1>

            <button
                className="run-btn"
                onClick={runPipeline}
            >
                {loading ? "Running..." : "Run Pipeline"}
            </button>

            <WatchlistManager />

            <div className="news-list">

                {articles.length === 0 && (
                    <p>No articles found.</p>
                )}

                {articles.map((article) => (
                    <NewsCard
                        key={article._id}
                        article={article}
                    />
                ))}

            </div>

        </div>
    );
}

export default Dashboard;