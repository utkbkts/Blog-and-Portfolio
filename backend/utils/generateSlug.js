export const generateSlug = (input) => {
  if (typeof input !== "string") {
    return "";
  }

  let result = input.split(" ").join("-");

  return result;
};
