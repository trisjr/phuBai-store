import {
    LIST_LOADED_SUCCESS,
    LIST_LOADED_FAIL,
    ITEM_LOADED_SUCCESS,
    ITEM_LOADED_FAIL,
    ITEM_ADD,
    ITEM_DELETE,
    ITEM_UPDATE,
} from "../constants/constants";

export const airlineReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case LIST_LOADED_SUCCESS:
            return {
                ...state,
                airlines: payload,
                airlinesLoading: false,
            };
        case LIST_LOADED_FAIL:
            return {
                ...state,
                airlines: [],
                airlinesLoading: false,
            };
        case ITEM_LOADED_SUCCESS:
            return {
                ...state,
                airline: payload,
                airlineLoading: false,
            };
        case ITEM_LOADED_FAIL:
            return {
                ...state,
                airline: {
                    code: "",
                    name: "",
                    logo: "",
                },
                airlineLoading: false,
            };
        case ITEM_ADD:
            return {
                ...state,
                airlines: [...state.airlines, payload],
            };
        case ITEM_DELETE:
            return {
                ...state,
                airlines: state.airlines.filter(
                    (airline) => airline._id !== payload
                ),
            };
        case ITEM_UPDATE:
            return {
                ...state,
                airlines: state.airlines.map((airline) =>
                    airline._id === payload._id ? payload : airline
                ),
            };

        default:
            return state;
    }
};
