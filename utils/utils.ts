export const parseToArray = (value: any): string[] => {
  if (typeof value === "string") {
    return value.split(/\r\n|\r|\n/).map((v) => v.trim());
  } else if (typeof value === "number") {
    return [value.toString()];
  } else {
    return [""];
  }
};
