import { useEffect } from "react";
import { PAGE_LOADING } from "../constants/constants";

export function useGetData(handle) {
    useEffect(() => {
        setTimeout(() => {
            handle();
        }, PAGE_LOADING);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
