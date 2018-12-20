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

const validate = (element, elemError, errorMessage, test, value) => {
  let isValid;

  switch (test) {
    case 'selected': {
      isValid = Number.parseInt(element.value, 10) !== 0;
      break;
    }
    case 'number': {
      isValid = element.value.length > 0 && !Number.isNaN(parseInt(element.value, 10));
      break;
    }
    case 'min': {
      isValid = element.value.length >= value;
      break;
    }
    case 'max': {
      isValid = element.value.length <= value;
      break;
    }
  }

  if (!isValid) {
    element.className = "invalid";
    elemError.innerHTML = errorMessage;
  } else {
    element.className = "valid";
    elemError.innerHTML = "";
  }
  return isValid;
}
export const addProductBtnEvt = () => {
  const modal = document.getElementById('myModal');
  const addProductBtn = document.getElementById('add-product');
  addProductBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });


  const modalContent = document.getElementById('modal-content');
  const form = document.createElement('form');

  const divTitle = document.createElement('div');
  const modalTitle = document.createElement('h2');

  const modalForm = document.createElement('div');
  const labelCategory = document.createElement('label');
  const category = document.createElement('select');
  const option = document.createElement('option');
  const errCategoty = document.createElement('span');
  errCategoty.className = 'error error-span';

  const labelName = document.createElement('label');
  const name = document.createElement('input');
  const errName = document.createElement('span');
  errName.className = 'error error-span';

  const labelDescription = document.createElement('label');
  const description = document.createElement('input');
  const errDescription = document.createElement('span');
  errDescription.className = 'error error-span';

  const labelPrice = document.createElement('label');
  const price = document.createElement('input');
  const errPrice = document.createElement('span');
  errPrice.className = 'error error-span';

  const labelProdNum = document.createElement('label');
  labelProdNum.innerHTML = 'Number of products:';
  labelProdNum.for = 'totalProducts';
  const productsNo = document.createElement('input');
  productsNo.type = 'text';
  productsNo.name = 'totalProducts';
  const errProdNum = document.createElement('span');
  errProdNum.className = 'error error-span';

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


  category.name = 'category';
  name.name = 'name';
  description.name = 'description';
  price.name = 'price';

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

    let isValid = [];
    isValid.push(validate(category, errCategoty, 'Category not selected', 'selected'));
    isValid.push(validate(name, errName, 'Product name is not valid', 'min', 3));
    isValid.push(validate(description, errDescription, 'Product description is too short', 'min', 10));
    isValid.push(validate(price, errPrice, 'Price is not valid', 'number'));
    isValid.push(validate(productsNo, errProdNum, 'Product number is not valid', 'number'));

    const allValid = isValid.every((elem) => elem === true);

    if (allValid) {
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
        alert('The product was added into database');
        // location.reload(true);
      } catch (err) {
        console.log(err);
        alert('The product was not added into database');
      }
      modal.style.display = 'none';
    }
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
    labelCategory, category, errCategoty,
    labelName, name, errName,
    labelDescription, description, errDescription,
    labelPrice, price, errPrice,
    labelProdNum, productsNo, errProdNum
  );
  btnDiv.append(btn, closeBtn);

  form.append(divTitle, modalForm, btnDiv);
  modalContent.appendChild(form);
}