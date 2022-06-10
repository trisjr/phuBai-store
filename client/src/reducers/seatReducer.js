import {
    LIST_LOADED_SUCCESS,
    LIST_LOADED_FAIL,
    ITEM_LOADED_SUCCESS,
    ITEM_LOADED_FAIL,
    ITEM_ADD,
    ITEM_DELETE,
    ITEM_UPDATE,
} from "../constants/constants";

export const seatReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case LIST_LOADED_SUCCESS:
            return {
                ...state,
                seats: payload,
                seatsLoading: false,
            };
        case LIST_LOADED_FAIL:
            return {
                ...state,
                seats: [],
                seatsLoading: false,
            };
        case ITEM_LOADED_SUCCESS:
            return {
                ...state,
                seat: payload,
                seatLoading: false,
            };
        case ITEM_LOADED_FAIL:
            return {
                ...state,
                seat: {
                    code: "",
                    plane: "",
                    seatType: "",
                },
                seatLoading: false,
            };
        case ITEM_ADD:
            return {
                ...state,
                seats: [...state.seats, payload],
            };
        case ITEM_DELETE:
            return {
                ...state,
                seats: state.seats.filter((seat) => seat._id !== payload),
            };
        case ITEM_UPDATE:
            return {
                ...state,
                seats: state.seats.map((seat) =>
                    seat._id === payload._id ? payload : seat
                ),
            };

        default:
            return state;
    }
};
