export const parseToArray = (value: any): string[] =>
  typeof value === "string"
    ? value.split(/\r\n|\r|\n/).map((v) => v.trim())
    : [];
