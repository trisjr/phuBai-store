import {
    LIST_LOADED_SUCCESS,
    LIST_LOADED_FAIL,
    ITEM_LOADED_SUCCESS,
    ITEM_LOADED_FAIL,
    ITEM_ADD,
    ITEM_DELETE,
    ITEM_UPDATE,
} from "../constants/constants";

export const bookingReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case LIST_LOADED_SUCCESS:
            return {
                ...state,
                bookings: payload,
                bookingsLoading: false,
            };
        case LIST_LOADED_FAIL:
            return {
                ...state,
                bookings: [],
                bookingsLoading: false,
            };
        case ITEM_LOADED_SUCCESS:
            return {
                ...state,
                booking: payload,
                bookingLoading: false,
            };
        case ITEM_LOADED_FAIL:
            return {
                ...state,
                booking: {
                    flight: "",
                    seat: "",
                    user: "",
                    customer: "",
                    status: "",
                },
                bookingLoading: false,
            };
        case ITEM_ADD:
            return {
                ...state,
                bookings: [...state.bookings, payload],
            };
        case ITEM_DELETE:
            return {
                ...state,
                bookings: state.bookings.filter(
                    (booking) => booking._id !== payload
                ),
            };
        case ITEM_UPDATE:
            return {
                ...state,
                bookings: state.bookings.map((booking) =>
                    booking._id === payload._id ? payload : booking
                ),
            };

        default:
            return state;
    }
};
