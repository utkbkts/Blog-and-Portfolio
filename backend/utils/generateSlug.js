export const generateSlug = (input) => {
  if (typeof input !== "string") {
    console.warn("Invalid input passed to generateSlug:", input);
    return "";
  }

  return input
    .split(" ")
    .filter(Boolean)
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("-");
};
