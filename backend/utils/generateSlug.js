export const generateSlug = (input) => {
  const result = input.replace(/-/g, " ");
  return result;
};
