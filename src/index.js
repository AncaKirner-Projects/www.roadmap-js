import { getAllCategories } from './helpers/categories';

const addCheckbox = (category) => {
  let label = document.createElement('label');
  let labelText = document.createTextNode(category.category_name);
  let checkbox = document.createElement('input');
  let span = document.createElement('span');

  label.classList.add("container");
  label.classList.add("labelText");

  checkbox.id = category.id;
  checkbox.type = "checkbox";
  checkbox.value = category.category_name;
  checkbox.name = "categories[]";
  checkbox.addEventListener('change', () => {
    console.log(checkbox, checkbox.checked);
  });

  span.classList.add("checkmark");

  label.appendChild(labelText);
  label.appendChild(checkbox);
  label.appendChild(span);

  return label;
}

const createCategories = (categories) => {
  let div = document.getElementById('categories');

  categories.forEach((categ) => {
    let checkbox = addCheckbox(categ);
    div.appendChild(checkbox);
  });
}

let categories = getAllCategories()
  .then((res) => {
    createCategories(res);
  })
  .catch((err) => {
    console.log('***', err);
  });
