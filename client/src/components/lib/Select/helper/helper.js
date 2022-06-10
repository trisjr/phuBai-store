export const checkSelect = (item, selected) => {
  return item["value"] === selected["value"];
};

export const checkPosTitle = (selected) => {
  return !!selected;
};
