import { loadState, saveState } from '../localStorage';

export const addToCart = (product) => {
  const store = loadState();
  let foundProduct;
  let productList;

  if (store && store.cart.products) {
    const index = store.cart.products.findIndex(elem => product.id === elem.id);

    if (index > -1) {
      productList = [...store.cart.products];
      productList[index].quantity += 1;
    } else {
      foundProduct = { ...product, quantity: 1 };
      productList = [...store.cart.products, foundProduct];
    }
  } else {
    foundProduct = { ...product, quantity: 1 };
    productList = [foundProduct];
  }

  saveState({
    cart: {
      products: productList
    }
  });
};

export const changeProductQuantity = (product, newQuantity) => {
  const store = loadState();

  const productList = [...store.cart.products];
  const index = store.cart.products.findIndex(elem => product.id === elem.id);
  productList[index].quantity = Number.parseInt(newQuantity);

  saveState({
    cart: {
      products: productList
    }
  });
};

export const deleteFromCart = (prodId) => {
  const store = loadState();
  const products = store.cart.products.filter(elem => prodId !== elem.id);

  saveState({
    cart: {
      products
    }
  });
}