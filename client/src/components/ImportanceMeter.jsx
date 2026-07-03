function ImportanceMeter({ importance }) {
    const level = Math.max(1, Math.min(5, Number(importance) || 1));

    return (
        <div className="importance">
            {Array.from({ length: 5 }).map((_, index) => (
                <span
                    key={index}
                    className={
                        index < level
                            ? "importance-fill"
                            : "importance-empty"
                    }
                >
                    ★
                </span>
            ))}
        </div>
    );
}

export default ImportanceMeter;