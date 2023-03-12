const { BadRequestError, NotFoundError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const Article = require("../models/Article");
const User = require("../models/User");
const uploadImage = require("../utils/uploadImage");

const createArticle = async (req, res) => {
    const { title, previewText, fullText } = req.body;
    const { id } = req.user;
    let image = req.files?.image || "";
    if (!title && !image)
        throw new BadRequestError("Expected a caption or image");
    if (image) {
        const { secure_url: src, public_id } = await uploadImage(image);
        image = { src, publicID: public_id };
    }
    const user = await User.findById(id);
    const article = await Article.create({
        title,
        image,
        previewText,
        fullText,
        author: user.id
    });
    res.status(StatusCodes.CREATED).json({ article });
};

const getArticles = async (req, res) => {
    const { id, query = "", page = "1", userId = "" } = req.query;

    if (id) {
        const article = await Article.findById(id);
        if (!article) throw new NotFoundError(`No article with id${id}`);
        res.status(StatusCodes.OK).json({ article });
    } else {
        const limitCount = query ? Infinity : 10;
        const skipCount = (+page - 1) * limitCount;
        const _query = {};
        if (query) _query.caption = new RegExp(query, "i");
        if (userId) _query.createdBy = userId;
        const articles = await Article.find(_query)
            .sort("-createdAt")
            .limit(limitCount)
            .skip(skipCount);
        res.status(StatusCodes.OK).json({ articles, page: +page });
    }
};

module.exports = { getArticles, createArticle };
