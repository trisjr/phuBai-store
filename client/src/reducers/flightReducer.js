import {
    LIST_LOADED_SUCCESS,
    LIST_LOADED_FAIL,
    ITEM_LOADED_SUCCESS,
    ITEM_LOADED_FAIL,
    ITEM_ADD,
    ITEM_DELETE,
    ITEM_UPDATE,
} from "../constants/constants";

export const flightReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case LIST_LOADED_SUCCESS:
            return {
                ...state,
                flights: payload,
                flightsLoading: false,
            };
        case LIST_LOADED_FAIL:
            return {
                ...state,
                flights: [],
                flightsLoading: false,
            };
        case ITEM_LOADED_SUCCESS:
            return {
                ...state,
                flight: payload,
                flightLoading: false,
            };
        case ITEM_LOADED_FAIL:
            return {
                ...state,
                flight: {
                    code: "",
                    router: "",
                    plane: "",
                    start: "",
                    end: "",
                    price: "",
                },
                flightLoading: false,
            };
        case ITEM_ADD:
            return {
                ...state,
                flights: [...state.flights, payload],
            };
        case ITEM_DELETE:
            return {
                ...state,
                flights: state.flights.filter(
                    (flight) => flight._id !== payload
                ),
            };
        case ITEM_UPDATE:
            return {
                ...state,
                flights: state.flights.map((flight) =>
                    flight._id === payload._id ? payload : flight
                ),
            };

        default:
            return state;
    }
};
