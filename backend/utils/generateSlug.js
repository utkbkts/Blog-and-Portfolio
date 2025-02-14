export const generateSlug = (input) => {
  const result = input.replace(/-/g, " ");
  return result;
};

export const generateMapSlug = (input) => {
  if (typeof input !== "string") {
    return ""; // Handle invalid input
  }

  let result = input.split(" ").join("-");

  return result;
};
 