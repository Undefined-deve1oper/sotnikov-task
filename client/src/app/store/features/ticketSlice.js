import { createSlice, Dispatch } from "@reduxjs/toolkit";
import ticketService from "../../services/ticketService";

const initialState = {
    entities: [],
    isLoading: true,
    error: null
};

const ticketsSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {
        ticketRequested(state) {
            state.isLoading = true;
        },
        ticketReceived(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        },
        ticketRequestFailed(state, action) {
            state.error = action.payload;
        },
        confirmed(state, action) {
            const elementIndex = state.entities.findIndex(
                (ticket) => ticket._id === action.payload._id
            );
            state.entities[elementIndex] = action.payload;
        },
        removed(state, action) {
            state.entities = state.entities.filter(
                (ticket) => ticket._id !== action.payload
            );
        }
    }
});

const { reducer: ticketsReducer, actions } = ticketsSlice;
const {
    ticketRequested,
    ticketReceived,
    ticketRequestFailed,
    confirmed,
    removed
} = actions;

export const loadTicketsList = () => async (dispatch) => {
    dispatch(ticketRequested());
    try {
        const content = await ticketService.fetchAll();
        dispatch(ticketReceived(content));
    } catch (error) {
        dispatch(ticketRequestFailed(error.message));
    }
};

export const confirmTicket = (data) => async (dispatch) => {
    try {
        await ticketService.confirm(data._id, data);
        dispatch(confirmed(data));
    } catch (error) {
        dispatch(ticketRequestFailed(error.message));
    }
};

export const removeTicket = (ticketId) => async (dispatch) => {
    try {
        await ticketService.remove(ticketId);
        dispatch(removed(ticketId));
    } catch (error) {
        dispatch(ticketRequestFailed(error.message));
    }
};

export const getTickets = () => (state) => state.tickets.entities;

export const getTicketsLoading = () => (state) => state.tickets.isLoading;

export default ticketsReducer;
