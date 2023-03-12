const express = require("express");
const { createArticle, getArticles } = require("../controllers/article");
const authorize = require("../middleware/authorization");
const router = express.Router();

router.route("/").post(authorize, createArticle).get(getArticles);

module.exports = router;
