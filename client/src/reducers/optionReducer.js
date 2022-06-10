import { SET_THEME, SET_SIDEBAR } from "../constants/constants";

export const optionReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_THEME:
            return {
                ...state,
                theme: payload,
            };
        case SET_SIDEBAR:
            return {
                ...state,
                sidebar: payload,
            };

        default:
            return state;
    }
};
