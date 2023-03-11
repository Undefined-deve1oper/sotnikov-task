const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
    {
        title: String,
        previewText: String,
        fullText: String,
        image: String,
        author: { type: String }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Article", ArticleSchema);
