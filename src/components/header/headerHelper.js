export const filterByTitle = (title, list) => {
  return list.filter((item) =>
    item.title.toLowerCase().includes(title.toLowerCase())
  );
};
