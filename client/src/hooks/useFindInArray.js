import { useState } from "react";

export const useFindInArray = (state) => {
    const [findState, setFindState] = useState(state);

    function findValid(object, value) {
        let flag = false;
        Object.keys(object).forEach((key) => {
            if (key !== "logo" && key !== "_id" && key !== "password") {
                if (typeof object[key] === "object") {
                    if (findValid(object[key], value)) {
                        flag = true;
                    }
                } else {
                    if (typeof object[key] === "string") {
                        if (
                            object[key]
                                .toLocaleLowerCase()
                                .includes(value.toLocaleLowerCase())
                        ) {
                            flag = true;
                        }
                    }
                    if (typeof object[key] === "number") {
                        if (object[key] === value) {
                            flag = true;
                        }
                    }
                }
            }
        });
        return flag;
    }

    function find(array, value) {
        return array.filter((item) => findValid(item, value));
    }

    return [findState, setFindState, find];
};
