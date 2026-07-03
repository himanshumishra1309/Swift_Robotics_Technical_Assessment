import ImportanceMeter from "./ImportanceMeter";

function NewsCard({ article }) {
    return (
        <div className="news-card">

            <h2>{article.title}</h2>

            <ImportanceMeter importance={article.importance} />

            <p className="category">
                <strong>Category:</strong> {article.category}
            </p>

            <p className="summary">
                {article.summary}
            </p>

            <div className="news-footer">

                <span>{article.source}</span>

                <span>
                    {new Date(article.publishedAt).toLocaleDateString()}
                </span>

            </div>

            {article.relatedCompetitor && (
                <div className="competitor">
                    Competitor : {article.relatedCompetitor}
                </div>
            )}

            <a
                href={article.url}
                target="_blank"
                rel="noreferrer"
            >
                Read Full Article
            </a>

        </div>
    );
}

export default NewsCard;