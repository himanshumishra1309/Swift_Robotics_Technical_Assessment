import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
    {
        title: String,

        description: String,

        summary: String,

        url: {
            type: String,
            unique: true
        },

        source: String,

        category: String,

        importance: Number,

        relatedCompetitor: String,

        publishedAt: Date
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Article", articleSchema);