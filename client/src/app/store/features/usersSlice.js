import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import localStorageService from "../../services/localStorageService";
import {
    fetchDeleteUser,
    fetchUsersService
} from "../../services/userServices";
import { getAllChats } from "./messageSlice";
import { logout } from "./userSlice";

const initialState = localStorageService.getAccessToken()
    ? {
          users: [],
          isLoading: true,
          isLoggedIn: true,
          auth: { userId: localStorageService.getUserId() },
          usersOnline: []
      }
    : {
          users: [],
          isLoading: true,
          isLoggedIn: false,
          auth: { userId: null },
          usersOnline: []
      };

export const getUsers = createAsyncThunk(
    "users/getUsers",
    async (props, thunkAPI) => {
        const { customFetch } = props;
        const { fulfillWithValue, rejectWithValue, dispatch, getState } =
            thunkAPI;
        const data = await customFetch(fetchUsersService);
        if (!data) return rejectWithValue();
        const { users } = data;
        if (!getState().user.isGuest)
            dispatch(getAllChats({ customFetch, users }));
        return fulfillWithValue(users);
    }
);

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addOnline: (state, action) => {
            state.usersOnline = action.payload;
            state.isLoading = false;
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        userDeleted(state, action) {
            state.users = state.users.filter(
                (user) => user._id !== action.payload
            );
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(logout.type, (state, action) => {
                return initialState;
            });
    }
});

export const { addOnline, userDeleted, usersRequestFailed } =
    usersSlice.actions;

export const deleteUser = (userId) => async (dispatch) => {
    try {
        await fetchDeleteUser(userId);
        dispatch(userDeleted(userId));
    } catch (error) {
        dispatch(usersRequestFailed(error.message));
    }
};
export const getUsersList = () => (state) => state.users.users;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getCurrentUserData = () => (state) => {
    if (state.users.auth) {
        return state.users.users
            ? state.users.users.find(
                  (user) => user.id === state.users.auth.userId
              )
            : null;
    }
};

export default usersSlice.reducer;
