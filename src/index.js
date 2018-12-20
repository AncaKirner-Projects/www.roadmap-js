import 'babel-polyfill';
import { getAllCategories } from './helpers/categories';
import { getAllProducts } from './helpers/products';
import { createCategories } from './pages/createCheckboxes';
import { createProductList } from './pages/createProductCards';
import { addCategoryOptions, addProductBtnEvt } from './pages/addProductModal';
import { viewCartBtnEvt } from './pages/createCartModal';

(async () => {
  try {
    const categories = await getAllCategories();
    createCategories(categories);
    addProductBtnEvt();
    addCategoryOptions('category-select', categories);

    const products = await getAllProducts();
    createProductList(products);
  } catch (err) {
    console.log('***', err);
  }

})();
