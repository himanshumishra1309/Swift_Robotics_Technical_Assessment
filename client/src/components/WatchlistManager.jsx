import { useEffect, useState } from "react";
import api from "../api/client";

function WatchlistManager() {

    const [watchlist, setWatchlist] = useState(null);

    const [topic, setTopic] = useState("");

    const loadWatchlist = async () => {
        try {
            const res = await api.get("/watchlist");
            setWatchlist(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        loadWatchlist();
    }, []);

    const addTopic = async () => {

        if (!topic.trim()) return;

        try {

            await api.post("/watchlist/topic", {
                value: topic
            });

            setTopic("");

            loadWatchlist();

        } catch (err) {
            console.log(err);
        }
    };

    const deleteTopic = async (value) => {

        try {

            await api.delete(`/watchlist/topic/${value}`);

            loadWatchlist();

        } catch (err) {
            console.log(err);
        }
    };

    if (!watchlist) return <p>Loading Watchlist...</p>;

    return (
        <div className="watchlist">

            <h2>Topics</h2>

            <div className="topic-input">

                <input
                    value={topic}
                    placeholder="Add Topic"
                    onChange={(e) => setTopic(e.target.value)}
                />

                <button onClick={addTopic}>
                    Add
                </button>

            </div>

            <div className="topics">

                {watchlist.topics.map((item) => (

                    <div
                        key={item}
                        className="topic-chip"
                    >

                        <span>{item}</span>

                        <button
                            onClick={() => deleteTopic(item)}
                        >
                            ✕
                        </button>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default WatchlistManager;