import {
    LIST_LOADED_SUCCESS,
    LIST_LOADED_FAIL,
    ITEM_LOADED_SUCCESS,
    ITEM_LOADED_FAIL,
    ITEM_ADD,
    ITEM_DELETE,
    ITEM_UPDATE,
} from "../constants/constants";

export const billReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case LIST_LOADED_SUCCESS:
            return {
                ...state,
                bills: payload,
                billsLoading: false,
            };
        case LIST_LOADED_FAIL:
            return {
                ...state,
                bills: [],
                billsLoading: false,
            };
        case ITEM_LOADED_SUCCESS:
            return {
                ...state,
                bill: payload,
                billLoading: false,
            };
        case ITEM_LOADED_FAIL:
            return {
                ...state,
                bill: {
                    code: "",
                    ticket: "",
                    booking: "",
                    cost: "",
                    time: "",
                },
                billLoading: false,
            };
        case ITEM_ADD:
            return {
                ...state,
                bills: [...state.bills, payload],
            };
        case ITEM_DELETE:
            return {
                ...state,
                bills: state.bills.filter((bill) => bill._id !== payload),
            };
        case ITEM_UPDATE:
            return {
                ...state,
                bills: state.bills.map((bill) =>
                    bill._id === payload._id ? payload : bill
                ),
            };

        default:
            return state;
    }
};
