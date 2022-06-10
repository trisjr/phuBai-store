import {
    LIST_LOADED_SUCCESS,
    LIST_LOADED_FAIL,
    ITEM_LOADED_SUCCESS,
    ITEM_LOADED_FAIL,
    ITEM_ADD,
    ITEM_DELETE,
    ITEM_UPDATE,
} from "../constants/constants";

export const routerReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case LIST_LOADED_SUCCESS:
            return {
                ...state,
                routers: payload,
                routersLoading: false,
            };
        case LIST_LOADED_FAIL:
            return {
                ...state,
                routers: [],
                routersLoading: false,
            };
        case ITEM_LOADED_SUCCESS:
            return {
                ...state,
                router: payload,
                routerLoading: false,
            };
        case ITEM_LOADED_FAIL:
            return {
                ...state,
                router: {
                    code: "",
                    from: "",
                    to: "",
                },
                routerLoading: false,
            };
        case ITEM_ADD:
            return {
                ...state,
                routers: [...state.routers, payload],
            };
        case ITEM_DELETE:
            return {
                ...state,
                routers: state.routers.filter(
                    (router) => router._id !== payload
                ),
            };
        case ITEM_UPDATE:
            return {
                ...state,
                routers: state.routers.map((router) =>
                    router._id === payload._id ? payload : router
                ),
            };

        default:
            return state;
    }
};
