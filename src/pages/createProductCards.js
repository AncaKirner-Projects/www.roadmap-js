const addCard = (product) => {
  const container = document.createElement('div');
  const titleLink = document.createElement('a');
  const description = document.createElement('p');
  const price = document.createElement('h1');
  const buttonDiv = document.createElement('div');
  const button = document.createElement('button');
  const buttonName = document.createElement('span');

  container.className = 'card';
  titleLink.innerHTML = product.prod_name;
  titleLink.className = 'titleCard';
  titleLink.href = `/products/${product.id}`;
  description.innerHTML = product.prod_description;
  description.className = 'descriptionCard';
  price.innerHTML = `${product.price} RON`;
  price.className = 'priceLabel';
  button.type = 'button';
  button.type = 'button';
  button.className = 'cardButton';
  buttonName.innerHTML = 'ADD TO CART';
  buttonDiv.className = 'cardDivButton';


  button.appendChild(buttonName);
  buttonDiv.appendChild(button);
  container.appendChild(titleLink);
  container.appendChild(description);
  container.appendChild(price);
  container.appendChild(buttonDiv);

  return container;
}

export const createProductList = (products) => {
  console.log('in create cards');
  const div = document.getElementById('content');
  const uniqueProd = products.slice(0, 4);
  // console.log(products);
  uniqueProd.forEach((product, index) => {
    console.log(product, index);
    const card = addCard(product);
    div.appendChild(card);
  });
}