import {
    LIST_LOADED_SUCCESS,
    LIST_LOADED_FAIL,
    ITEM_LOADED_SUCCESS,
    ITEM_LOADED_FAIL,
    ITEM_ADD,
    ITEM_DELETE,
    ITEM_UPDATE,
} from "../constants/constants";

export const planeReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case LIST_LOADED_SUCCESS:
            return {
                ...state,
                planes: payload,
                planesLoading: false,
            };
        case LIST_LOADED_FAIL:
            return {
                ...state,
                planes: [],
                planesLoading: false,
            };
        case ITEM_LOADED_SUCCESS:
            return {
                ...state,
                plane: payload,
                planeLoading: false,
            };
        case ITEM_LOADED_FAIL:
            return {
                ...state,
                plane: {
                    code: "",
                    airline: "",
                    status: "",
                },
                planeLoading: false,
            };
        case ITEM_ADD:
            return {
                ...state,
                planes: [...state.planes, payload],
            };
        case ITEM_DELETE:
            return {
                ...state,
                planes: state.planes.filter((plane) => plane._id !== payload),
            };
        case ITEM_UPDATE:
            return {
                ...state,
                planes: state.planes.map((plane) =>
                    plane._id === payload._id ? payload : plane
                ),
            };

        default:
            return state;
    }
};
