import {
    LIST_LOADED_SUCCESS,
    LIST_LOADED_FAIL,
    ITEM_LOADED_SUCCESS,
    ITEM_LOADED_FAIL,
    ITEM_ADD,
    ITEM_DELETE,
    ITEM_UPDATE,
} from "../constants/constants";

export const airportReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case LIST_LOADED_SUCCESS:
            return {
                ...state,
                airports: payload,
                airportsLoading: false,
            };
        case LIST_LOADED_FAIL:
            return {
                ...state,
                airports: [],
                airportsLoading: false,
            };
        case ITEM_LOADED_SUCCESS:
            return {
                ...state,
                airport: payload,
                airportLoading: false,
            };
        case ITEM_LOADED_FAIL:
            return {
                ...state,
                airport: {
                    code: "",
                    name: "",
                    logo: "",
                },
                airportLoading: false,
            };
        case ITEM_ADD:
            return {
                ...state,
                airports: [...state.airports, payload],
            };
        case ITEM_DELETE:
            return {
                ...state,
                airports: state.airports.filter(
                    (airport) => airport._id !== payload
                ),
            };
        case ITEM_UPDATE:
            return {
                ...state,
                airports: state.airports.map((airport) =>
                    airport._id === payload._id ? payload : airport
                ),
            };

        default:
            return state;
    }
};
