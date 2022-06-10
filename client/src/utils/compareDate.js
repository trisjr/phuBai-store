export const compareDate = (dateA, dateB) => {
    dateA = new Date(dateA);
    dateB = new Date(dateB);

    return dateA.getTime() > dateB.getTime() ? 1 : -1;
};
