import { useState } from "react";

export function useSort(state) {
    const [sortState, setSortState] = useState({ value: state, type: "asc" });
    const setSort = (value) => {
        if (sortState.value === value) {
            if (sortState.type === "asc") {
                setSortState({ value, type: "desc" });
            } else {
                setSortState({ value, type: "asc" });
            }
        } else {
            setSortState({ value, type: "asc" });
        }
    };

    const sort = (array) => {
        const check = (a, b) => {
            if (typeof a === "number") {
                if (sortState.type === "asc") {
                    return a > b ? 1 : -1;
                } else {
                    return b > a ? 1 : -1;
                }
            }
            if (typeof a === "string") {
                if (sortState.type === "asc") {
                    return a.localeCompare(b);
                } else {
                    return b.localeCompare(a);
                }
            }
        };

        return array.sort(function (a, b) {
            if (sortState.value.includes("/")) {
                let keys = sortState.value.split("/");
                return check(a[keys[0]][keys[1]], b[keys[0]][keys[1]]);
            } else {
                return check(a[sortState.value], b[sortState.value]);
            }
        });
    };

    return [sortState, setSort, sort];
}
