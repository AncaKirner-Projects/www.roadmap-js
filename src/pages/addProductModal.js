export const addCategoryOptions = (elemId, categories) => {
  console.log('in add option');
  const element = document.getElementById(elemId);

  categories.forEach(elem => {
    const option = document.createElement('option');
    option.value = elem.id;
    option.innerHTML = elem.category_name;
    element.appendChild(option);
  });
};

export const addProductBtnEvt = () => {
  console.log('in create event');
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

  modalTitle.innerHTML = 'Add Product';
  modalTitle.className = 'modalTitle';
  modalForm.className = 'form-container';

  category.id = 'category-select';
  name.type = 'text';
  description.type = 'text';
  price.type = 'text';
  productsNo.type = 'text';

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