import { displayProductsByCategories } from './createProductCards';

const addCheckbox = (category) => {
  const label = document.createElement('label');
  const labelText = document.createTextNode(category.category_name);
  const checkbox = document.createElement('input');
  const span = document.createElement('span');

  label.classList.add("container");
  label.classList.add("labelText");

  checkbox.id = category.id;
  checkbox.type = "checkbox";
  checkbox.value = category.category_name;
  checkbox.name = "categories[]";
  checkbox.addEventListener('change', () => {
    const categs = document.getElementsByName('categories[]');
    const selectedIds = [];

    for (let i = 0; i < categs.length; i++) {
      if (categs[i].checked) {
        selectedIds.push(Number.parseInt(categs[i].id, 10));
      }
    }

    displayProductsByCategories(selectedIds);
  });

  span.classList.add("checkmark");

  label.appendChild(labelText);
  label.appendChild(checkbox);
  label.appendChild(span);

  return label;
}

export const createCategories = (categories, products) => {
  const div = document.getElementById('categories');

  categories.forEach((categ) => {
    const checkbox = addCheckbox(categ);
    div.appendChild(checkbox);
  });
}