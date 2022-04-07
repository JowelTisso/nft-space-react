export const findByProductId = (productId, list) => {
  return list.find((item) => item._id.includes(productId));
};
