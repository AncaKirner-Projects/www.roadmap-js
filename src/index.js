import 'babel-polyfill';
import { getAllCategories } from './helpers/categories';
import { getAllProducts } from './helpers/products';
import { createCategories } from './pages/createCheckboxes';
import { createProductList } from './pages/createProductCards';
import { addCategoryOptions, addProductBtnEvt } from './pages/addProductModal';
let categories;

(async () => {
  try {
    categories = await getAllCategories();
    createCategories(categories);
    await addProductBtnEvt();
    await addCategoryOptions('category-select', categories);

    const products = await getAllProducts();
    createProductList(products);
  } catch (err) {
    console.log('***', err);
  }

})();
