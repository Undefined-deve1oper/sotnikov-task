import {
    createArticleService,
    fetchArticlesService
} from "../../services/articleServices";
import { showModal } from "./modalSlice";
import { logout, update } from "./userSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    allArticles: { articles: [], page: 0, isLoading: false },
    singleArticle: {}
};

const handleGuest = (isGuest, dispatch) => {
    if (isGuest) {
        dispatch(
            showModal({ msg: "Войдите в аккаунт или зарегистрируйтесь!!" })
        );
        return true;
    }
    return false;
};

export const setArticles = createAsyncThunk(
    "article/set",
    async (props, thunkAPI) => {
        const { customFetch } = props;
        const { rejectWithValue, dispatch } = thunkAPI;
        const data = await customFetch(fetchArticlesService);
        if (!data) return rejectWithValue();
        dispatch(articleSlice.actions.setAllArticles(data));
        return;
    }
);

export const addArticle = createAsyncThunk(
    "article/add",
    async (props, thunkAPI) => {
        const { customFetch, formData } = props;
        const { fulfillWithValue, dispatch, rejectWithValue, getState } =
            thunkAPI;
        const {
            user: { isGuest }
        } = getState();
        if (handleGuest(isGuest, dispatch)) return rejectWithValue();
        dispatch(showModal({}));
        const data = await customFetch(createArticleService, formData);
        if (!data) return rejectWithValue();
        dispatch(showModal({ msg: "Article created" }));
        return fulfillWithValue(data.article);
    }
);

const articleSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {
        setAllArticles: (state, action) => {
            state.allArticles = action.payload;
        },
        setUserArticles: (state, action) => {
            state.userArticles = action.payload;
        },
        setSingleArticle: (state, action) => {
            state.singleArticle = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addArticle.fulfilled, (state, action) => {
                state.allArticles.articles.pop();
                state.userArticles.articles.pop();
                state.allArticles.articles.unshift(action.payload);
                state.userArticles.articles.unshift(action.payload);
            })
            .addCase(logout.type, (state, action) => {
                return initialState;
            })
            .addCase(setArticles.pending, (state) => {
                state.allArticles.isLoading = true;
            });
    }
});

export const { setUserArticles, setAllArticles, setSingleArticle } =
    articleSlice.actions;

export default articleSlice.reducer;
