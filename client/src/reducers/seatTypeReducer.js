import {
    LIST_LOADED_SUCCESS,
    LIST_LOADED_FAIL,
    ITEM_LOADED_SUCCESS,
    ITEM_LOADED_FAIL,
    ITEM_ADD,
    ITEM_DELETE,
    ITEM_UPDATE,
} from "../constants/constants";

export const seatTypeReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case LIST_LOADED_SUCCESS:
            return {
                ...state,
                seatTypes: payload,
                seatTypesLoading: false,
            };
        case LIST_LOADED_FAIL:
            return {
                ...state,
                seatTypes: [],
                seatTypesLoading: false,
            };
        case ITEM_LOADED_SUCCESS:
            return {
                ...state,
                seatType: payload,
                seatTypeLoading: false,
            };
        case ITEM_LOADED_FAIL:
            return {
                ...state,
                seatType: {
                    code: "",
                    name: "",
                    key: "",
                    price: "",
                },
                seatTypeLoading: false,
            };
        case ITEM_ADD:
            return {
                ...state,
                seatTypes: [...state.seatTypes, payload],
            };
        case ITEM_DELETE:
            return {
                ...state,
                seatTypes: state.seatTypes.filter(
                    (seatType) => seatType._id !== payload
                ),
            };
        case ITEM_UPDATE:
            return {
                ...state,
                seatTypes: state.seatTypes.map((seatType) =>
                    seatType._id === payload._id ? payload : seatType
                ),
            };

        default:
            return state;
    }
};
