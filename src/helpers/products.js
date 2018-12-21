import { loadState, saveState } from '../localStorage';

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

export const getAllProductsFromCategories = async (categories) => {
  let products;
  const categs = categories.join(',');

  try {
    const response = await fetch(`http://localhost:8000/products/categories/${categs}`);
    products = await response.json();
  } catch (err) {
    throw new Error(err);
  }
  return products;
};

export const addProduct = async (product) => {
  try {
    const response = await fetch('http://localhost:8000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });
    return response.json();
  } catch (err) {
    throw new Error(err);
  }
};
