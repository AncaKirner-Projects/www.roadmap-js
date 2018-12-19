import { addProduct } from '../helpers/products';

export const addCategoryOptions = (elemId, categories) => {
  const element = document.getElementById(elemId);

  categories.forEach(elem => {
    const option = document.createElement('option');
    option.value = elem.id;
    option.innerHTML = elem.category_name;
    element.appendChild(option);
  });
};

export const addProductBtnEvt = () => {
  const modal = document.getElementById('myModal');
  const addProductBtn = document.getElementById('add-product');
  addProductBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });


  const modalContent = document.getElementById('model-content');
  const form = document.createElement('form');

  const divTitle = document.createElement('div');
  const modalTitle = document.createElement('h2');

  const modalForm = document.createElement('div');
  const labelCategory = document.createElement('label');
  const category = document.createElement('select');
  const option = document.createElement('option');
  const labelName = document.createElement('label');
  const name = document.createElement('input');
  const labelDescription = document.createElement('label');
  const description = document.createElement('input');
  const labelPrice = document.createElement('label');
  const price = document.createElement('input');
  const labelProdNum = document.createElement('label');
  const productsNo = document.createElement('input');

  const btnDiv = document.createElement('div');
  const btn = document.createElement('button');
  const closeBtn = document.createElement('button');

  form.id = 'add-product-form';
  modalTitle.innerHTML = 'Add Product';
  modalTitle.className = 'modalTitle';
  modalForm.className = 'form-container';

  category.id = 'category-select';
  name.type = 'text';
  description.type = 'text';
  price.type = 'text';
  productsNo.type = 'text';

  category.name = 'category';
  name.name = 'name';
  description.name = 'description';
  price.name = 'price';
  productsNo.name = 'totalProducts';

  option.value = 0;
  option.innerHTML = '- Please select -';

  labelCategory.innerHTML = 'Category:';
  labelName.innerHTML = 'Product Name:';
  labelDescription.innerHTML = 'Product Description:';
  labelPrice.innerHTML = 'Price:';
  labelProdNum.innerHTML = 'Number of products:';

  btnDiv.className = 'modalDivButton';
  btn.type = 'submit';
  btn.innerHTML = 'Create';
  btn.className = 'cardButton';
  btn.addEventListener('click', (e) => {
    e.preventDefault();

    const myForm = document.getElementById('add-product-form');
    const formData = new FormData(myForm);
    const product = {
      category_id: parseInt(formData.get('category'), 0),
      prod_name: formData.get('name'),
      prod_description: formData.get('description'),
      price: parseFloat(formData.get('price')).toFixed(2),
      prod_number: parseInt(formData.get('totalProducts'), 0)
    };

    try {
      const resp = addProduct(product);
      console.log(resp);
      alert('The product was added into database');
      location.reload(true);
    } catch (err) {
      console.log(err);
      alert('The product was not added into database');
    }

    // modal.style.display = 'none';
  });

  closeBtn.className = 'modalDivButton';
  closeBtn.type = 'button';
  closeBtn.innerHTML = 'Close';
  closeBtn.className = 'cardButton';
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  category.appendChild(option);
  divTitle.appendChild(modalTitle);
  modalForm.append(
    labelCategory, category,
    labelName, name,
    labelDescription, description,
    labelPrice, price,
    labelProdNum, productsNo
  );
  btnDiv.append(btn, closeBtn);

  form.append(divTitle, modalForm, btnDiv);
  modalContent.appendChild(form);
}