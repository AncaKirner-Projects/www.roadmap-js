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
    console.log(checkbox, checkbox.checked);
  });

  span.classList.add("checkmark");

  label.appendChild(labelText);
  label.appendChild(checkbox);
  label.appendChild(span);

  return label;
}

export const createCategories = (categories) => {
  console.log('in create categ');
  const div = document.getElementById('categories');

  categories.forEach((categ) => {
    const checkbox = addCheckbox(categ);
    div.appendChild(checkbox);
  });
}