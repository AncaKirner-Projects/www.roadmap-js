export const getAllProducts = async () => {
  let products;
  try {
    const response = await fetch('http://localhost:8000/products');
    products = await response.json();
  } catch (err) {
    throw new Error(err);
  }
  return products;
};