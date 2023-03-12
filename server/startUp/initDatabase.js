const Article = require("../models/Article");

const articleMockData = require("../mock/articles.json");

module.exports = async () => {
    const article = await Article.find();
    await createInitialEntity(Article, articleMockData);
    console.log("added article in mongoDB");
};

async function createInitialEntity(Model, data) {
    await Model.collection.drop();

    return Promise.all(
        data.map(async (item) => {
            try {
                delete item._id;
                const newItem = new Model(item);
                await newItem.save();
                return newItem;
            } catch (error) {
                return error;
            }
        })
    );
}
