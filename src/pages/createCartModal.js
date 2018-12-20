import { loadState } from '../localStorage';

const addProductToCart = (product) => {
  const productDiv = document.createElement('div');
  productDiv.className = 'elem-cart-div';

  const nameDiv = document.createElement('div');
  const productName = document.createElement('h6');

  productName.innerHTML = product.prod_name;
  nameDiv.appendChild(productName);

  const numberDiv = document.createElement('div');
  const selectDiv = document.createElement('div');
  const numberOptions = document.createElement('select');

  for (let i = 1; i <= product.prod_number; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;

    if (i === product.quantity) {
      option.selected = true;
    }
    numberOptions.appendChild(option);
  }
  selectDiv.appendChild(numberOptions);
  numberDiv.appendChild(selectDiv);

  const priceDiv = document.createElement('div');
  const price = document.createElement('h6');
  price.innerHTML = Number.parseFloat(product.price).toFixed(2) + ' RON';

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  const removeName = document.createElement('span');
  removeName.innerHTML = 'REMOVE';
  removeBtn.appendChild(removeName);

  price.innerHTML = Number.parseFloat(product.price).toFixed(2) + ' RON';
  priceDiv.append(price, removeBtn);

  productDiv.append(nameDiv, numberDiv, priceDiv);

  return productDiv;
}

const modal = document.getElementById('cartModal');
const addProductBtn = document.getElementById('view-cart');
addProductBtn.addEventListener('click', () => {
  viewCartBtnEvt();
  modal.style.display = 'flex';
});

export const viewCartBtnEvt = () => {
  const store = loadState();

  const modalContent = document.getElementById('cart-modal-content');
  const divTitle = document.createElement('div');
  const modalTitle = document.createElement('h2');

  modalTitle.innerHTML = 'My Cart';
  modalTitle.className = 'modalTitle';
  divTitle.appendChild(modalTitle);

  const paperDiv = document.createElement('div');

  if (store && store.cart.products) {
    store.cart.products.forEach((prod) => {
      const productDiv = addProductToCart(prod);
      paperDiv.appendChild(productDiv);
    });
  }
  const btnDiv = document.createElement('div');
  const closeBtn = document.createElement('button');

  closeBtn.className = 'modalDivButton';
  closeBtn.type = 'button';
  closeBtn.innerHTML = 'Close';
  closeBtn.className = 'cardButton';
  closeBtn.addEventListener('click', () => {
    modalContent.innerHTML = '';
    modal.style.display = 'none';
  });

  btnDiv.className = 'closeUpButton';
  btnDiv.append(closeBtn);

  modalContent.append(divTitle, paperDiv, btnDiv);


}