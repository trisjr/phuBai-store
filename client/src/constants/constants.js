export const PAGE_LOADING = 1500;

export const apiUrl =
    process.env.NODE_ENV !== "production"
        ? "http://localhost:5000/api"
        : "something";
export const LOCAL_STORAGE_TOKEN_NAME = "phu-bai-store";

export const SET_AUTH = "SET_AUTH";
export const SET_THEME = "SET_THEME";
export const SET_SIDEBAR = "SET_SIDEBAR";

export const LIST_LOADED_SUCCESS = "LIST_LOADED_SUCCESS";
export const ITEM_LOADED_SUCCESS = "ITEM_LOADED_SUCCESS";
export const LIST_LOADED_FAIL = "LIST_LOADED_FAIL";
export const ITEM_LOADED_FAIL = "ITEM_LOADED_FAIL";
export const ITEM_DELETE = "ITEM_DELETE";
export const ITEM_ADD = "ITEM_ADD";
export const ITEM_UPDATE = "ITEM_UPDATE";
