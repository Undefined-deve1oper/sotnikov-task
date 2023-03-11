import extractParams from "../utils/extractParams";
import axiosConfig from "./axiosConfig";

const createArticleService = async (formData = {}) => {
    const headers = { "Content-Type": "multipart/form-data" };
    const { data } = await axiosConfig.post("/articles", formData, { headers });
    return data;
};

const fetchArticlesService = async (formData = {}) => {
    const params = extractParams(formData, "id", "query");
    const { data } = await axiosConfig.get("/articles", { params });
    return data;
};

export { fetchArticlesService, createArticleService };
