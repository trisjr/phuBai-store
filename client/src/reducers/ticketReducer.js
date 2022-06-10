import {
    LIST_LOADED_SUCCESS,
    LIST_LOADED_FAIL,
    ITEM_LOADED_SUCCESS,
    ITEM_LOADED_FAIL,
    ITEM_ADD,
    ITEM_DELETE,
    ITEM_UPDATE,
} from "../constants/constants";

export const ticketReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case LIST_LOADED_SUCCESS:
            return {
                ...state,
                tickets: payload,
                ticketsLoading: false,
            };
        case LIST_LOADED_FAIL:
            return {
                ...state,
                tickets: [],
                ticketsLoading: false,
            };
        case ITEM_LOADED_SUCCESS:
            return {
                ...state,
                ticket: payload,
                ticketLoading: false,
            };
        case ITEM_LOADED_FAIL:
            return {
                ...state,
                ticket: {
                    code: "",
                    customer: "",
                    booking: "",
                    user: "",
                },
                ticketLoading: false,
            };
        case ITEM_ADD:
            return {
                ...state,
                tickets: [...state.tickets, payload],
            };
        case ITEM_DELETE:
            return {
                ...state,
                tickets: state.tickets.filter(
                    (ticket) => ticket._id !== payload
                ),
            };
        case ITEM_UPDATE:
            return {
                ...state,
                tickets: state.tickets.map((ticket) =>
                    ticket._id === payload._id ? payload : ticket
                ),
            };

        default:
            return state;
    }
};
