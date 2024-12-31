export const generateSlug = (input) => {
  let result = input.replace(/-/g, " ");

  return result;
};
