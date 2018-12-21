import { loadState } from '../localStorage';
import { changeProductQuantity, deleteFromCart } from '../helpers/cart';

const updateTotal = () => {
  const allProdPrices = document.getElementsByClassName('total-price');
  const total = document.getElementById('cart-total');
  let ttl = 0;

  for (let i = 0; i < allProdPrices.length; i++) {
    const price = Number.parseFloat(allProdPrices[i].innerHTML).toFixed(2);
    ttl += Number.parseFloat(price);
  }
  total.innerHTML = Number.parseFloat(ttl).toFixed(2);
};

const totalPrice = (products = []) => {
  let total = 0;
  products.forEach((product) => { total += product.price * product.quantity; });

  return parseFloat(total).toFixed(2);
};

const addProductToCart = (parent, product) => {
  const productDiv = document.createElement('div');
  productDiv.className = 'elem-cart-div';

  const nameDiv = document.createElement('div');
  nameDiv.className = 'cart-prod-name';
  const productName = document.createElement('h6');

  productName.innerHTML = product.prod_name;
  nameDiv.appendChild(productName);

  const numberDiv = document.createElement('div');
  numberDiv.className = 'cart-prod-num';
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

  const priceDiv = document.createElement('div');
  priceDiv.className = 'cart-prod-events';
  const price = document.createElement('h6');
  price.className = 'total-price';

  numberOptions.addEventListener('change', (e) => {
    changeProductQuantity(product, e.target.value);
    const totalPrice = Number.parseFloat(product.price * e.target.value).toFixed(2)
    price.innerHTML = totalPrice + ' RON';
    updateTotal();
  });
  selectDiv.appendChild(numberOptions);
  numberDiv.appendChild(selectDiv);

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'cart-prod-remove-btn';
  removeBtn.addEventListener('click', () => {
    deleteFromCart(product.id);
    if (productDiv.parentNode) {
      productDiv.parentNode.removeChild(productDiv);
    }
    updateTotal();
  });
  const removeName = document.createElement('span');
  removeName.innerHTML = 'REMOVE';
  removeBtn.appendChild(removeName);

  const totalPrice = Number.parseFloat(product.price * product.quantity).toFixed(2)
  price.innerHTML = totalPrice + ' RON';
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
  let ttlPrice;

  if (store && store.cart.products) {
    store.cart.products.forEach((prod) => {
      const productDiv = addProductToCart(paperDiv, prod);
      paperDiv.appendChild(productDiv);
    });
    ttlPrice = totalPrice(store.cart.products);
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

  const totalDiv = document.createElement('h5');
  const spanTotal = document.createElement('span');
  totalDiv.className = 'cart-total';
  spanTotal.id = 'cart-total';
  totalDiv.innerHTML = 'Total: ';
  spanTotal.innerHTML = ttlPrice;
  totalDiv.appendChild(spanTotal);
  totalDiv.innerHTML += ' RON';

  modalContent.append(divTitle, paperDiv, totalDiv, btnDiv);
}